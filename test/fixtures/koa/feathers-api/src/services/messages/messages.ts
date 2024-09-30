// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import type { Application } from '../../declarations'
import { hooks as schemaHooks } from '@feathersjs/schema'
import { getOptions, MessageService } from './messages.class'
import {
  messageDataResolver,
  messageDataValidator,
  messageExternalResolver,
  messagePatchResolver,
  messagePatchValidator,
  messageQueryResolver,
  messageQueryValidator,
  messageResolver,
} from './messages.schema'
import { messageMethods, messagePath } from './messages.shared'

export * from './messages.class'
export * from './messages.schema'

// A configure function that registers the service and its hooks via `app.configure`
export function message(app: Application) {
  // Register our service on the Feathers application
  app.use(messagePath, new MessageService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: messageMethods,
    // You can add additional custom events to be sent to clients here
    events: [],
  })
  // Initialize hooks
  app.service(messagePath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(messageExternalResolver),
        schemaHooks.resolveResult(messageResolver),
      ],
    },
    before: {
      all: [
        schemaHooks.validateQuery(messageQueryValidator),
        schemaHooks.resolveQuery(messageQueryResolver),
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(messageDataValidator),
        schemaHooks.resolveData(messageDataResolver),
      ],
      patch: [
        schemaHooks.validateData(messagePatchValidator),
        schemaHooks.resolveData(messagePatchResolver),
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
    [messagePath]: MessageService
  }
}
