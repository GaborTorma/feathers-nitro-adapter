// For more information about this file see https://dove.feathersjs.com/guides/cli/authentication.html

import type { Application } from './declarations'
import { AuthenticationService, JWTStrategy } from '@feathersjs/authentication'

import { LocalStrategy } from '@feathersjs/authentication-local'

declare module './declarations' {
  interface ServiceTypes {
    authentication: AuthenticationService
  }
}

export function authentication(app: Application) {
  const authentication = new AuthenticationService(app)

  authentication.register('jwt', new JWTStrategy())
  authentication.register('local', new LocalStrategy())

  app.use('authentication', authentication)
}
