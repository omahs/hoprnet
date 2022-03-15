/*
 * Maintain a websocket connection
 */

import { Commands } from './commands'

const MAX_MESSAGES_CACHED = 50

const parseCmd = (cmdInput) => {
  const split = cmdInput.trim().split(/\s+/)
  const command = split[0]
  const query = split.slice(1).join(' ')

  if (command == null) {
    return undefined
  }

  return {cmd: command, query: query}
}

export class Connection {
  logs = []
  prevLog = ''
  authFailed = false

  constructor(setConnecting, setReady, setMessages, setConnectedPeers, onAuthFailed, port = 13301, apiToken = "^^LOCAL-testing-123^^") {
    this.setConnecting = setConnecting
    this.setReady = setReady
    this.setMessages = setMessages
    this.setConnectedPeers = setConnectedPeers
    this.onAuthFailed = onAuthFailed
    this.port = port
    this.apiToken = apiToken
    this.connect()
  }

  appendMessage(event) {
    if (event.data === undefined) {
      return
    }

    try {
      const msg = JSON.parse(event.data)

      this.authFailed = false

      switch (msg.type) {
        case 'log':
          if (this.logs.length > MAX_MESSAGES_CACHED) {
            // Avoid memory leak
            this.logs.splice(0, this.logs.length - MAX_MESSAGES_CACHED) // delete elements from start
          }
          this.logs.push(msg)
          this.setMessages(this.logs.slice(0)) // Need a clone
          break
        case 'connected':
          this.setConnectedPeers(msg.msg.split(','))
          break
        case 'fatal-error':
          this.logs.push(msg)

          // Let's elaborate on certain error messages:
          if (msg.msg.indexOf('account has no funds') > -1) {
            this.logs.push({ msg: '- Please send 0.1 gETH to the account', ts: new Date().toISOString() })
            this.logs.push({ msg: '- Then restart the node', ts: new Date().toISOString() })
          }

          this.setMessages(this.logs.slice(0)) // Need a clone
          break
        case 'status':
          if (msg.msg === 'READY') {
            this.setReady(true)
          } else {
            this.setReady(false)
          }
          break
        case 'auth-failed':
          this.logs.push(msg)
          this.authFailed = true
          this.setConnecting(false)
          this.onAuthFailed()
          break
      }
    } catch (e) {
      console.log('ERR', e)
    }
  }

  logger = (msg) => {
    try {
      this.logs.push({type: "log", msg: msg, ts: ""})
      this.setMessages(this.logs.slice(0)) // Need a clone
    } catch (e) {
      console.log('ERR', e)
    }
  }

  async connect() {
    console.log('Connecting ...')
    console.log(`Using... API PORT: ${this.port}, API_TOKEN: ${this.apiToken}`)
    var client
    try {
      // See https://stackoverflow.com/a/55487820
      client = navigator.clipboard
        ? await fetch(`https://${window.location.host}/api/ssl`).then(
            (_) => new WebSocket('wss://' + window.location.host)
          )
        : new WebSocket(`ws://${window.location.hostname}:${this.port}/api/v2/node/stream/websocket/?apiToken=${this.apiToken}`)
    } catch (err) {
      console.log('Invalid SSL or non-SSL support')
      client = new WebSocket(`ws://${window.location.hostname}:${this.port}/api/v2/node/stream/websocket/?apiToken=${this.apiToken}`)
    }

    console.log('Web socket created')

    client.onopen = () => {
      console.log('Web socket opened')
      this.setConnecting(false)

      document.querySelector('#command').onkeydown = (e) => {
        // enter
        if (e.keyCode == 13) {
          var text = e.target.value
          if (text.length > 0) {
            const userInput = parseCmd(text)
            const cmds = new Commands(this.port, this.apiToken);
            switch (userInput.cmd) {
              case "withdraw":
              case "balance":
              case "address":
              case "alias":
              case "channels":
              case "close":
              case "info":
              case "open":
              case "redeemTickets":
              case "tickets":
              case "version":
              case "ping":
              case "settings":
              case "sign":
              case "send":
              case "peers":
              case "help":
                cmds.execute(this.logger, text);
                break
              default:
                this.logger("Command not found.")
                break
            }
            e.target.value = ''
          }
        }
        if (e.keyCode == 38) {
          // Up Arrow
          e.target.value = this.prevLog
        }
      }
    }

    client.onmessage = (event) => {
      this.appendMessage(event)
    }

    client.onerror = (error) => {
      console.log('Connection error:', error)
      this.setConnecting(false)
    }

    client.onclose = () => {
      console.log('Web socket closed')
      this.appendMessage(' --- < Lost Connection, attempting to reconnect... > ---')
      var self = this

      setTimeout(function () {
        try {
          if (!self.authFailed) {
            this.setConnecting(true)
            self.connect()
          }
        } catch (e) {
          console.log('Error connecting', e)
        }
      }, 1000)
    }
  }

  disconnect() {
    if (this.client) {
      this.client.close()
    }
  }
}
