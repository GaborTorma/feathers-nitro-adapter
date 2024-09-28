import { app, engine } from 'feathers-api/src/app-koa'
import { createFeathersSocketIoAdapterNitroPlugin } from '../../../../src/runtime/plugins/socket.io'

export default createFeathersSocketIoAdapterNitroPlugin(app, engine)
