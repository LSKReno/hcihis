import request from '../utils/request.js'

// prescription
export function prescriptionsTotal (params) {
  return request({
    url: '/medicinePrescriptionsTotal',
    method: 'get',
    data: params
  })
}

export function allPrescription (params) {
  return request({
    url: '/medicinePrescription',
    method: 'post',
    data: params
  })
}

export function getPrescriptionByMedicalRecordID (params) {
  return request({
    url: '/medicinePrescription/medicalRecordID' + '/{' + params.medicalRecordID + '}',
    method: 'post',
    data: params
  })
}

export function addPrescription (params) {
  return request({
    url: '/medicinePrescription' + '/{' + params.registeredID + '}',
    method: 'post',
    data: params
  })
}

export function updatePrescription (params) {
  return request({
    url: '/medicinePrescription' + '/{' + params.registeredID + '}',
    method: 'put',
    data: params
  })
}

export function deletePrescription (params) {
  return request({
    url: '/prescription' + '/{' + params.id + '}',
    method: 'delete',
    data: params
  })
}
