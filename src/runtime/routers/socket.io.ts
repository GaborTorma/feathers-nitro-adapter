import type { Application as FeathersApplication } from '@feathersjs/feathers'
import type { IncomingMessage } from 'node:http'
import type { Socket } from 'node:net'
import type { Server as SocketServer } from 'socket.io'
import {} from '@feathersjs/socketio' // need for declaration merging
import { Server as EngineServer } from 'engine.io'
import { defineEventHandler } from 'h3'

type EngineRequest = Parameters<EngineServer['handleRequest']>[0]

interface CrossWs03Peer {
  request: {
    _req: IncomingMessage
  }
  websocket: WebSocket
}

interface CrossWs02Peer {
  ctx: {
    node: {
      req: IncomingMessage
      ws: WebSocket
    }
  }
}

export async function createSocketIoRouter(feathersApp: FeathersApplication) {
  if (feathersApp.nitroApp) {
    const io = feathersApp.io as SocketServer
    io.bind(new EngineServer())

    // @ts-expect-error private property
    // eslint-disable-next-line ts/no-unsafe-argument
    feathersApp.nitroApp.router.use(io._path, defineEventHandler({
      handler(event) {
        io.engine.handleRequest(event.node.req as EngineRequest, event.node.res)
        event._handled = true
      },
      websocket: {
        open(peer: CrossWs02Peer | CrossWs03Peer) {
          let req: IncomingMessage
          let websocket: WebSocket
          let rawSocket: Socket

          if ((peer as CrossWs02Peer).ctx) {
            // original peer format in crossws ^0.2
            // this version used in unit test
            const peer02 = peer as CrossWs02Peer
            const nodeContext = peer02.ctx.node
            req = nodeContext.req
            rawSocket = nodeContext.req.socket
            websocket = nodeContext.ws
          }
          else if ((peer as CrossWs03Peer).request) {
            // new peer format in crossws ^0.3
            // more info: https://github.com/unjs/crossws/releases/tag/v0.3.0
            const peer03 = peer as CrossWs03Peer
            req = peer03.request._req
            rawSocket = req.socket
            websocket = peer03.websocket
          }
          else {
            throw new Error('Unknown peer type')
          }

          // @ts-expect-error private method
          // eslint-disable-next-line ts/no-unsafe-call
          io.engine.prepare(req)

          // @ts-expect-error private method
          // eslint-disable-next-line ts/no-unsafe-call
          io.engine.onWebSocket(req, rawSocket, websocket)
        },
      },
    }))
  }
}
