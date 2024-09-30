import type { Application } from './declarations'
import { feathers } from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio'
import { Server as Engine } from 'engine.io'

import { channels } from './channels'
import { dummy } from './dummy'
import { services } from './services/index'

export const app: Application = feathers()

export const engine = new Engine()

// Configure services and real-time functionality
app.configure(
  socketio({
    transports: ['websocket'],
  }, (io) => {
    io.bind(engine)
  }),
)
app.configure(channels)

app.configure(services)
app.configure(dummy)
