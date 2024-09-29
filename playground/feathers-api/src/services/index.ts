// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions

import type { Application } from '../declarations'
import { messages } from './messages/messages'
import { user } from './users/users'

export const services = function (app: Application) {
  app.configure(messages)
  app.configure(user)
  // All services will be registered here
}
