// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  ssr: true,
  app: {
    head: {
      link: [
        { rel: "icon", type: "image/x-icon", href: "/vipo-icon.svg" },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/vipo-icon.svg",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/vipo-icon.svg",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/vipo-icon.svg",
        },
      ],
    },
  },
  css: [
    "@/assets/css/base.css",
    "@/assets/css/font.css",
    "@/assets/css/all.css",
  ],
});
