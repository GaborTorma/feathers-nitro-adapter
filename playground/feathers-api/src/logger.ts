// For more information about this file see https://dove.feathersjs.com/guides/cli/logging.html
import process from 'node:process'
import { createLogger, format, transports } from 'winston'

// Configure the Winston logger. For the complete documentation see https://github.com/winstonjs/winston
export const logger = createLogger({
  // To see more detailed errors, change this to 'debug'
  level: process.env.NODE_ENV === 'test' ? 'none' : 'debug',
  format: format.combine(format.splat(), format.simple()),
  transports: [new transports.Console()],
})
