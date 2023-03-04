import i18n from '@/i18n'
export function generateI18nTitle (title) {
  return i18n.global.t('msg.route.' + title)
}
