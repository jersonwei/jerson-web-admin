export default {
  namespaced: true,
  state: () => ({
    registerPwd: ''
  }),
  mutations: {
    setRegisterPwd (state, val) {
      state.registerPwd = val
    }
  },
  actions: {},
  getters: {}
}
