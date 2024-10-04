import type { Application as FeathersKoaApplication } from '@feathersjs/koa'
import type { NitroApp, NitroAppPlugin } from 'nitropack'
import { callNodeListener, eventHandler } from 'h3'
import { defineNitroPlugin } from 'nitropack/dist/runtime/plugin'
import { setup } from '../setup'

type KoaHandler = ReturnType<FeathersKoaApplication['callback']>

function koaPrefixRemoverHandler(feathersApp: FeathersKoaApplication, prefix: string): KoaHandler {
  return async (req, res) => {
    req.url = req.url?.replace(new RegExp(`^${prefix}`), '') || '/'
    return feathersApp.callback()(req, res)
  }
}

export function createKoaRouter(feathersApp: FeathersKoaApplication, path: string = '/api') {
  if (feathersApp.nitroApp) {
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

export function createFeathersKoaAdapterNitroPlugin(feathersApp: FeathersKoaApplication, path?: string): NitroAppPlugin {
  return defineNitroPlugin((nitroApp: NitroApp) => {
    nitroApp.hooks.hook('feathers:afterSetup', async () => {
      createKoaRouter(feathersApp, path)
    })

    void setup(nitroApp, feathersApp) // TODO: make async in Nitro v3
  })
}
