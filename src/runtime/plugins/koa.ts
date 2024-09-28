import type { Application as FeathersKoaApplication } from '@feathersjs/koa'
import type { NitroApp, NitroAppPlugin } from 'nitropack'
import { defineNitroPlugin } from 'nitropack/dist/runtime/plugin'
import { setup } from '../setup'

type KoaHandler = ReturnType<FeathersKoaApplication['callback']>

function koaPrefixRemoverHandler(app: FeathersKoaApplication, prefix: string): KoaHandler {
  return async (req, res) => {
    req.url = req.url?.replace(new RegExp(`^${prefix}`), '') || '/'
    return app.callback()(req, res)
  }
}

export function createFeathersKoaAdapterNitroPlugin(feathersApp: FeathersKoaApplication, path: string = '/api'): NitroAppPlugin {
  return defineNitroPlugin((nitroApp: NitroApp) => {
    void setup(nitroApp, feathersApp) // TODO: make async in Nitro v3

    const koaHandler = koaPrefixRemoverHandler(feathersApp, path)

    const handler = eventHandler(async (event) => {
      return callNodeListener(
        koaHandler,
        event.node.req,
        event.node.res,
      )
    })

    nitroApp.router.use(path, handler)
    nitroApp.router.use(`${path}/**`, handler)
  })
}
