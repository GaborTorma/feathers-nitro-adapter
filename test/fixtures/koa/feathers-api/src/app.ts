import type { Application } from './declarations'
import { feathers } from '@feathersjs/feathers'
import { bodyParser, koa as feathersKoa, rest, serveStatic } from '@feathersjs/koa'
import { dummy } from './dummy'
import { services } from './services/index'

export const app: Application = feathersKoa(feathers())

app.use(bodyParser())

app.use(serveStatic('./test/fixtures/public'))

app.configure(rest())

app.configure(services)

app.configure(dummy)
