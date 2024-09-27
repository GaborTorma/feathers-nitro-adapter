import { defineFeathersNitroPlugin } from '../../../../../../src'
import { app, express } from '../../../feathers-api/src/app'

export default defineFeathersNitroPlugin(app, { express })
