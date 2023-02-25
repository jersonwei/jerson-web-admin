import { TOKEN_TIMEOUT_VALUE } from '@/constant/LoginState'
import store from '@/store'

/**
 * 获取时间戳
 */
export function getLogTImeStamp () {
  return store.state.time.logTimeStamp
}
/**
 * 设置时间戳
 */
export function setLogTimeStamp () {
  store.commit('time/setLogTimeStamp', Date.now())
}
/**
 * 是否超时
 */
export function isTokenTimeOut () {
  const currentTime = Date.now()
  return currentTime - getLogTImeStamp() > TOKEN_TIMEOUT_VALUE
}
