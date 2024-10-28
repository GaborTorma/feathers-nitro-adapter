import { app } from 'feathers-api/src/app-koa'
import { createFeathersKoaAdapterNitroPlugin } from '../../../../src'

export default createFeathersKoaAdapterNitroPlugin(app)
