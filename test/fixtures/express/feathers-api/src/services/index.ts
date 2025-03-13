// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations'
import { message } from './messages/messages'

export function services(app: Application) {
  app.configure(message)
  // All services will be registered here
}
