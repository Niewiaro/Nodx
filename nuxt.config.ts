// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  runtimeConfig: {
    mongodbUri: "",
    sessionSecret: "",
    csrfSecret: "",
    public: {    }
  },
  devtools: { enabled: true },
  nitro: {
    experimental: {
      openAPI: true
    }
  },
  modules: ['@pinia/nuxt'],
})
