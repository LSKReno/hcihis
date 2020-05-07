import request from '../utils/request.js'

// doctor
export function remoteFindDoctorOptions (params) {
  return request({
    url: '/doctorOptions',
    method: 'post',
    data: params
  })
}
