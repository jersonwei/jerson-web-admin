import axios from 'axios'
import { ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
  withCredentials: true
})
service.interceptors.request.use(config => {
  config.headers.icode = '46B98050A4A2A49B'
  return config
})
service.interceptors.response.use(
  response => {
    const { success, message, data } = response.data
    if (success) return data
    ElMessage.error(message)
    return Promise.reject(new Error(message))
  },
  err => {
    return Promise.reject(err)
  }
)

export default service
