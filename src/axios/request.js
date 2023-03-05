import store from '@/store'
import { isTokenTimeOut } from '@/utils/auth'
import axios from 'axios'
import { ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
  withCredentials: true
})
service.interceptors.request.use(
  config => {
    config.headers.icode = '46B98050A4A2A49B'
    if (store.getters.token) {
      if (isTokenTimeOut()) {
        // token超时
        store.dispatch('user/logout')
        return Promise.reject(new Error('token超时'))
      }
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    // 配置接口国际化
    config.headers['Accept-Language'] = store.getters.language
    return config
  },
  err => {
    return Promise.reject(err)
  }
)
service.interceptors.response.use(
  response => {
    const { success, message, data } = response.data
    if (success) return data
    ElMessage.error(message)
    return Promise.reject(new Error(message))
  },
  err => {
    if (err.response && err.response.data && err.response.data.code === 401) {
      store.dispatch('user/logout')
    }
    return Promise.reject(err)
  }
)

export default service
