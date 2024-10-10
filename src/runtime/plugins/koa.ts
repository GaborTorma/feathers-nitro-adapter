import type { Application as FeathersKoaApplication } from '@feathersjs/koa'
import type { NitroApp, NitroAppPlugin } from 'nitropack'
import { defineNitroPlugin } from 'nitropack/dist/runtime/plugin'
import { createKoaRouter } from '../routers'
import { setup } from '../setup'

export function createFeathersKoaAdapterNitroPlugin(feathersApp: FeathersKoaApplication, path?: string): NitroAppPlugin {
  return defineNitroPlugin((nitroApp: NitroApp) => {
    nitroApp.hooks.hook('feathers:afterSetup', async () => {
      createKoaRouter(feathersApp, path)
    })

    void setup(nitroApp, feathersApp) // TODO: make async in Nitro v3
  })
}
