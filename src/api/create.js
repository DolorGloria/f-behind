import request from '@/utils/request'

export function createProduct(params) {
  return request({
    url: '/admin/create/product',
    method: 'post',
    params
  })
}
