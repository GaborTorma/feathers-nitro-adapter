// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',

  modules: [
    '@nuxt/eslint',
    '@pinia/nuxt',
    'nuxt-feathers-pinia',
  ],

  ssr: false,

  nitro: {
    experimental: {
      websocket: true,
    },
  },

  eslint: {
    checker: true,
    config: {
      standalone: false,
    },
  },

  typescript: {
    tsConfig: {
      exclude: ['../../feathers-api'],
    },
  },

  devtools: { enabled: true },
})
