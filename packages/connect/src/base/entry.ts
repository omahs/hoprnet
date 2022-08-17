import type { HoprConnectOptions, PeerStoreType } from '../types.js'
import type { Connection, ProtocolStream } from '@libp2p/interface-connection'
import type { PeerId } from '@libp2p/interface-peer-id'
import type { Initializable, Components } from '@libp2p/interfaces/components'
import type { Startable } from '@libp2p/interfaces/startable'
import type { Multiaddr } from '@multiformats/multiaddr'
import type { HoprConnect } from '../index.js'
import { peerIdFromBytes } from '@libp2p/peer-id'

import errCode from 'err-code'
import { EventEmitter } from 'events'
import Debug from 'debug'

import {
  CODE_IP4,
  CODE_IP6,
  CODE_TCP,
  CODE_UDP,
  MAX_RELAYS_PER_NODE,
  CAN_RELAY_PROTCOL,
  OK,
  DEFAULT_DHT_ENTRY_RENEWAL,
  CODE_P2P
} from '../constants.js'

import {
  createCircuitAddress,
  nAtATime,
  oneAtATime,
  retimer,
  u8aEquals,
  tryExistingConnections,
  retryWithBackoff
} from '@hoprnet/hopr-utils'
import { attemptClose, relayFromRelayAddress } from '../utils/index.js'
import { compareDirectConnectionInfo } from '../utils/index.js'

const DEBUG_PREFIX = 'hopr-connect:entry'
const log = Debug(DEBUG_PREFIX)
const error = Debug(DEBUG_PREFIX.concat(':error'))
const verbose = Debug(DEBUG_PREFIX.concat(':verbose'))

const ENTRY_NODE_CONTACT_TIMEOUT = 5e3

const DEFAULT_ENTRY_NODE_RECONNECT_BASE_TIMEOUT = 10e3
const DEFAULT_ENTRY_NODE_RECONNECT_BACKOFF = 2

const KNOWN_DISCONNECT_ERROR = `Not successful`

type EntryNodeData = PeerStoreType & {
  latency: number
}

type ConnectionResult = {
  entry: EntryNodeData
  conn?: Connection
}

type ConnResult = ProtocolStream & {
  conn: Connection
}

/**
 * Sort results ascending in latency
 */
function latencyCompare(a: EntryNodeData, b: EntryNodeData) {
  return a.latency - b.latency
}

function connectionResultToNumber(res: ConnectionResult | undefined | Error) {
  if (res == undefined) {
    return 3
  }

  if (res instanceof Error) {
    return 2
  }

  if (res.entry.latency < 0) {
    return 1
  }

  return 0
}

/**
 * Sort results, such that:
 *
 * positive latencies, sorted ascending in latency
 * negative latencies (timeout)
 * Error (something went wrong)
 * undefined (break condition reached, no result)
 */
function compareConnectionResults(a: ConnectionResult | undefined | Error, b: ConnectionResult | undefined | Error) {
  const first = connectionResultToNumber(a)
  const second = connectionResultToNumber(b)

  switch (first) {
    case 3:
    case 2:
    case 1:
      return first - second
    case 0:
      switch (second) {
        case 3:
        case 2:
        case 1:
          return first - second
        case 0:
          return (a as ConnectionResult).entry.latency - (b as ConnectionResult).entry.latency
      }
  }
}

function isUsableRelay(ma: Multiaddr) {
  const tuples = ma.tuples() as [code: number, addr: Uint8Array][]

  return (
    tuples[0].length >= 2 && [CODE_IP4, CODE_IP6].includes(tuples[0][0]) && [CODE_UDP, CODE_TCP].includes(tuples[1][0])
  )
}

type UsedRelay = {
  relayDirectAddress: Multiaddr
  ourCircuitAddress: Multiaddr
}

export const RELAY_CHANGED_EVENT = 'relay:changed'

export const ENTRY_NODES_MAX_PARALLEL_DIALS = 14

export class EntryNodes extends EventEmitter implements Initializable, Startable {
  // Nodes with good availability
  protected availableEntryNodes: EntryNodeData[]
  // New nodes with unclear availability
  protected uncheckedEntryNodes: PeerStoreType[]
  // Nodes that have been offline in the past
  protected offlineEntryNodes: PeerStoreType[]

  private stopDHTRenewal: (() => void) | undefined

  protected usedRelays: UsedRelay[]

  private _isStarted: boolean

  private components: Components | undefined

  private _onNewRelay: ((peer: PeerStoreType) => void) | undefined
  private _onRemoveRelay: ((peer: PeerId) => void) | undefined
  private _connectToRelay: EntryNodes['connectToRelay'] | undefined
  public _onEntryNodeDisconnect: EntryNodes['onEntryDisconnect'] | undefined

  constructor(private dialDirectly: HoprConnect['dialDirectly'], private options: HoprConnectOptions) {
    super()

    this._isStarted = false
    this.availableEntryNodes = []
    this.uncheckedEntryNodes = options.initialNodes ?? []
    this.offlineEntryNodes = []

    this.usedRelays = []
  }

  public isStarted() {
    return this._isStarted
  }

  /**
   * Attaches listeners that handle addition and removal of
   * entry nodes
   */
  public start() {
    this._connectToRelay = this.connectToRelay.bind(this)
    this._onEntryNodeDisconnect = this.onEntryDisconnect.bind(this)

    if (this.options.publicNodes != undefined) {
      const limiter = oneAtATime()
      this._onNewRelay = (peer: PeerStoreType) => {
        limiter(async () => {
          log(`peer online`, peer.id.toString())
          await this.onNewRelay(peer)
        })
      }
      this._onRemoveRelay = (peer: PeerId) => {
        limiter(async () => {
          log(`peer offline`, peer.toString())
          await this.onRemoveRelay(peer)
        })
      }

      this.options.publicNodes.on('addPublicNode', this._onNewRelay)
      this.options.publicNodes.on('removePublicNode', this._onRemoveRelay)
    }

    this.startDHTRenewInterval()
    this._isStarted = true
  }

  /**
   * Removes event listeners
   */
  public stop() {
    if (!this._isStarted) {
      return
    }

    if (this.options.publicNodes != undefined && this._onNewRelay != undefined && this._onRemoveRelay != undefined) {
      this.options.publicNodes.removeListener('addPublicNode', this._onNewRelay)

      this.options.publicNodes.removeListener('removePublicNode', this._onRemoveRelay)
    }

    this.stopDHTRenewal?.()
    this._isStarted = false
  }

  public init(components: Components) {
    this.components = components
  }

  public getComponents(): Components {
    if (this.components == null) {
      throw errCode(new Error('components not set'), 'ERR_SERVICE_MISSING')
    }

    return this.components
  }

  private onEntryDisconnect(ma: Multiaddr) {
    const tuples = ma.tuples() as [code: number, addr: Uint8Array][]
    const peer = peerIdFromBytes(tuples[2][1].slice(1))

    log(`Disconnected from entry node ${peer.toString()}`)

    for (const usedRelay of this.usedRelays) {
      const relayTuples = usedRelay.relayDirectAddress.tuples()

      if (u8aEquals(tuples[2][1], relayTuples[2][1])) {
        let attempt = 0

        retryWithBackoff(
          async () => {
            attempt++
            const result = await this.connectToRelay(peer, usedRelay.relayDirectAddress, ENTRY_NODE_CONTACT_TIMEOUT)
            log(
              `Reconnect attempt ${attempt} to entry node ${peer.toString()} was ${
                result.entry.latency >= 0 ? 'successful' : 'not successful'
              }`
            )

            if (result.entry.latency < 0) {
              // Throw error to signal `retryWithBackoff` that dial attempt
              // was not successful
              throw Error(KNOWN_DISCONNECT_ERROR)
            }
          },
          {
            minDelay: this.options.entryNodeReconnectBaseTimeout ?? DEFAULT_ENTRY_NODE_RECONNECT_BASE_TIMEOUT,
            maxDelay: 10 * (this.options.entryNodeReconnectBaseTimeout ?? DEFAULT_ENTRY_NODE_RECONNECT_BASE_TIMEOUT),
            delayMultiple: this.options.entryNodeReconnectBackoff ?? DEFAULT_ENTRY_NODE_RECONNECT_BACKOFF
          }
        ).catch((err: any) => {
          // Forward unexpected errors
          if (err.message !== KNOWN_DISCONNECT_ERROR) {
            throw err
          } else {
            // Keep the entry node on the list, to avoid losing information about ALL of them
            //this.onRemoveRelay(peer)
            error(`Re-connection to relay ${peer.toString()} failed.`)
          }
        })

        // Once found, quit loop
        break
      }
    }
  }

  private startDHTRenewInterval() {
    const renewDHTEntries = async function (this: EntryNodes) {
      const work: Parameters<EntryNodes['connectToRelay']>[] = []
      for (const relay of this.getUsedRelayPeerIds()) {
        const relayEntry = this.availableEntryNodes.find((entry: EntryNodeData) => entry.id.equals(relay))

        if (relayEntry == undefined) {
          log(`Relay ${relay.toString()} has been removed from list of available entry nodes. Not renewing this entry`)
          continue
        }

        work.push([relay, relayEntry.multiaddrs[0], ENTRY_NODE_CONTACT_TIMEOUT])
      }

      await nAtATime(this._connectToRelay as EntryNodes['connectToRelay'], work, ENTRY_NODES_MAX_PARALLEL_DIALS)
    }.bind(this)

    this.stopDHTRenewal = retimer(renewDHTEntries, () => this.options.dhtRenewalTimeout ?? DEFAULT_DHT_ENTRY_RENEWAL)
  }

  /**
   * @returns a list of entry nodes that are currently used (as relay circuit addresses with us)
   */
  public getUsedRelayAddresses() {
    return this.usedRelays.map((ur: UsedRelay) => ur.ourCircuitAddress)
  }

  /**
   * Convenience method to retrieved used relay peer IDs.
   * @returns a list of peer IDs of used relays.
   */
  public getUsedRelayPeerIds() {
    return this.getUsedRelayAddresses().map((ma: Multiaddr) => relayFromRelayAddress(ma))
  }

  /**
   * @returns a list of entry nodes that are considered to be online
   */
  public getAvailabeEntryNodes() {
    return this.availableEntryNodes
  }

  /**
   * @returns a list of entry nodes that will be checked once the
   * list of entry nodes is built or rebuilt next time
   */
  public getUncheckedEntryNodes() {
    return this.uncheckedEntryNodes
  }

  /**
   * Called once there is a new relay opportunity known
   * @param peer PeerInfo of node that is added as a relay opportunity
   */
  protected async onNewRelay(peer: PeerStoreType): Promise<void> {
    if (peer.id.equals(this.getComponents().getPeerId())) {
      // Cannot use self as entry node
      return
    }

    if (peer.multiaddrs == undefined || peer.multiaddrs.length == 0) {
      log(`Received entry node ${peer.id.toString()} without any multiaddr`)
      // Nothing to do
      return
    }

    let receivedNewAddrs = false

    let knownPeer = false

    for (const nodeList of [this.uncheckedEntryNodes, this.availableEntryNodes, this.offlineEntryNodes]) {
      for (const node of nodeList) {
        if (node.id.equals(peer.id)) {
          knownPeer = true
          log(
            `Received new address${peer.multiaddrs.length == 1 ? '' : 'es'} ${peer.multiaddrs
              .map((ma) => ma.decapsulateCode(CODE_P2P).toString())
              .join(', ')} for ${peer.id.toString()}`
          )

          const existing = new Set(node.multiaddrs.map((ma: Multiaddr) => ma.decapsulateCode(CODE_P2P).toString()))
          for (const ma of peer.multiaddrs) {
            if (!existing.has(ma.decapsulateCode(CODE_P2P).toString())) {
              node.multiaddrs.push(ma.decapsulateCode(CODE_P2P).encapsulate(`/p2p/${peer.id.toString()}`))
              receivedNewAddrs = true
              break
            }
          }
          break
        }
      }

      // Node list are supposed to be disjoint, so we can stop once found
      if (knownPeer) {
        break
      }
    }

    if (!knownPeer) {
      this.uncheckedEntryNodes.push({
        id: peer.id,
        multiaddrs: peer.multiaddrs.filter(isUsableRelay)
      })
      receivedNewAddrs = true
    }

    // Stop adding and checking relay nodes if we already have enough.
    // Once a relay goes offline, the node will try to replace the offline relay.
    if (receivedNewAddrs && this.usedRelays.length < MAX_RELAYS_PER_NODE) {
      // Rebuild list of relay nodes later
      await this.updatePublicNodes()
    }
  }

  /**
   * Called once a node is considered to be offline
   * @param peer PeerId of node that is considered to be offline now
   */
  protected async onRemoveRelay(peer: PeerId) {
    for (const [index, publicNode] of this.availableEntryNodes.entries()) {
      if (publicNode.id.equals(peer)) {
        // Remove node without changing order
        this.availableEntryNodes.splice(index, 1)
        this.offlineEntryNodes.push(publicNode)

        // Assuming that node does not appear more than once
        break
      }
    }

    let inUse = false
    for (const relayPeer of this.getUsedRelayPeerIds()) {
      // remove second part of relay address to get relay peerId
      if (relayPeer.equals(peer)) {
        inUse = true
        break
      }
    }

    // Only rebuild list of relay nodes if node is *in use*
    if (inUse) {
      // Rebuild list of relay nodes later
      await this.updatePublicNodes()
    }
  }

  /**
   * Updates existing available entry node with potential new addresses
   * @param uncheckedNode new unchecked entry
   */
  private updateAddrsOfAvailableNodes(uncheckedNode: PeerStoreType): void {
    const index = this.availableEntryNodes.findIndex((entry) => entry.id.equals(uncheckedNode.id))

    if (index < 0) {
      // The node is new, so nothing to do here
      return
    }

    // If address is not yet known, add it as it could eventually become useful.
    const existing = new Set(
      this.availableEntryNodes[index].multiaddrs.map((ma: Multiaddr) => ma.decapsulateCode(CODE_P2P).toString())
    )

    for (const ma of uncheckedNode.multiaddrs) {
      if (!existing.has(ma.decapsulateCode(CODE_P2P).toString())) {
        this.availableEntryNodes[index].multiaddrs.push(
          ma.decapsulateCode(CODE_P2P).encapsulate(`/p2p/${uncheckedNode.id.toString()}`)
        )
      }
    }
  }

  /**
   * Filters list of unchecked entry nodes before contacting them
   * @returns a filtered list of entry nodes
   */
  private filterUncheckedNodes(): PeerStoreType[] {
    const knownNodes = new Set<string>(this.availableEntryNodes.map((entry: EntryNodeData) => entry.id.toString()))
    const nodesToCheck: PeerStoreType[] = []

    for (const uncheckedNode of this.uncheckedEntryNodes) {
      if (uncheckedNode.id.equals(this.getComponents().getPeerId())) {
        // Cannot use self as entry node
        continue
      }

      const usableAddresses = uncheckedNode.multiaddrs.filter(isUsableRelay)

      if (knownNodes.has(uncheckedNode.id.toString())) {
        this.updateAddrsOfAvailableNodes({
          id: uncheckedNode.id,
          multiaddrs: usableAddresses
        })

        // Nothing to do. Existing public nodes are added later
        continue
      }

      let inUse = false
      for (const usedRelay of this.usedRelays) {
        for (const usableAddress of usableAddresses) {
          if (compareDirectConnectionInfo(usedRelay.relayDirectAddress, usableAddress)) {
            inUse = true
            break
          }
        }

        if (inUse) {
          break
        }
      }

      if (inUse) {
        // Nothing to do
        continue
      }

      nodesToCheck.push({
        id: uncheckedNode.id,
        multiaddrs: usableAddresses.map((ma) =>
          ma.decapsulateCode(CODE_P2P).encapsulate(`/p2p/${uncheckedNode.id.toString()}`)
        )
      })
    }

    return nodesToCheck
  }

  /**
   * Returns arguments to call `connectToRelay`
   *
   * 1. unchecked nodes <- recently learned
   * 2. available nodes <- have been online once
   * 3. offline nodes <- have been marked offline but could be back
   *
   * @returns arguments to probe nodes
   */
  private getNodesToContact(): Parameters<EntryNodes['connectToRelay']>[] {
    const args: Parameters<EntryNodes['connectToRelay']>[] = []
    const uncheckedNodes = this.filterUncheckedNodes()

    for (const nodeList of [uncheckedNodes, this.availableEntryNodes, this.offlineEntryNodes]) {
      for (const node of nodeList) {
        for (const ma of node.multiaddrs) {
          args.push([node.id, ma, ENTRY_NODE_CONTACT_TIMEOUT])
        }
      }
    }

    return args
  }

  protected updateRecords(groupedResults: { [index: string]: (EntryNodeData | Error | undefined)[] }) {
    // @TODO replace this by a more efficient data structure
    const availableOnes = new Set<string>(this.availableEntryNodes.map((nodeData) => nodeData.id.toString()))
    const uncheckedOnes = new Set<string>(this.uncheckedEntryNodes.map((nodeData) => nodeData.id.toString()))
    const offlineOnes = new Set<string>(this.offlineEntryNodes.map((nodeData) => nodeData.id.toString()))

    for (const [id, results] of Object.entries(groupedResults)) {
      if (results.every((result) => result == undefined)) {
        // Nothing to do because no additional good or bad knowledge
        continue
      }

      if (results.every((result) => result instanceof Error)) {
        if (availableOnes.has(id)) {
          for (const [i, available] of this.availableEntryNodes.entries()) {
            if (available.id.toString() === id) {
              // move from available to offline
              this.offlineEntryNodes.push(this.availableEntryNodes.splice(i, 1)[0])
              break
            }
          }
        } else if (uncheckedOnes.has(id)) {
          for (const [i, unchecked] of this.uncheckedEntryNodes.entries()) {
            if (unchecked.id.toString() === id) {
              // move from unchecked to offline
              this.offlineEntryNodes.push(this.uncheckedEntryNodes.splice(i, 1)[0])
              break
            }
          }
        }
      } else {
        const positiveLowestLatency = results.reduce((acc, result) => {
          if (result != undefined && !(result instanceof Error)) {
            if (result.latency < acc) {
              return result.latency
            }
          }
          return acc
        }, Infinity)

        if (positiveLowestLatency < Infinity) {
          if (offlineOnes.has(id)) {
            for (const [i, offline] of this.offlineEntryNodes.entries()) {
              if (offline.id.toString() === id) {
                // move from offlne to available
                this.availableEntryNodes.push({
                  ...this.offlineEntryNodes.splice(i, 1)[0],
                  latency: positiveLowestLatency
                })
                break
              }
            }
          } else if (uncheckedOnes.has(id)) {
            for (const [i, unchecked] of this.uncheckedEntryNodes.entries()) {
              if (unchecked.id.toString() === id) {
                // move from unchecked to available
                this.availableEntryNodes.push({
                  ...this.uncheckedEntryNodes.splice(i, 1)[0],
                  latency: positiveLowestLatency
                })
                break
              }
            }
          }
        }
      }
    }

    this.availableEntryNodes.sort(latencyCompare)
  }

  /**
   * Updates the list of exposed entry nodes.
   * Called at startup and once an entry node is considered offline.
   */
  async updatePublicNodes(): Promise<void> {
    log(`Updating list of used relay nodes ...`)

    // Don't add already used ones
    // identified by peerId
    const addrsToContact = this.getNodesToContact()

    const start = Date.now()
    const results = await nAtATime(
      this._connectToRelay as EntryNodes['connectToRelay'],
      addrsToContact,
      ENTRY_NODES_MAX_PARALLEL_DIALS,
      (results: (Awaited<ReturnType<EntryNodes['connectToRelay']>> | Error | undefined)[]) => {
        let availableNodes = 0
        for (const result of results) {
          if (result != undefined && !(result instanceof Error) && result.entry.latency >= 0) {
            availableNodes++
            if (availableNodes >= MAX_RELAYS_PER_NODE) {
              return true
            }
          }
        }

        return false
      }
    )

    const groupedResults = results.reduce((acc, result, index) => {
      const toAdd = result instanceof Error || result == undefined ? result : result.entry
      const address = addrsToContact[index][0].toString()
      if (acc[address] == undefined) {
        acc[address] = [toAdd]
      } else {
        acc[address].push(toAdd)
      }
      return acc
    }, {} as { [index: string]: (EntryNodeData | Error | undefined)[] })

    this.updateRecords(groupedResults)

    log(
      `Checking ${results.filter((result) => result != undefined).length} potential entry node addresses done in ${
        Date.now() - start
      } ms.`
    )

    results.sort(compareConnectionResults)

    let successfulOnes = -1
    for (const [index, result] of results.entries()) {
      if (result == undefined || result instanceof Error || result.entry.latency < 0) {
        successfulOnes = index - 1
        break
      }
    }

    const previous = new Set<string>(this.getUsedRelayPeerIds().map((p: PeerId) => p.toString()))

    if (successfulOnes >= 0) {
      // Close all unnecessary connections
      if (successfulOnes > MAX_RELAYS_PER_NODE) {
        await nAtATime(
          attemptClose,
          results
            .slice(MAX_RELAYS_PER_NODE, successfulOnes)
            .map<[Connection, (arg: any) => void]>((result) => [
              (result as ConnectionResult).conn as Connection,
              error
            ]),
          ENTRY_NODES_MAX_PARALLEL_DIALS
        )
      }

      this.usedRelays = this.availableEntryNodes
        // select only those entry nodes with smallest latencies
        .slice(0, MAX_RELAYS_PER_NODE)
        .map((entry: EntryNodeData) => {
          return {
            relayDirectAddress: entry.multiaddrs[0],
            ourCircuitAddress: createCircuitAddress(entry.id, this.getComponents().getPeerId())
          }
        })
    } else {
      log(`Could not connect to any entry node. Other nodes may not or no longer be able to connect to this node.`)
      // Reset to initial state
      this.usedRelays = []
    }

    let isDifferent = false

    if (this.usedRelays.length != previous.size) {
      isDifferent = true
    } else {
      for (const usedRelayPeerIds of this.getUsedRelayPeerIds()) {
        if (!previous.has(usedRelayPeerIds.toString())) {
          isDifferent = true
          break
        }
      }
    }

    if (isDifferent) {
      log(`Current relay addresses:`)
      for (const ma of this.usedRelays) {
        log(` - ${ma.ourCircuitAddress.toString()}`)
      }

      this.emit(RELAY_CHANGED_EVENT)
    }
  }

  private async establishNewConnection(
    destination: PeerId,
    destinationAddress: Multiaddr,
    timeout: number,
    onDisconnect: (ma: Multiaddr) => void
  ): Promise<ConnResult | void> {
    const abort = new AbortController()
    let done = false

    // Abort (direct) connection attempt once timeout is due
    setTimeout(() => {
      if (!done) {
        abort.abort()
      }
    }, timeout).unref()

    let conn: Connection | undefined
    try {
      conn = await this.dialDirectly(destinationAddress, {
        signal: abort.signal,
        // libp2p interface type clash
        upgrader: this.getComponents().getUpgrader() as any,
        onDisconnect
      })
    } catch (err: any) {
      error(`error while contacting entry node ${destination.toString()}.`, err.message)
      await attemptClose(conn, error)
    }

    // Prevent timeout from doing anything
    done = true

    if (conn == undefined) {
      return
    }

    const protocol = CAN_RELAY_PROTCOL(this.options.environment)

    let stream: ProtocolStream['stream'] | undefined
    try {
      stream = (await conn.newStream([protocol]))?.stream
    } catch (err) {
      error(`Cannot use relay.`, err)
      await attemptClose(conn, error)
    }

    if (conn != undefined && stream != undefined) {
      return {
        conn,
        stream,
        protocol
      }
    }
  }

  /**
   * Attempts to connect to a relay node
   * @param id peerId of the node to dial
   * @param relay multiaddr to perform the dial
   * @param timeout when to timeout on unsuccessful dial attempts
   * @returns a PeerStoreEntry containing the measured latency
   */
  private async connectToRelay(
    id: PeerId,
    relay: Multiaddr,
    timeout: number
  ): Promise<{ entry: EntryNodeData; conn?: Connection }> {
    const start = Date.now()

    let conn = await tryExistingConnections(this.getComponents(), id, CAN_RELAY_PROTCOL(this.options.environment))

    if (conn == null) {
      conn = await this.establishNewConnection(
        id,
        relay,
        timeout,
        this._onEntryNodeDisconnect as EntryNodes['onEntryDisconnect']
      )
    }

    if (conn == null) {
      return {
        entry: {
          id,
          multiaddrs: [relay],
          latency: -1
        }
      }
    }

    let done = false

    // calls the iterator, thereby starts the stream and
    // consumes the first messages, afterwards closes the stream
    for await (const msg of conn.stream.source as AsyncIterable<Uint8Array>) {
      verbose(`can relay received ${new TextDecoder().decode(msg.slice())} from ${id.toString()}`)
      if (u8aEquals(msg.slice(), OK)) {
        done = true
      }
      // End receive stream after first message
      break
    }

    try {
      // End the send stream by sending nothing
      conn.stream.sink((async function* () {})()).catch(error)
    } catch (err) {
      error(err)
    }

    if (done) {
      return {
        conn: conn.conn,
        entry: {
          id,
          multiaddrs: [relay],
          latency: Date.now() - start
        }
      }
    } else {
      return {
        entry: {
          id,
          multiaddrs: [relay],
          latency: -1
        }
      }
    }
  }
}
