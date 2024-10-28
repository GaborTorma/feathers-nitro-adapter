import type { ExpressApplication } from './declarations'
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html
import configuration from '@feathersjs/configuration'
import feathersExpress, { cors, json, parseAuthentication, rest, serveStatic, urlencoded } from '@feathersjs/express'
import { feathers } from '@feathersjs/feathers'

import socketio from '@feathersjs/socketio'
import { authentication } from './authentication'
import { channels } from './channels'
import { configurationValidator } from './configuration'
import { dummy } from './dummy'
// import { logError } from './hooks/log-error'
import { services } from './services/index'

export const app: ExpressApplication = feathersExpress(feathers())

// Load app configuration
app.configure(configuration(configurationValidator))
app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
// Host the public folder
app.use('/', serveStatic(app.get('public')))

// Configure services and real-time functionality
app.configure(rest())
app.configure(
  socketio({
    transports: ['websocket'],
    cors: { origin: app.get('origins') },
  }),
)

// Configure a middleware for 404s and the error handler
// app.use(notFound({ verbose: true })) // called in plugin ~/src/runtime/handlers/express.ts
app.use(parseAuthentication())
// app.use(errorHandler({ logger })) // called in plugin ~/src/runtime/handlers/express.ts

// Register hooks that run on all service methods
app.hooks({
  around: {
    // all: [logError], // handle errors in plugin ~/src/runtime/handlers/express.ts
  },
  before: {},
  after: {},
  error: {},
})
// Register application setup and teardown hooks here
app.hooks({
  setup: [],
  teardown: [],
})

// uncomment to use express adapter
app.configure(authentication)
app.configure(services)
app.configure(channels)
app.configure(dummy)

console.warn('app-express.ts')
