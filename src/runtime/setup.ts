import type { Application } from '@feathersjs/feathers'
import type { NitroApp } from 'nitropack'

export async function setup(nitroApp: NitroApp, feathersApp: Application) {
  if (!feathersApp._isSetup && !feathersApp._isSetupStarted) {
    feathersApp._isSetupStarted = true
    feathersApp.nitroApp = nitroApp

    await nitroApp.hooks.callHook('feathers:beforeSetup', feathersApp)

    await feathersApp.setup()

    feathersApp._isSetupStarted = false

    nitroApp.hooks.hook('close', async () => feathersApp.teardown())

    await nitroApp.hooks.callHook('feathers:afterSetup', feathersApp)
  }
}
