import request from '@/utils/request'

export function getOrder(params) {
  return request({
    url: '/admin/get/order',
    method: 'post',
    params
  })
}
