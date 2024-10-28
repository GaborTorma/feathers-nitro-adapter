import type { Application as FeathersKoaApplication } from '@feathersjs/koa'
import { callNodeListener, eventHandler } from 'h3'
import { koaErrorHandler } from '../handlers/koa'

type KoaHandler = ReturnType<FeathersKoaApplication['callback']>

function koaPrefixRemoverHandler(feathersApp: FeathersKoaApplication, prefix: string): KoaHandler {
  return async (req, res) => {
    req.url = req.url?.replace(new RegExp(`^${prefix}`), '') || '/'
    return feathersApp.callback()(req, res)
  }
}

export function createKoaRouter(feathersApp: FeathersKoaApplication, path: string = '/feathers') {
  if (feathersApp.nitroApp) {
    feathersApp.configure(koaErrorHandler)

    const koaHandler = koaPrefixRemoverHandler(feathersApp, path)

    const handler = eventHandler(async (event) => {
      return callNodeListener(
        koaHandler,
        event.node.req,
        event.node.res,
      )
    })

    feathersApp.nitroApp.router.use(path, handler)
    feathersApp.nitroApp.router.use(`${path}/**`, handler)
  }
}
