// For more information about this file see https://dove.feathersjs.com/guides/cli/app.test.html

import type { AxiosError } from 'axios'
import type { HttpError } from 'http-errors'
import type { Server } from 'node:http'
import assert from 'node:assert'
import axios from 'axios'
import { app } from '../src/app-koa'

const port = app.get('port')
const appUrl = `http://${app.get('host')}:${port}`

describe('feathers application tests', () => {
  let server: Server

  before(async () => {
    server = await app.listen(port)
  })

  after(async () => {
    await app.teardown()
  })

  it('starts and shows the index page', async () => {
    const { data } = await axios.get<string>(appUrl)

    assert.ok(data.includes('<html lang="en">'))
  })

  it('shows a 404 JSON error', async () => {
    try {
      await axios.get(`${appUrl}/path/to/nowhere`, {
        responseType: 'json',
      })
      assert.fail('should never get here')
    }
    catch (error) {
      const { response } = error as AxiosError<HttpError>
      assert.strictEqual(response?.status, 404)
      assert.strictEqual(response?.data?.code, 404)
      assert.strictEqual(response?.data?.name, 'NotFound')
    }
  })
})
