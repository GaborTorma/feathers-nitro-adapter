import type { Application } from './declarations'
import feathersExpress, { json, rest, serveStatic, urlencoded } from '@feathersjs/express'
import { feathers } from '@feathersjs/feathers'
import _express from 'express'
import { dummy } from './dummy'
import { services } from './services/index'

export const express = _express()

export const app: Application = feathersExpress(feathers(), express)

app.use(json())
app.use(urlencoded({ extended: true }))
app.use('/', serveStatic('./test/fixtures/public'))

app.configure(rest())

app.configure(services)

app.configure(dummy)