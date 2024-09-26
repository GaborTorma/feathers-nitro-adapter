/* eslint-disable ts/no-unsafe-call */
/* eslint-disable ts/no-unsafe-assignment */
/* eslint-disable ts/no-unsafe-member-access */

import type { Application } from '@feathersjs/express'
import type { Server as Engine } from 'engine.io'
import type { NitroApp, NitroAppPlugin } from 'nitropack'
import express, { type Application as Express } from 'express'
import { defineEventHandler, fromNodeMiddleware } from 'h3'
import { defineNitroPlugin } from 'nitropack/dist/runtime/plugin'

export interface FeathersNitroPluginOptions {
  express?: Express
  engine?: Engine
  apiPath?: string
  socketIoPath?: string
}

export interface FeathersSetupHookParams {
  app: Application
  options?: FeathersNitroPluginOptions
}

declare module 'nitropack' {
  interface NitroRuntimeHooks {
    'feathers:beforeSetup'(params: FeathersSetupHookParams): void
    'feathers:afterSetup'(params: FeathersSetupHookParams): void
  }
}

export function defineFeathersNitroPlugin(app: Application, options?: FeathersNitroPluginOptions): NitroAppPlugin {
  const {
    apiPath = '/api',
    socketIoPath = '/socket.io',
  } = options || {}

  // eslint-disable-next-line ts/no-misused-promises
  return defineNitroPlugin(async (nitroApp: NitroApp) => {
    await nitroApp.hooks.callHook('feathers:beforeSetup', { app, options })
    await app.setup()
    await nitroApp.hooks.callHook('feathers:afterSetup', { app, options })

    if (options?.express) {
      const api = express()
      api.use(apiPath, options.express)

      nitroApp.router.use(`${apiPath}`, fromNodeMiddleware(api))
      nitroApp.router.use(`${apiPath}/*`, fromNodeMiddleware(api))
    }

    if (options?.engine) {
      nitroApp.router.use(socketIoPath, defineEventHandler({
        handler(event) {
          // @ts-expect-error type error
          options.engine?.handleRequest(event.node.req, event.node.res)
          event._handled = true
        },
        websocket: {
          open(peer) {
            const nodeContext = peer.ctx.node
            const req = nodeContext.req

            // @ts-expect-error private method
            options.engine?.prepare(req)

            const rawSocket = nodeContext.req.socket
            const websocket = nodeContext.ws

            // @ts-expect-error private method
            options.engine?.onWebSocket(req, rawSocket, websocket)
          },
        },
      }))
    }
  })
}
