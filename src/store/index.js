import { createStore } from 'vuex'
import user from './module/user'
import createPersistedState from 'vuex-persistedstate'
import register from './module/register'
import getters from './getter'
import time from './module/time'
import app from './module/app'
export default createStore({
  getters,
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    register,
    time,
    app
  },
  plugins: [createPersistedState()]
})
