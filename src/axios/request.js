import axios from 'axios'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
  withCredentials: true
})
service.interceptors.request.use(config => {
  config.headers.icode = '46B98050A4A2A49B'
  return config
})

export default service
