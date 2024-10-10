import { app } from 'feathers-api/src/app-express'
import { createFeathersExpressAdapterNitroPlugin } from '../../../../src'

export default createFeathersExpressAdapterNitroPlugin(app)
