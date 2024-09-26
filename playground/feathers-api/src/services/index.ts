import { messages } from './messages/messages'
import { users } from './users/users'
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations'

export const services = function (app: Application) {
  app.configure(messages)
  app.configure(users)
  // All services will be registered here
}
