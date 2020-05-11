import request from '../utils/request.js'

// doctor
export function remoteFindDoctorOptions (params) {
  return request({
    url: '/doctorOptions',
    method: 'post',
    data: params
  })
}

export function getPatientByDoctor (params) {
  return request({
    url: '/doctor/patients',
    method: 'get',
    data: params
  })
}

export function getPatientByDepartment (params) {
  return request({
    url: '/department/patients',
    method: 'get',
    data: params
  })
}
