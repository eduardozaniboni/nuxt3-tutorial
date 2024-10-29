// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    ['@nuxtjs/i18n', { vueI18n: './i18n' }],
    '@nuxt/ui',
    'nuxt-auth-utils',
  ],
  runtimeConfig: {
    oauth: {
      google: {
        clientId: process.env.NUXT_OAUTH_GOOGLE_CLIENT_ID,
        clientSecret: process.env.NUXT_OAUTH_GOOGLE_CLIENT_SECRET,
      },
      github: {
        clientId: process.env.NUXT_OAUTH_GITHUB_CLIENT_ID,
        clientSecret: process.env.NUXT_OAUTH_GITHUB_CLIENT_SECRET,
      },
      OAUTH: {
        clientId: process.env.NUXT_OAUTH_AUTH0_CLIENT_ID,
        clientSecret: process.env.NUXT_OAUTH_AUTH0_CLIENT_SECRET,
        domain: process.env.NUXT_OAUTH_AUTH0_DOMAIN,
      },
    },
  },
  alias: {
    css: '/<rootDir>/assets/css',
  },
  css: ['@/assets/css/main.css'],
  pinia: {
    storesDirs: ['~/store/**'],
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      // title: 'Meu Site de Vídeos',
    },
    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },
    layoutTransition: {
      name: 'layout',
      mode: 'out-in',
    },
  },
});

