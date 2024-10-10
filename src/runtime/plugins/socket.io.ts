import type { Application as FeathersApplication } from '@feathersjs/feathers'
import type { NitroApp, NitroAppPlugin } from 'nitropack'
import {} from '@feathersjs/socketio'
import { defineNitroPlugin } from 'nitropack/dist/runtime/plugin'
import { createSocketIoRouter } from '../routers'
import { setup } from '../setup'

export function createFeathersSocketIoAdapterNitroPlugin(feathersApp: FeathersApplication): NitroAppPlugin {
  return defineNitroPlugin((nitroApp: NitroApp) => {
    nitroApp.hooks.hook('feathers:afterSetup', createSocketIoRouter)

    void setup(nitroApp, feathersApp) // TODO: make async in Nitro v3
  })
}
