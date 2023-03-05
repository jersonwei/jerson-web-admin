import request from '@/axios/request'
/**
 * 获取用户列表数据
 */
export const getUserManageList = data => {
  return request({
    url: '/user-manage/list',
    params: data
  })
}
