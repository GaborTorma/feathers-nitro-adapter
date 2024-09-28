import type { Application as FeathersExpressApplication } from '@feathersjs/express'
import type { NitroApp, NitroAppPlugin } from 'nitropack'
import express, { type Application as ExpressApplication } from 'express'
import { defineNitroPlugin } from 'nitropack/dist/runtime/plugin'
import { setup } from '../setup'

export function createFeathersExpressAdapterNitroPlugin(feathersApp: FeathersExpressApplication, expressApp: ExpressApplication, path: string = '/api'): NitroAppPlugin {
  return defineNitroPlugin((nitroApp: NitroApp) => {
    void setup(nitroApp, feathersApp) // TODO: make async in Nitro v3

    const api = express()
    api.use(path, expressApp)

    const handler = fromNodeMiddleware(api)

    nitroApp.router.use(path, handler)
    nitroApp.router.use(`${path}/**`, handler)
  })
}
