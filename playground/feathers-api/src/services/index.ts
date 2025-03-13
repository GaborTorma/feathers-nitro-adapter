// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions

import type { Application } from '../declarations'
import { message } from './messages/messages'
import { user } from './users/users'

export function services(app: Application) {
  app.configure(message)
  app.configure(user)
  // All services will be registered here
}
