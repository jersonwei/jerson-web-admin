export default {
  namespaced: true,
  state: () => ({
    sideBarOpen: true,
    language: 'zh'
  }),
  mutations: {
    setSiderBarState (state, val) {
      state.sideBarOpen = !state.sideBarOpen
    },
    setLanguage (state, val) {
      state.language = val
    }
  },
  actions: {},
  getters: {}
}
