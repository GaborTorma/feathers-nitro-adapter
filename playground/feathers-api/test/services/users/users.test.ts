// For more information about this file see https://dove.feathersjs.com/guides/cli/service.test.html

import assert from 'node:assert'
import { app } from '../../../src/app-express'

describe('users service', () => {
  it('registered the service', () => {
    const service = app.service('users')

    assert.ok(service, 'Registered the service')
  })

  it('finds all users', async () => {
    const users = await app.service('users').find({
      paginate: false,
    })

    assert.ok(Array.isArray(users))
    assert.ok(users.length > 1)
  })
})
