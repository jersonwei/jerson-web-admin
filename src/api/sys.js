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
