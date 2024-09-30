// For more information about this file see https://dove.feathersjs.com/guides/cli/client.test.html

import type { User, UserData } from '../src/client'
import assert from 'node:assert'
import rest from '@feathersjs/rest-client'
import axios from 'axios'
import { app } from '../src/app-koa'
import { createClient } from '../src/client'

const port = app.get('port')
const appUrl = `http://${app.get('host')}:${port}`

describe('application client tests', () => {
  const client = createClient(rest(appUrl).axios(axios))

  before(async () => {
    await app.listen(port)
  })

  after(async () => {
    await app.teardown()
  })

  it('initialized the client', () => {
    assert.ok(client)
  })

  it('creates and authenticates a user with userId and password', async () => {
    const userData: UserData = {
      userId: 'client',
      password: 'supersecret',
    }

    await client.service('users').create(userData)

    const { user, accessToken } = await client.authenticate({
      strategy: 'local',
      ...userData,
    })

    assert.ok(accessToken, 'Created access token for user')
    assert.ok(user, 'Includes user in authentication data')
    assert.strictEqual((user as User).password, undefined, 'Password is hidden to clients')

    await client.logout()

    // Remove the test user on the server
    await app.service('users').remove((user as User).id)
  })
})
