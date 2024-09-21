export default defineNuxtConfig({
  nitro: {
    plugins: [
      '../../src/index.ts',
    ],
    // https://nitro.unjs.io/guide/websocket#usage
    experimental: {
      websocket: true,
    },
  },

  compatibilityDate: '2024-09-12',

  extends: [
    '@gabortorma/nuxt-eslint-layer',
  ],

  devtools: {
    enabled: false,
  },
})
