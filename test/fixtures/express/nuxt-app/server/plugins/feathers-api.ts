import { createFeathersExpressAdapterNitroPlugin } from '../../../../../../src/runtime/plugins/express'
import { app } from '../../../feathers-api/src/app'

export default createFeathersExpressAdapterNitroPlugin(app)
