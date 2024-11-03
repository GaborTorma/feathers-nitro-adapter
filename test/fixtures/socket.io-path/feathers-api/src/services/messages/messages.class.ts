// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#custom-services

import type { Params } from '@feathersjs/feathers'
import type { MemoryServiceOptions } from '@feathersjs/memory'
import type { Application } from '../../declarations'
import type { Message, MessageData, MessagePatch, MessageQuery } from './messages.schema'
import { MemoryService } from '@feathersjs/memory'

export type { Message, MessageData, MessagePatch, MessageQuery }

export interface MessageParams extends Params<MessageQuery> {}

export class MessageService<ServiceParams extends Params = MessageParams> extends MemoryService<
  Message,
  MessageData
> {}

export function getOptions(app: Application): MemoryServiceOptions<Message> {
  return {
    multi: true,
  }
}
