import i18n from '@/i18n'
import store from '@/store'
import { watch } from 'vue'
export function generateI18nTitle (title) {
  i18n.global.locale.value = store.getters.language
  return i18n.global.t('msg.route.' + title)
}
/**
 *
 * @param  {...any} cbs 所有的回调
 */
export function watchSwitchLang (...cbs) {
  watch(
    () => store.getters.language,
    () => {
      cbs.forEach(cb => cb(store.getters.language))
    }
  )
}
