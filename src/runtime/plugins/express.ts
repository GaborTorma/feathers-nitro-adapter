import type { Application as FeathersExpressApplication } from '@feathersjs/express'
import type { NitroApp, NitroAppPlugin } from 'nitropack'
import express, { type Application as ExpressApplication } from 'express'
import { fromNodeMiddleware } from 'h3'
import { defineNitroPlugin } from 'nitropack/dist/runtime/plugin'
import { setup } from '../setup'

export function createExpressRouter(feathersApp: FeathersExpressApplication, path: string = '/feathers') {
  if (feathersApp.nitroApp) {
    const api = express()
    api.use(path, feathersApp as any as ExpressApplication)

    const handler = fromNodeMiddleware(api)

    feathersApp.nitroApp?.router.use(path, handler)
    feathersApp.nitroApp?.router.use(`${path}/**`, handler)
  }
}

export function createFeathersExpressAdapterNitroPlugin(feathersApp: FeathersExpressApplication, path?: string): NitroAppPlugin {
  return defineNitroPlugin((nitroApp: NitroApp) => {
    nitroApp.hooks.hook('feathers:afterSetup', async () => {
      createExpressRouter(feathersApp, path)
    })

    void setup(nitroApp, feathersApp) // TODO: make async in Nitro v3
  })
}
