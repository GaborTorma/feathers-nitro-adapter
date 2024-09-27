import type { Application } from './declarations'
import { feathers } from '@feathersjs/feathers'
import { bodyParser, koa as feathersKoa, rest, serveStatic } from '@feathersjs/koa'
import Koa from 'koa'
import { dummy } from './dummy'
import { services } from './services/index'

export const koa = new Koa()

export const app: Application = feathersKoa(feathers(), koa)

app.use(bodyParser())

app.use(serveStatic('./test/fixtures/public'))

app.configure(rest())

app.configure(services)

app.configure(dummy)
