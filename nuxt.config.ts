// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  ssr: true,
  css: [
    "@/assets/css/base.css",
    "@/assets/css/font.css",
    "@/assets/css/all.css",
  ],
});
