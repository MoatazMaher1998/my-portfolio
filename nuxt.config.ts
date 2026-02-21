import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  // Static site generation for GitHub Pages
  ssr: false,

  css: [
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css',
    '~/assets/styles/main.scss'
  ],

  build: {
    transpile: ['vuetify'],
  },

  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],

  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },

  app: {
    // Base URL: override via NUXT_APP_BASE_URL env var on GitHub Pages
    // e.g. set NUXT_APP_BASE_URL=/moataz-maher-portfolio/ if no custom domain
    baseURL: process.env.NUXT_APP_BASE_URL ?? '/',
    head: {
      title: 'Moataz Maher | Full Stack Engineer',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Full Stack Engineer with 3+ years of experience building scalable systems. Expert in Java Spring Boot, Angular, Nuxt.js, and cloud deployment.' },
        { name: 'keywords', content: 'Full Stack Developer, Java, Spring Boot, Angular, Nuxt.js, Vue.js, AWS, Docker' },
        { property: 'og:title', content: 'Moataz Maher | Full Stack Engineer' },
        { property: 'og:description', content: 'Full Stack Engineer with 3+ years of experience building scalable systems.' },
        { property: 'og:type', content: 'website' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  }
})
