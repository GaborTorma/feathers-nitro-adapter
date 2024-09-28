import type { Application as FeathersApplication } from '@feathersjs/feathers'
import type { Server as EngineServer } from 'engine.io'
import type { NitroApp, NitroAppPlugin } from 'nitropack'
import type { IncomingMessage } from 'node:http'
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

export function createFeathersSocketIoAdapterNitroPlugin(feathersApp: FeathersApplication, engine: EngineServer, path: string = '/socket.io'): NitroAppPlugin {
  return defineNitroPlugin((nitroApp: NitroApp) => {
    void setup(nitroApp, feathersApp) // TODO: make async in Nitro v3

    nitroApp.router.use(path, defineEventHandler({
      handler(event) {
        engine.handleRequest(event.node.req as EngineRequest, event.node.res)
        event._handled = true
      },
      websocket: {
        open(peer: Peer<NodeContext<NodePeer>>) {
          const nodeContext = peer.ctx.node

          const req = nodeContext.req

          // @ts-expect-error private method
          // eslint-disable-next-line ts/no-unsafe-call
          engine.prepare(req)

          const rawSocket = nodeContext.req.socket
          const websocket = nodeContext.ws

          // @ts-expect-error private method
          // eslint-disable-next-line ts/no-unsafe-call
          engine.onWebSocket(req, rawSocket, websocket)
        },
      },
    }))
  })
}
