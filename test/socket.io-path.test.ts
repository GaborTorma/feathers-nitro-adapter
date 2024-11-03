import type { Socket } from 'socket.io-client'
import type { Message } from './fixtures/socket.io/feathers-api/src/services/messages/messages.schema'
import { fileURLToPath } from 'node:url'
import socketio from '@feathersjs/socketio-client'
import { setup, url } from '@nuxt/test-utils/e2e'
import ioc from 'socket.io-client'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { type ClientApplication, createClient } from './fixtures/socket.io/feathers-api/src/client'

describe('socket.io-path', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/socket.io-path/nuxt-app', import.meta.url)),
  })

  let feathersClient: ClientApplication

  beforeAll(() => {
    const io = ioc(url('/'), {
      path: '/websocket',
      transports: ['websocket'],
    })
    const connection = socketio(io)
    feathersClient = createClient(connection)
  })

  afterAll(async () => {
    await feathersClient.teardown()
  })

  it('get messages with featherClient', async () => {
    const messages = await feathersClient.service('messages').find({ paginate: false })
    expect(messages.length).greaterThan(1)
  })

  it('create message with featherClient', async () => {
    const message = await feathersClient.service('messages').create({ text: 'Hello' })
    const messages = await feathersClient.service('messages').find({
      query: {
        id: message.id,
      },
      paginate: false,
    })
    expect(messages.length).toBe(1)
  })

  it('on message created', async () => {
    const [received, created] = await Promise.all([
      new Promise(resolve => (feathersClient.io as Socket).on('messages created', resolve)),
      feathersClient.service('messages').create({ text: 'Hello' }),
    ])
    expect((received as Message)?.id).toBe(created?.id)
  })
})
