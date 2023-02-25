import { login } from '@/api/sys'
import { LoginState } from '@/constant/LoginState'
import md5 from 'md5'
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
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  },
  getters: {
    getLoginAccount: state => state.loginAccount
  }
}
