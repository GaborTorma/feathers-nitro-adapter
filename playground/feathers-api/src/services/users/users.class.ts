// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services

import type { Params } from '@feathersjs/feathers'
import type { MemoryServiceOptions } from '@feathersjs/memory'
import type { Application } from '../../declarations'
import type { User, UserData, UserPatch, UserQuery } from './users.schema'
import { MemoryService } from '@feathersjs/memory'

export type { User, UserData, UserPatch, UserQuery }

export interface UserParams extends Params<UserQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class UserService<ServiceParams extends Params = UserParams> extends MemoryService<
  User,
  UserData
> {}

export function getOptions(app: Application): MemoryServiceOptions<User> {
  return {
    multi: true,
  }
}
