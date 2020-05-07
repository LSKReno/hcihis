import request from '../utils/request.js'

// prescriptionDetails
export function prescriptionDetailsTotal (params) {
  return request({
    url: '/medicinePrescriptionDetailsTotal',
    method: 'get',
    data: params
  })
}

export function allPrescriptionDetails (params) {
  return request({
    url: '/medicinePrescriptionDetails',
    method: 'post',
    data: params
  })
}

export function getPrescriptionDetailsByPrescriptionID (params) {
  return request({
    url: '/medicinePrescriptionDetails/prescriptionID/' + '/{' + params.prescriptionID + '}',
    method: 'post',
    data: params
  })
}

export function addPrescriptionDetails (params) {
  return request({
    url: '/medicinePrescriptionDetails' + '/{' + params.prescriptionID + '}',
    method: 'post',
    data: params
  })
}

export function updatePrescriptionDetails (params) {
  return request({
    url: '/medicinePrescriptionDetails' + '/{' + params.prescriptionID + '}',
    method: 'put',
    data: params
  })
}

export function deletePrescriptionDetails (params) {
  return request({
    url: '/prescriptionDetails' + '/{' + params.id + '}',
    method: 'delete',
    data: params
  })
}
