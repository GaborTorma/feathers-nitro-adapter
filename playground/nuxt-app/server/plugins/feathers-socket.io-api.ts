import { app } from 'feathers-api/src/app-koa'
import { createFeathersSocketIoAdapterNitroPlugin } from '../../../../src'

export default createFeathersSocketIoAdapterNitroPlugin(app)
