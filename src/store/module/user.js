import { getUserInfo, login } from '@/api/sys'
import { LoginState } from '@/constant/LoginState'
import router from '@/router'
import md5 from 'md5'
export default {
  namespaced: true,
  state: () => ({
    currentState: LoginState.LOGIN,
    loginAccount: 'super-admin',
    token: '',
    userInfo: {}
  }),
  mutations: {
    setCurrentState (state, val) {
      state.currentState = val
    },
    setLoginAccount (state, val) {
      state.loginAccount = val
    },
    setToken (state, val) {
      state.token = val
    },
    setUserInfo (state, val) {
      state.userInfo = val
    }
  },
  actions: {
    login (context, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login({
          username,
          password: md5(password)
        })
          .then(data => {
            resolve(data)
            router.push('/')
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    async getUserInfo (context) {
      const res = await getUserInfo()
      this.commit('user/setUserInfo', res)
      return res
    }
  },
  getters: {
    getLoginAccount: state => state.loginAccount
  }
}
