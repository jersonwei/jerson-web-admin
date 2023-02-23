import { LoginState } from '@/constant/LoginState'

export default {
  namespaced: true,
  state: () => ({
    currentState: LoginState.LOGIN
  }),
  mutations: {
    setCurrentState (state, val) {
      state.currentState = val
    }
  },
  actions: {}
}
