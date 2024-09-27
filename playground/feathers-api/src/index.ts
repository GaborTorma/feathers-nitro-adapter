import process from 'node:process'
import { app } from './app-express'
import { logger } from './logger'

const port = app.get('port')
const host = app.get('host')

process.on('unhandledRejection', reason => logger.error('Unhandled Rejection %O', reason))

void app.listen(port).then(() => {
  logger.info(`Feathers app listening on http://${host}:${port}`)
})
