import { networkInterfaces, NetworkInterfaceInfo } from 'os'
import Multiaddr from 'multiaddr'

import Debug from 'debug'
const log = Debug('hopr-connect')

export function isAnyAddress(ma: Multiaddr) {
  if (!['ip4', 'ip6'].includes(ma.protoNames()[0])) {
    return false
  }

  const cOpts = ma.nodeAddress()

  if (cOpts.family === 'IPv4') {
    return cOpts.address === '0.0.0.0'
  }

  if (cOpts.family === 'IPv6') {
    return cOpts.address === '::'
  }

  return false
}

function isLinkLocaleAddress(address: string, family: 'IPv4' | 'IPv6') {
  switch (family) {
    case 'IPv4':
      return (
        address.startsWith('192.168.') ||
        address.startsWith('10.') ||
        address.startsWith('172.16.') ||
        address.startsWith('169.254.') ||
        address.startsWith('100.64')
      )
    case 'IPv6':
      return address.startsWith('fe80')
    default:
      throw Error(`Invalid address family`)
  }
}

function isLocalhostAddress(address: string, family: 'IPv4' | 'IPv6') {
  switch (family) {
    case 'IPv4':
      return address === '127.0.0.1'
    case 'IPv6':
      return address === '::1'
    default:
      throw Error(`Invalid address family`)
  }
}

export function getAddrs(
  port: number,
  peerId: string,
  options?: {
    interface?: string
    useIPv4?: boolean
    useIPv6?: boolean
    includeLocalIPv4?: boolean
    includeLocalIPv6?: boolean
    includeLocalhostIPv4?: boolean
    includeLocalhostIPv6?: boolean
  }
) {
  let interfaces: NetworkInterfaceInfo[][]

  if (options?.interface != undefined) {
    let _tmp = networkInterfaces()[options.interface]

    if (_tmp == undefined) {
      log(
        `Interface <${options.interface}> does not exist on this machine. Available are <${Object.keys(
          networkInterfaces()
        ).join(', ')}>`
      )
      return []
    }
    interfaces = [_tmp]
  } else {
    interfaces = Object.values(networkInterfaces())
  }

  const multiaddrs: Multiaddr[] = []

  for (let i = 0; i < interfaces.length; i++) {
    const addresses = interfaces[i]

    for (let j = 0; j < addresses.length; j++) {
      if (isLinkLocaleAddress(addresses[j].address, addresses[j].family)) {
        if (addresses[j].family === 'IPv4' && (options == undefined || options.includeLocalIPv4 != true)) {
          continue
        }
        if (addresses[j].family === 'IPv6' && (options == undefined || options.includeLocalIPv6 != true)) {
          continue
        }
      }

      if (isLocalhostAddress(addresses[j].address, addresses[j].family)) {
        if (addresses[j].family === 'IPv4' && (options == undefined || options.includeLocalhostIPv4 != true)) {
          continue
        }
        if (addresses[j].family === 'IPv6' && (options == undefined || options.includeLocalhostIPv6 != true)) {
          continue
        }
      }

      if (addresses[j].family === 'IPv4' && options != undefined && options.useIPv4 == false) {
        continue
      }

      if (addresses[j].family === 'IPv6' && options != undefined && options.useIPv6 == false) {
        continue
      }

      multiaddrs.push(
        Multiaddr.fromNodeAddress(
          {
            ...addresses[j],
            port: port.toString()
          },
          'tcp'
        ).encapsulate(`/p2p/${peerId}`)
      )
    }
  }

  return multiaddrs
}
