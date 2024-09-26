import type { Application } from './declarations'
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html
import configuration from '@feathersjs/configuration'
import feathersExpress, { cors, errorHandler, json, notFound, rest, serveStatic, urlencoded } from '@feathersjs/express'
import { feathers } from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio'
import { Server as Engine } from 'engine.io'

import _express from 'express'
import { channels } from './channels'
import { configurationValidator } from './configuration'
import { dummy } from './dummy'
import { logError } from './hooks/log-error'
import { logger } from './logger'
import { mongodb } from './mongodb'
import { services } from './services/index'

export const express = _express()

export const app: Application = feathersExpress(feathers(), express)

export const engine = new Engine()

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
  }, (io) => {
    io.bind(engine)
    io.on('connection', () => console.log('io connection'))
  }),
)
app.configure(mongodb)
app.configure(services)
app.configure(channels)

// Configure a middleware for 404s and the error handler
app.use(notFound())
app.use(errorHandler({ logger }))

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
