import type { Application as FeathersExpressApplication } from '@feathersjs/express'
import type { NitroApp, NitroAppPlugin } from 'nitropack'
import express, { type Application as ExpressApplication } from 'express'
import { defineNitroPlugin } from 'nitropack/dist/runtime/plugin'
import { setup } from '../setup'

export function createFeathersExpressAdapterNitroPlugin(feathersApp: FeathersExpressApplication, path: string = '/api'): NitroAppPlugin {
  return defineNitroPlugin((nitroApp: NitroApp) => {
    nitroApp.hooks.hook('feathers:afterSetup', async () => {
      const api = express()
      api.use(path, feathersApp as any as ExpressApplication)

      const handler = fromNodeMiddleware(api)

      nitroApp.router.use(path, handler)
      nitroApp.router.use(`${path}/**`, handler)
    })

    void setup(nitroApp, feathersApp) // TODO: make async in Nitro v3
  })
}
