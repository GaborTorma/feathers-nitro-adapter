// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import type { Application } from '../../declarations'

import { hooks as schemaHooks } from '@feathersjs/schema'

import { getOptions, MessagesService } from './messages.class'
import {
  messagesDataResolver,
  messagesDataValidator,
  messagesExternalResolver,
  messagesPatchResolver,
  messagesPatchValidator,
  messagesQueryResolver,
  messagesQueryValidator,
  messagesResolver,
} from './messages.schema'
import { messagesMethods, messagesPath } from './messages.shared'

export * from './messages.class'
export * from './messages.schema'

// A configure function that registers the service and its hooks via `app.configure`
export function messages(app: Application) {
  // Register our service on the Feathers application
  app.use(messagesPath, new MessagesService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: messagesMethods,
    // You can add additional custom events to be sent to clients here
    events: [],
  })
  // Initialize hooks
  app.service(messagesPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(messagesExternalResolver),
        schemaHooks.resolveResult(messagesResolver),
      ],
    },
    before: {
      all: [
        schemaHooks.validateQuery(messagesQueryValidator),
        schemaHooks.resolveQuery(messagesQueryResolver),
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(messagesDataValidator),
        schemaHooks.resolveData(messagesDataResolver),
      ],
      patch: [
        schemaHooks.validateData(messagesPatchValidator),
        schemaHooks.resolveData(messagesPatchResolver),
      ],
      remove: [],
    },
    after: {
      all: [],
    },
    error: {
      all: [],
    },
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [messagesPath]: MessagesService
  }
}
