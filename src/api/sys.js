import requeset from '@/axios/request'

/**
 * 登陆
 */
export const login = data => {
  return requeset({
    url: '/sys/login',
    method: 'POST',
    data
  })
}
/**
 * 用户信息
 */
export const getUserInfo = () => {
  return requeset({
    url: '/sys/profile'
  })
}
