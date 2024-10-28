import type { Application as FeathersExpressApplication } from '@feathersjs/express'
import express, { type Application as ExpressApplication } from 'express'
import { fromNodeMiddleware } from 'h3'
import { expressErrorHandler } from '../handlers/express'

export function createExpressRouter(feathersApp: FeathersExpressApplication, path: string = '/feathers') {
  if (feathersApp.nitroApp) {
    feathersApp.configure(expressErrorHandler)

    const api = express()
    api.use(path, feathersApp as any as ExpressApplication)

    const handler = fromNodeMiddleware(api)

    feathersApp.nitroApp?.router.use(path, handler)
    feathersApp.nitroApp?.router.use(`${path}/**`, handler)
  }
}
