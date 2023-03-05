import request from '@/axios/request'

/**
 * 获取所有角色
 */
export const roleList = () => {
  return request({
    url: '/role/list'
  })
}
