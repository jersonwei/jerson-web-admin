export default {
  namespaced: true,
  state: () => ({
    sideBarOpen: true
  }),
  mutations: {
    setSiderBarState (state, val) {
      state.sideBarOpen = !state.sideBarOpen
    }
  },
  actions: {},
  getters: {}
}
