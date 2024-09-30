import type { Application, HookContext, NextFunction } from './declarations'
import { logger } from './logger'

export function dummy(app: Application) {
  app.hooks({
    setup: [
      async (context: HookContext, next: NextFunction) => {
        logger.debug('Running dummy setup hook')
        const messages = await context.app.service('messages').create([
          { text: 'Hello from the dummy setup hook!' },
          { text: 'Second hello from the dummy setup hook!' },
        ])
        logger.debug(`${messages.length} dummy messages created`)
        const users = await context.app.service('users').create([
          { userId: 'dummy', password: 'dummy' }, // workaround for this issue: https://github.com/marshallswain/feathers-pinia/pull/176
          { userId: 'test', password: '12345' },
        ])
        logger.debug(`1 dummy and 1 test users created`)
        await next()
      },
    ],
  })
}
