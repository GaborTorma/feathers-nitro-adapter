import type { Static } from '@feathersjs/typebox'
import type { HookContext } from '../../declarations'
import type { UsersService } from './users.class'
import { passwordHash } from '@feathersjs/authentication-local'

// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { getValidator, querySyntax, Type } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const usersSchema = Type.Object(
  {
    id: Type.Number(),
    userId: Type.String(),
    password: Type.Optional(Type.String()),
  },
  { $id: 'Users', additionalProperties: false },
)
export type Users = Static<typeof usersSchema>
export const usersValidator = getValidator(usersSchema, dataValidator)
export const usersResolver = resolve<Users, HookContext<UsersService>>({})

export const usersExternalResolver = resolve<Users, HookContext<UsersService>>({
  // The password should never be visible externally
  password: async () => undefined,
})

// Schema for creating new entries
export const usersDataSchema = Type.Pick(usersSchema, ['userId', 'password'], {
  $id: 'UsersData',
})
export type UsersData = Static<typeof usersDataSchema>
export const usersDataValidator = getValidator(usersDataSchema, dataValidator)
export const usersDataResolver = resolve<Users, HookContext<UsersService>>({
  password: passwordHash({ strategy: 'local' }),
})

// Schema for updating existing entries
export const usersPatchSchema = Type.Partial(usersSchema, {
  $id: 'UsersPatch',
})
export type UsersPatch = Static<typeof usersPatchSchema>
export const usersPatchValidator = getValidator(usersPatchSchema, dataValidator)
export const usersPatchResolver = resolve<Users, HookContext<UsersService>>({
  password: passwordHash({ strategy: 'local' }),
})

// Schema for allowed query properties
export const usersQueryProperties = Type.Pick(usersSchema, ['id', 'userId'])
export const usersQuerySchema = Type.Intersect(
  [
    querySyntax(usersQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false }),
  ],
  { additionalProperties: false },
)
export type UsersQuery = Static<typeof usersQuerySchema>
export const usersQueryValidator = getValidator(usersQuerySchema, queryValidator)
export const usersQueryResolver = resolve<UsersQuery, HookContext<UsersService>>({
  // If there is a user (e.g. with authentication), they are only allowed to see their own data
  id: async (value, user, context) => {
    if (context.params.users) {
      return context.params.users.id
    }
    return value
  },
})
