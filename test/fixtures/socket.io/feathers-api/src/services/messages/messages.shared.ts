// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Messages, MessagesData, MessagesPatch, MessagesQuery, MessagesService } from './messages.class'

export type { Messages, MessagesData, MessagesPatch, MessagesQuery }

export type MessagesClientService = Pick<MessagesService<Params<MessagesQuery>>, (typeof messagesMethods)[number]>

export const messagesPath = 'messages'

export const messagesMethods: Array<keyof MessagesService> = ['find', 'get', 'create', 'patch', 'remove']

export function messagesClient(client: ClientApplication) {
  const connection = client.get('connection')

  client.use(messagesPath, connection.service(messagesPath), {
    methods: messagesMethods,
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [messagesPath]: MessagesClientService
  }
}
