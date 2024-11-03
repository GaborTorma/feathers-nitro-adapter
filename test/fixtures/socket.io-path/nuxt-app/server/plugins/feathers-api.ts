import { createFeathersSocketIoAdapterNitroPlugin } from '../../../../../../src/runtime/plugins/socket.io'
import { app } from '../../../feathers-api/src/app'

export default createFeathersSocketIoAdapterNitroPlugin(app)
