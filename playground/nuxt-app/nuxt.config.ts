// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',

  extends: [
    '@gabortorma/nuxt-eslint-layer',
  ],

  imports: {
    autoImport: true,
  },

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

  vite: {
    optimizeDeps: {
      include: [
        'feathers-pinia',
      ],
    },
  },

  devtools: { enabled: true },
})
