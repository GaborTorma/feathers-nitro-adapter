import { createFeathersKoaAdapterNitroPlugin } from '../../../../../../src/runtime/plugins/koa'
import { app } from '../../../feathers-api/src/app'

export default createFeathersKoaAdapterNitroPlugin(app, '/koa')
