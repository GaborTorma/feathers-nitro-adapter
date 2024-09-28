import { createFeathersSocketIoAdapterNitroPlugin } from '../../../../../../src/runtime/plugins/socket.io'
import { app, engine } from '../../../feathers-api/src/app'

export default createFeathersSocketIoAdapterNitroPlugin(app, engine)
