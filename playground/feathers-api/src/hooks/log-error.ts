import type { HookContext, NextFunction } from '../declarations'
/* eslint-disable ts/no-unsafe-member-access */
// For more information about this file see https://dove.feathersjs.com/guides/cli/log-error.html
import { logger } from '../logger'

export async function logError(context: HookContext, next: NextFunction) {
  try {
    await next()
  }
  catch (error: any) {
    logger.error(error.stack)

    // Log validation errors
    if (error.data) {
      logger.error('Data: %O', error.data)
    }

    throw error
  }
}
