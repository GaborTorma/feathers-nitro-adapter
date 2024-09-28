import { createFeathersExpressAdapterNitroPlugin } from '../../../../../../src/runtime/plugins/express'
import { app, express } from '../../../feathers-api/src/app'

export default createFeathersExpressAdapterNitroPlugin(app, express)
