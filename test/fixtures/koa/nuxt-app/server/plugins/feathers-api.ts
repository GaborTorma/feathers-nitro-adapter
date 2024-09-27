import { defineFeathersNitroPlugin } from '../../../../../../src'
import { app, koa } from '../../../feathers-api/src/app'

export default defineFeathersNitroPlugin(app, { koa })
