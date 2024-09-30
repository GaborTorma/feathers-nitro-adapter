import type { AuthenticationClientOptions } from '@feathersjs/authentication-client'
import type { Application, TransportConnection } from '@feathersjs/feathers'
// For more information about this file see https://dove.feathersjs.com/guides/cli/client.html
import authenticationClient from '@feathersjs/authentication-client'

import { feathers } from '@feathersjs/feathers'

import { messageClient } from './services/messages/messages.shared'

export type { Message, MessageData, MessagePatch, MessageQuery } from './services/messages/messages.shared'

export interface Configuration {
  connection: TransportConnection<ServiceTypes>
}

export interface ServiceTypes {}

export type ClientApplication = Application<ServiceTypes, Configuration>

/**
 * Returns a typed client for the feathers-api app.
 *
 * @param connection The REST or Socket.io Feathers client connection
 * @param authenticationOptions Additional settings for the authentication client
 * @see https://dove.feathersjs.com/api/client.html
 * @returns The Feathers client application
 */
export function createClient<Configuration = any>(
  connection: TransportConnection<ServiceTypes>,
  authenticationOptions: Partial<AuthenticationClientOptions> = {},
) {
  const client: ClientApplication = feathers()

  client.configure(connection)
  client.configure(authenticationClient(authenticationOptions))
  client.set('connection', connection)

  client.configure(messageClient)
  return client
}
