import type { Params } from '@feathersjs/feathers'
import type { MemoryServiceOptions } from '@feathersjs/memory'

import type { Application } from '../../declarations'
import type { Users, UsersData, UsersPatch, UsersQuery } from './users.schema'
// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import { MemoryService } from '@feathersjs/memory'

export type { Users, UsersData, UsersPatch, UsersQuery }

export interface UsersParams extends Params<UsersQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class UsersService<ServiceParams extends Params = UsersParams> extends MemoryService<
  Users,
  UsersData
> {}

export function getOptions(app: Application): MemoryServiceOptions<Users> {
  return {
    multi: true,
  }
}
