import request from '../utils/request.js'

// medicalTechnology
export function medicalTechnologysTotal (params) {
  return request({
    url: '/medicaltechnologystotal',
    method: 'get',
    data: params
  })
}

export function allMedicalTechnology (params) {
  return request({
    url: '/medicaltechnology',
    method: 'get',
    data: params
  })
}
export function addMedicalTechnology (params) {
  return request({
    url: '/medicaltechnology',
    method: 'post',
    data: params
  })
}

export function updateMedicalTechnology (params) {
  return request({
    url: '/medicaltechnology' + '/{' + params.medicalTechnologyName + '}',
    method: 'put',
    data: params
  })
}

export function deleteMedicalTechnology (params) {
  return request({
    url: '/medicaltechnology' + '/{' + params.id + '}',
    method: 'delete',
    data: params
  })
}

export function getPatientMT (params) {
  return request({
    url: '/patient/mt',
    method: 'post',
    data: params
  })
}
