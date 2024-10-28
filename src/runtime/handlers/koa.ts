import type { Application, FeathersKoaContext } from '@feathersjs/koa'
import { FeathersError, NotFound } from '@feathersjs/errors'
import { createError } from 'h3'

export function koaErrorHandler(app: Application) {
  app.on('error', (error: Error) => {
    const code = error instanceof FeathersError ? error.code : 500

    throw createError({
      ...error,
      statusCode: code,
      statusMessage: `[feathers] ${error.message}`,
      stack: error.stack,
      cause: error.cause,
    })
  })

  async function errorHandler(ctx: FeathersKoaContext, next: () => Promise<any>) {
    await next()

    if (ctx.body === undefined)
      throw new NotFound(`Page not found: ${ctx.path}`)
  }

  app.use(errorHandler)
}
