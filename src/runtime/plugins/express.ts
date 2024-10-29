import type { Application as FeathersExpressApplication } from '@feathersjs/express'
import type { NitroApp, NitroAppPlugin } from 'nitropack'
import { defineNitroPlugin } from 'nitropack/dist/runtime/plugin'
import { expressErrorHandler } from '../handlers/express'
import { createExpressRouter } from '../routers'
import { setup } from '../setup'

export function createFeathersExpressAdapterNitroPlugin(feathersApp: FeathersExpressApplication, path?: string): NitroAppPlugin {
  return defineNitroPlugin((nitroApp: NitroApp) => {
    feathersApp.configure(expressErrorHandler)

    nitroApp.hooks.hook('feathers:afterSetup', async () => {
      createExpressRouter(feathersApp, path)
    })

    void setup(nitroApp, feathersApp) // TODO: make async in Nitro v3
  })
}
