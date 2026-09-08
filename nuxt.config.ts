// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['nuxt-schema-org'],

  // Absolute URLs for canonical tags and the schema.org @id graph. Override per
  // environment with NUXT_PUBLIC_SITE_URL (preview deploys, staging).
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://marcuswiseman.com',
    name: 'Marcus Wiseman',
  },

  // The page is static content, so serve it as flat HTML — AI crawlers largely
  // do not execute JS, and a prerendered document needs no hydration to be
  // read. This is NOT `nuxt generate`: the Nitro server stays, because
  // /api/contact has to keep running.
  routeRules: {
    '/': { prerender: true },
    '/llms.txt': { prerender: true },
  },

  // Nocturne is the design system (tokens + components), synced verbatim from
  // the Claude Design project; base.scss is this site's global scaffolding on
  // top of it. Order matters — base.scss reads Nocturne's tokens.
  css: ['~/assets/css/nocturne.css', '~/assets/css/base.scss'],

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        // the ground is dark; tell the UA so form controls and scrollbars follow
        { name: 'color-scheme', content: 'dark' },
        { name: 'theme-color', content: '#161826' },
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
      ],
    },
  },
})
