/* eslint-disable ts/no-unsafe-call */
/* eslint-disable ts/no-unsafe-assignment */
/* eslint-disable ts/no-unsafe-member-access */

import type { Application as ExpressApplication } from '@feathersjs/express'
import type { Application as FeathersApplication } from '@feathersjs/feathers'
import type { Application as KoaApplication } from '@feathersjs/koa'
import type { Server as Engine } from 'engine.io'
import type Koa from 'koa'
import type { NitroApp, NitroAppPlugin } from 'nitropack'
import express, { type Application as Express } from 'express'
import { defineEventHandler, type EventHandler, fromNodeMiddleware } from 'h3'
import { defineNitroPlugin } from 'nitropack/dist/runtime/plugin'

export type Application = FeathersApplication | ExpressApplication | KoaApplication

export type FeathersNitroPluginOptions = {
  engine?: Engine
  apiPath?: string
  socketIoPath?: string
} & ({
  express: Express
  koa?: never
} | {
  express?: never
  koa: Koa
} | {
  express?: never
  koa?: never
})

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

async function koaPrefixRemoverHandler(app: KoaApplication, prefix: string): Promise<ReturnType<KoaApplication['callback']>> {
  return async (req, res) => {
    req.url = req.url?.replace(new RegExp(`^${prefix}`), '') || '/'
    return app.callback()(req, res)
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
    if (options?.express || options?.koa) {
      let handler: EventHandler = async () => {}

      if (options.express) {
        const api = express()
        api.use(apiPath, options.express)
        handler = fromNodeMiddleware(api)
        nitroApp.router.use(apiPath, handler)
      }

      if (options.koa) {
        const koaHandler = await koaPrefixRemoverHandler(app as KoaApplication, apiPath)

        /* const koaHandler = async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
          req.url = req.url?.replace(new RegExp(`^${apiPath}`), '') || '/'
          return (app as KoaApplication).callback()(req, res)
        } */
        handler = eventHandler(async (event) => {
          return callNodeListener(
            koaHandler,
            event.node.req,
            event.node.res,
          )
        })
      }

      nitroApp.router.use(apiPath, handler)
      nitroApp.router.use(`${apiPath}/**`, handler)
    }

    /* if (options?.koa) { // express mounted
      const api = express()
      api.use(apiPath, (app as KoaApplication).callback())
      nitroApp.router.use(`${apiPath}`, fromNodeMiddleware(api))
      nitroApp.router.use(`/api/messages`, fromNodeMiddleware(api))
    } */

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
