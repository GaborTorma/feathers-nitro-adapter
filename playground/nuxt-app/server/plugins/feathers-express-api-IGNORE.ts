import { app, express } from 'feathers-api/src/app-express'
import { createFeathersExpressAdapterNitroPlugin } from '../../../../src/runtime/plugins/express'

export default createFeathersExpressAdapterNitroPlugin(app, express, 'express')