// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',

  extends: [
    '@gabortorma/nuxt-eslint-layer',
  ],

  modules: [
    '@pinia/nuxt',
    'nuxt-feathers-pinia',
  ],

  ssr: true,

  nitro: {
    experimental: {
      websocket: true,
    },
  },

  devtools: { enabled: true },
})
