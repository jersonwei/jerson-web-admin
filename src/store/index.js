import { createStore } from 'vuex'
import user from './module/user'
import createPersistedState from 'vuex-persistedstate'
export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    user
  },
  plugins: [createPersistedState()]
})
