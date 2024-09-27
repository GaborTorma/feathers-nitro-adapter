/* // uncomment for express version
import { app, engine, express } from 'feathers-api/src/app-express'
import { defineFeathersNitroPlugin } from '../../../../src'

export default defineFeathersNitroPlugin(app, { express })
// */

// uncomment for koa version
import { app, engine, koa } from 'feathers-api/src/app-koa'
import { defineFeathersNitroPlugin } from '../../../../src'

export default defineFeathersNitroPlugin(app, { engine, koa })
// */
