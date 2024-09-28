import { app } from 'feathers-api/src/app-koa'
import { createFeathersKoaAdapterNitroPlugin } from '../../../../src/runtime/plugins/koa'

export default createFeathersKoaAdapterNitroPlugin(app)
