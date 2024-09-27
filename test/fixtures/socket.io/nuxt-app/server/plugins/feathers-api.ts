import { defineFeathersNitroPlugin } from '../../../../../../src'
import { app, engine } from '../../../feathers-api/src/app'

export default defineFeathersNitroPlugin(app, { engine })
