import { DEFAULT_COLOR, MAIN_COLOR } from '@/constant/LoginState'

export default {
  namespaced: true,
  state: () => ({
    mainColor: localStorage.getItem(MAIN_COLOR) || DEFAULT_COLOR
  }),
  mutations: {
    setMainColor (state, val) {
      state.mainColor = val
      localStorage.setItem(MAIN_COLOR, val)
    }
  },
  actions: {},
  getters: {}
}
