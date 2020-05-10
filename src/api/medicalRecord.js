import request from '../utils/request.js'

// medicalRecord
export function medicalRecordsTotal (params) {
    return request({
      url: '/medicalRecordsTotal',
      method: 'get',
      data: params
    })
  }

  export function allMedicalRecord (params) {
    return request({
      url: '/medicalRecord',
      method: 'post',
      data: params
    })
  }

  export function addMedicalRecord (params) {
    return request({
      url: '/medicalRecord' + '/{' + params.registeredID + '}',
      method: 'post',
      data: params
    })
  }

  export function updateMedicalRecord (params) {
    return request({
      url: '/medicalRecord' + '/{' + params.registeredID + '}',
      method: 'put',
      data: params
    })
  }

  export function deleteMedicalRecord (params) {
    return request({
      url: '/medicalRecord' + '/{' + params.id + '}',
      method: 'delete',
      data: params
    })
  }
