import type { Application } from '@feathersjs/feathers'
import type { NitroApp } from 'nitropack'

declare module '@feathersjs/feathers/lib/declarations' {
  interface Application<Services, Settings> {
    _isSetupStarted?: boolean
    nitroApp?: NitroApp
  }
}

declare module 'nitropack' {
  interface NitroRuntimeHooks {
    'feathers:beforeSetup'(feathersApp: Application): Promise<void>
    'feathers:afterSetup'(feathersApp: Application): Promise<void>
  }
}

export async function setup(nitroApp: NitroApp, feathersApp: Application) {
  if (!feathersApp._isSetup && !feathersApp._isSetupStarted) {
    feathersApp._isSetupStarted = true
    feathersApp.nitroApp = nitroApp

    await nitroApp.hooks.callHook('feathers:beforeSetup', feathersApp)

    await feathersApp.setup()

    nitroApp.hooks.hook('close', async () => feathersApp.teardown())

    await nitroApp.hooks.callHook('feathers:afterSetup', feathersApp)
  }
}
