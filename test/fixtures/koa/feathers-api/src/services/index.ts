import { messages } from './messages/messages'
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations'

export const services = function (app: Application) {
  app.configure(messages)
  // All services will be registered here
}
