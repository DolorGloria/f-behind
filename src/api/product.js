import request from '@/utils/request'

export function createProduct(params) {
  return request({
    url: '/admin/get/products',
    method: 'post',
    params
  })
}
