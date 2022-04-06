import request from '@/utils/request'

export function getRules(params) {
  return request({
    url: '/admin/get/rules',
    method: 'post',
    params
  })
}
