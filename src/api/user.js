// 用户相关接口模块
import request from '@/utils/request'
export const login = (user) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data: user
  })
}
