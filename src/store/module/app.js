import { LANG } from '@/constant/LoginState'

export default {
  namespaced: true,
  state: () => ({
    sideBarOpen: true,
    language: localStorage.getItem(LANG) || 'zh'
  }),
  mutations: {
    setSiderBarState (state, val) {
      state.sideBarOpen = !state.sideBarOpen
    },
    setLanguage (state, val) {
      localStorage.setItem(LANG, val)
      state.language = val
    }
  },
  actions: {},
  getters: {}
}
