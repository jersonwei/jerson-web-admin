import { LANG } from '@/constant/LoginState'
import { createI18n } from 'vue-i18n'
import zhLocale from './lang/zh'
import enLocale from './lang/en'
const messages = {
  en: {
    msg: {
      ...enLocale
    }
  },
  zh: {
    msg: {
      ...zhLocale
    }
  }
}

const locale = localStorage.getItem(LANG) || 'zh'
const i18n = createI18n({
  // compositionAPI
  legacy: false,
  globalInjection: true,
  locale,
  messages
})
export default i18n
