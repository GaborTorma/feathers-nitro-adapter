import { defineReleaseItConfig } from '@gabortorma/mwm'
import { name } from './package.json'

export default defineReleaseItConfig('nitro-plugin', name.split('/').pop())
