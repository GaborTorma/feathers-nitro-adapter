import type { Application } from './declarations'
import { feathers } from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio'

import { channels } from './channels'
import { dummy } from './dummy'
import { services } from './services/index'

export const app: Application = feathers()

// Configure services and real-time functionality
app.configure(
  socketio({
    transports: ['websocket'],
  }),
)
app.configure(channels)

app.configure(services)
app.configure(dummy)
