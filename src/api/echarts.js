import request from '../utils/request.js'

export function getDoctorWorkload (params) {
  return request({
    url: '/medicinePrescription/workload',
    method: 'get',
    data: params
  })
}
