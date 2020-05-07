import request from '../utils/request.js'

export function login (params) {
  return request({
    url: '/auth/login',
    method: 'post',
    data: params
  })
}
