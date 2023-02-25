import { createStore } from 'vuex'
import user from './module/user'
import createPersistedState from 'vuex-persistedstate'
import register from './module/register'
export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    register
  },
  plugins: [createPersistedState()]
})
