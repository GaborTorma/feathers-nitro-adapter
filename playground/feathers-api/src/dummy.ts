import type { Application, HookContext, NextFunction } from './declarations'

export function dummy(app: Application) {
  app.hooks({
    setup: [
      async (context: HookContext, next: NextFunction) => {
        console.log('Running dummy setup hook')
        const messages = await context.app.service('messages').create([
          { text: 'Hello from the dummy setup hook!' },
          { text: 'Second hello from the dummy setup hook!' },
        ])
        console.log(messages.length, 'dummy messages created')
        const users = await context.app.service('users').create([
          { userId: 'test' },
          { userId: 'admin' },
        ])
        console.log(users.length, 'dummy users created')
        await next()
      },
    ],
  })
}
