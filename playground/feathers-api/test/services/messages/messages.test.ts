// For more information about this file see https://dove.feathersjs.com/guides/cli/service.test.html

import assert from 'node:assert'
import { app } from '../../../src/app-express'

describe('messages service', () => {
  it('registered the service', () => {
    const service = app.service('messages')

    assert.ok(service, 'Registered the service')
  })

  it('finds all messages', async () => {
    const messages = await app.service('messages').find({
      paginate: false,
    })

    assert.ok(Array.isArray(messages))
    assert.ok(messages.length > 1)
  })
})
