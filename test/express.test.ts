/* eslint-disable ts/no-unsafe-assignment */
import { fileURLToPath } from 'node:url'
import { $fetch, setup } from '@nuxt/test-utils/e2e'
import { describe, expect, it } from 'vitest'
/* import { createClient, type ClientApplication } from './fixtures/express/feathers-api/src/client'
import rest from '@feathersjs/rest-client' */

describe('express', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/express/nuxt-app', import.meta.url)),
  })

  it('renders the index page', async () => {
    // Get response to a server-rendered page with `$fetch`.
    const html = await $fetch('/')
    expect(html).toContain('index')
  })

  it('renders the static feather-api page', async () => {
    const html = await $fetch('/api')
    expect(html).toContain('feathers-api')
  })

  it('get messages with $fetch', async () => {
    const messages: Array<any> = await $fetch('/api/messages')
    expect(messages.length).greaterThan(1)
  })

  /* it('get messages with featherClient', async () => {
    const connection = rest('/api').fetch($fetch)
    const feathersClient = createClient(connection)
    const messages = await feathersClient.service('messages').find({query: {}})
    expect(messages.length).toBe(2)
    feathersClient.teardown()
  }) */
})
