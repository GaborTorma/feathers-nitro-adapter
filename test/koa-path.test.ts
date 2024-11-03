/* eslint-disable ts/no-unsafe-assignment */

import type { MessageData } from './fixtures/koa/feathers-api/src/services/messages/messages.schema'
import { fileURLToPath } from 'node:url'
import { $fetch, setup } from '@nuxt/test-utils/e2e'
import { assert, describe, expect, it } from 'vitest'

describe('koa-path', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/koa-path/nuxt-app', import.meta.url)),
  })

  it('renders the index page', async () => {
    // Get response to a server-rendered page with `$fetch`.
    const html = await $fetch('/')
    expect(html).toContain('index')
  })

  it('renders the static feather-api page', async () => {
    const html = await $fetch('/koa')
    expect(html).toContain('feathers-api')
  })

  it('get messages with $fetch', async () => {
    const messages: Array<MessageData> = await $fetch('/koa/messages')
    expect(messages.length).greaterThan(1)
  })

  it('get 404 message from api', async () => {
    try {
      await $fetch('/koa/no-koa-path')
      assert.fail('Should never catch this')
    }
    catch (error: any) {
      // eslint-disable-next-line ts/no-unsafe-member-access
      expect(error.response.status).toBe(404)
      // eslint-disable-next-line ts/no-unsafe-member-access
      expect(error.response.statusText).toBe('[feathers] Page not found: /no-koa-path')
    }
  })
})
