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

export * from './runtime/plugins'
export * from './runtime/setup'
