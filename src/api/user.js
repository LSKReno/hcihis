import request from '../utils/request.js'

// user
export function allUser (params) {
  return request({
    url: '/user',
    method: 'get',
    data: params
  })
}

export function addUser (params) {
  return request({
    url: '/user' + '/{' + params.account + '}',
    method: 'post',
    data: params
  })
}

export function deleteUser (params) {
  return request({
    url: '/user' + '/{' + params.id + '}',
    method: 'delete',
    data: params
  })
}

export function uploadAvatorURL (params) {
  return request({
    url: '/uploadAvatorURL',
    method: 'post',
    data: params
  })
}

// userType
export function userType (params) {
  return request({
    url: '/userType' + '/{' + params.userType + '}',
    method: 'post',
    data: params
  })
}

export function remoteFindRegistrationStaff (params) {
  return request({
    url: '/registrationStaff',
    method: 'get',
    data: params
  })
}

export function getWaitedPatientByDoctor (params) {
  return request({
    url: '/doctor/waitedPatient',
    method: 'post',
    data: params
  })
}

export function getVisitedPatientByDoctor (params) {
  return request({
    url: '/doctor/visitedPatient',
    method: 'post',
    data: params
  })
}

export function getWaitedPatientByDepartment (params) {
  return request({
    url: '/department/waitedPatient',
    method: 'post',
    data: params
  })
}

export function getVisitedPatientByDepartment (params) {
  return request({
    url: '/department/visitedPatient',
    method: 'post',
    data: params
  })
}
