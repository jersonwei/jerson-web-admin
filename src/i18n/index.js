import { createI18n } from 'vue-i18n'
const messages = {
  en: {
    msg: {
      test: 'hello'
    }
  },
  zh: {
    msg: {
      test: '你好'
    }
  }
}

const locale = 'en'
const i18n = createI18n({
  // compositionAPI
  legacy: false,
  globalInjection: true,
  locale,
  messages
})
export default i18n
