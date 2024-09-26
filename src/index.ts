import type { NitroApp } from 'nitropack'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { defineEventHandler, defineWebSocketHandler, fromNodeMiddleware } from 'h3'
import { defineNitroPlugin } from 'nitropack/dist/runtime/plugin'

// Declare custom Nitro hook
declare module 'nitropack' {
  interface NitroRuntimeHooks {
    'nitro:myPlugin'(): void
  }
}

export default defineNitroPlugin((nitroApp: NitroApp) => {
  // Call custom Nitro hook
  void nitroApp.hooks.callHook('nitro:myPlugin')

  // Native h3 handler
  nitroApp.router.use('/hello', defineEventHandler((_event) => {
    return 'world'
  }))

  // WebSocket (crossws) handler https://nitro.unjs.io/guide/websocket#usage
  nitroApp.router.use('/_ws', defineWebSocketHandler({
    open(peer) {
      console.log('[ws] open', peer)
    },

    message(peer, message) {
      console.log('[ws] message', peer, message)
      if (message.text().includes('ping')) {
        peer.send('pong')
      }
    },

    close(peer, event) {
      console.log('[ws] close', peer, event)
    },

    error(peer, error) {
      console.log('[ws] error', peer, error)
    },
  }))

  // Dummy express/node middleware
  const expressMiddleware = (req: IncomingMessage, res: ServerResponse, next: (err?: Error) => any) => {
    console.log(`Request Method: ${req.method}, Request URL: ${req.url}`)
    res.end('Express middleware')
    next()
  }
  // Express middleware
  nitroApp.router.use('/express', fromNodeMiddleware(expressMiddleware))
})
