// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html

import type { KoaApplication } from './declarations'
import configuration from '@feathersjs/configuration'
import { feathers } from '@feathersjs/feathers'
import { bodyParser, koa as feathersKoa, parseAuthentication, rest, serveStatic } from '@feathersjs/koa'
import socketio from '@feathersjs/socketio'

import { configurationValidator } from './configuration'

/*
import { authentication } from './authentication'
import { channels } from './channels'
import { dummy } from './dummy'
import { logError } from './hooks/log-error'
import { services } from './services/index'
 */

export const app: KoaApplication = feathersKoa(feathers())

// Load app configuration
app.configure(configuration(configurationValidator))

// Set up Koa middleware
app.use(serveStatic(app.get('public')))
// app.use(errorHandler()) // called in plugin ~/src/runtime/handlers/koa.ts
app.use(parseAuthentication())
app.use(bodyParser())

// Configure transports
app.configure(rest())
// Configure services and real-time functionality
app.configure(
  socketio({
    transports: ['websocket'],
    cors: { origin: app.get('origins') },
  }),
)
/* app.configure(authentication)
app.configure(services)
app.configure(channels) */

// Configure a middleware for 404s and the error handler

// Register hooks that run on all service methods
app.hooks({
  around: {
    // all: [logError], // handle errors in plugin ~/src/runtime/handlers/koa.ts
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

// app.configure(dummy)

console.warn('app-koa.ts')
