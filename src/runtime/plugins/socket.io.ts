import type { Application as FeathersApplication } from '@feathersjs/feathers'
import type { NitroApp, NitroAppPlugin } from 'nitropack'
import type { IncomingMessage } from 'node:http'
import type { Server as SocketServer } from 'socket.io'
import { Server as EngineServer } from 'engine.io'
import { defineNitroPlugin } from 'nitropack/dist/runtime/plugin'
import { setup } from '../setup'

type EngineRequest = Parameters<EngineServer['handleRequest']>[0]

interface NodePeer {
  req: IncomingMessage
  ws: WebSocket
}

interface NodeContext<Peer> {
  node: Peer
}

interface Peer<Context> {
  ctx: Context
}

export function createFeathersSocketIoAdapterNitroPlugin(feathersApp: FeathersApplication): NitroAppPlugin {
  return defineNitroPlugin((nitroApp: NitroApp) => {
    nitroApp.hooks.hook('feathers:afterSetup', async (app: FeathersApplication) => {
      const io = app.io as SocketServer
      io.bind(new EngineServer())

      // @ts-expect-error private method
      // eslint-disable-next-line ts/no-unsafe-argument
      nitroApp.router.use(io._path, defineEventHandler({
        handler(event) {
          io.engine.handleRequest(event.node.req as EngineRequest, event.node.res)
          event._handled = true
        },
        websocket: {
          open(peer: Peer<NodeContext<NodePeer>>) {
            const nodeContext = peer.ctx.node

            const req = nodeContext.req

            // @ts-expect-error private method
            // eslint-disable-next-line ts/no-unsafe-call
            io.engine.prepare(req)

            const rawSocket = nodeContext.req.socket
            const websocket = nodeContext.ws

            // @ts-expect-error private method
            // eslint-disable-next-line ts/no-unsafe-call
            io.engine.onWebSocket(req, rawSocket, websocket)
          },
        },
      }))
    })
    void setup(nitroApp, feathersApp) // TODO: make async in Nitro v3
  })
}
