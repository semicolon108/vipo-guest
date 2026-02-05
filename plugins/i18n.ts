import { createI18n } from 'vue-i18n'
import { language } from '../locales/language'

// import en from '../locales/en.json'

// set api call
const getKeyFunc = (lang: string) => {
  let object = {}
  for (let i = 0; i < language.length; i++) {
    const obj: any = language[i]
    object = {
      ...object,
      [obj.key]: obj[lang]
    }
  }

  // console.log(object);

  return object
}
const laKey = getKeyFunc('la')
const enKey = getKeyFunc('en')
export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: 'la',
    messages: {
      en: enKey,
      la: laKey
    }
  })

  vueApp.use(i18n)
})
