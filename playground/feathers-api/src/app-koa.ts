import type { KoaApplication } from './declarations'
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html
import configuration from '@feathersjs/configuration'
import { feathers } from '@feathersjs/feathers'
import { bodyParser, errorHandler, koa as feathersKoa, rest, serveStatic } from '@feathersjs/koa'
import socketio from '@feathersjs/socketio'

import { Server as Engine } from 'engine.io'
import Koa from 'koa'
import { channels } from './channels'
import { configurationValidator } from './configuration'
import { dummy } from './dummy'
import { logError } from './hooks/log-error'

import { services } from './services/index'

export const koa = new Koa()

export const app: KoaApplication = feathersKoa(feathers(), koa)

export const engine = new Engine()

// Load app configuration
app.configure(configuration(configurationValidator))

// Set up Koa middleware
app.use(serveStatic(app.get('public')))
app.use(errorHandler())
app.use(bodyParser())

// Configure transports
app.configure(rest())
// Configure services and real-time functionality
app.configure(
  socketio({
    transports: ['websocket'],
    cors: { origin: app.get('origins') },
  }, (io) => {
    io.bind(engine)
    io.on('connection', () => console.log('io connection'))
  }),
)
app.configure(services)
app.configure(channels)

// Configure a middleware for 404s and the error handler

// Register hooks that run on all service methods
app.hooks({
  around: {
    all: [logError],
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

app.configure(dummy)

console.warn('app-koa.ts')
