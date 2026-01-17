// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  runtimeConfig: {
    mongodbUri: "mongodb://127.0.0.1:27017/g_back_05",
    sessionSecret: "our-very-important-session-secret-of-backend-programming",
    csrfSecret: "1234567ThisIsSecret9876543210PAI",
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
