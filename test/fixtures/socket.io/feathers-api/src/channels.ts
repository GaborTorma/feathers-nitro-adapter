// For more information about this file see https://dove.feathersjs.com/guides/cli/channels.html
import type { RealTimeConnection } from '@feathersjs/feathers'
import type { Application, HookContext } from './declarations'
import '@feathersjs/transport-commons'

export function channels(app: Application) {
  app.on('connection', (connection: RealTimeConnection) => {
    // On a new real-time connection, add it to the anonymous channel
    app.channel('anonymous').join(connection)
  })

  app.publish((data: any, context: HookContext) => {
    // Here you can add event publishers to channels set up in `channels.js`
    // To publish only for a specific event use `app.publish(eventname, () => {})`

    // e.g. to publish all service events to all authenticated users use
    return app.channel('anonymous')
  })
}
