import type { FeathersError } from '@feathersjs/errors'
import type { NextFunction, Request, Response } from 'express'
import { type Application, notFound } from '@feathersjs/express'
import { createError, type H3Error, isError } from 'h3'

export function expressErrorHandler(app: Application) {
  function errorHandler(error: FeathersError | H3Error, req: Request, res: Response, next: NextFunction) {
    const statusCode = (error as H3Error).statusCode || (error as FeathersError).code || 500

    const h3Error = isError(error)
      ? error
      : createError({
        ...error,
        statusCode,
        statusMessage: `[feathers] ${error.message}`,
        stack: error.stack,
      })

    next(h3Error)
  }

  app.use(notFound({ verbose: true }))
  app.use(errorHandler)
}