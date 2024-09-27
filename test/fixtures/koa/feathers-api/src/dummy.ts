import type { Application, HookContext, NextFunction } from './declarations'

export function dummy(app: Application) {
  app.hooks({
    setup: [
      async (context: HookContext, next: NextFunction) => {
        console.log('Running dummy setup hook')
        await context.app.service('messages').create([
          { text: 'Hello from the dummy setup hook!' },
          { text: 'Second hello from the dummy setup hook!' },
        ])
        await next()
      },
    ],
  })
}
