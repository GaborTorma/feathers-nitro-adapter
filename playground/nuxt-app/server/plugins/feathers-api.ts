import { app, engine, express } from 'feathers-api/src/app'
import { defineFeathersNitroPlugin } from '../../../../src'

export default defineFeathersNitroPlugin(app, { express, engine })
