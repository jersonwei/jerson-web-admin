import { DEFAULT_COLOR, MAIN_COLOR } from '@/constant/LoginState'
import variable from '@/style/variable.module.scss'

export default {
  namespaced: true,
  state: () => ({
    mainColor: localStorage.getItem(MAIN_COLOR) || DEFAULT_COLOR,
    variable: variable
  }),
  mutations: {
    setMainColor (state, val) {
      state.mainColor = val
      state.variable.menuBg = val
      localStorage.setItem(MAIN_COLOR, val)
    }
  },
  actions: {},
  getters: {}
}
