import type { Params } from '@feathersjs/feathers'
import type { MemoryServiceOptions } from '@feathersjs/memory'

import type { Application } from '../../declarations'
import type { Messages, MessagesData, MessagesPatch, MessagesQuery } from './messages.schema'
// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#custom-services
import { MemoryService } from '@feathersjs/memory'

export type { Messages, MessagesData, MessagesPatch, MessagesQuery }

export interface MessagesParams extends Params<MessagesQuery> {}

export class MessagesService<ServiceParams extends Params = MessagesParams> extends MemoryService<
  Messages,
  MessagesData
> {}

export function getOptions(app: Application): MemoryServiceOptions<Messages> {
  return {
    multi: true,
  }
}
