export default {
  namespaced: true,
  state: () => ({
    logTimeStamp: ''
  }),
  mutations: {
    setLogTimeStamp (state, val) {
      state.logTimeStamp = val
    }
  },
  actions: {},
  getters: {}
}
