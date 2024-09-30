import { message } from './messages/messages'
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations'

export const services = function (app: Application) {
  app.configure(message)
  // All services will be registered here
}
