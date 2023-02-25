import { LoginState } from '@/constant/LoginState'

export default {
  namespaced: true,
  state: () => ({
    currentState: LoginState.LOGIN,
    loginAccount: 'jersonwang'
  }),
  mutations: {
    setCurrentState (state, val) {
      state.currentState = val
    },
    setLoginAccount (state, val) {
      state.loginAccount = val
    }
  },
  actions: {},
  getters: {
    getLoginAccount: state => state.loginAccount
  }
}
