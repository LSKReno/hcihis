import request from '../utils/request.js'

// prescriptionTemplate
export function getPrescriptionTemplateOptions (params) {
    return request({
      url: '/medicinePrescriptionTemplateOptions',
      method: 'get',
      data: params
    })
  }

  export function prescriptionTemplatesTotal (params) {
    return request({
      url: '/medicinePrescriptionTemplatesTotal',
      method: 'get',
      data: params
    })
  }

  export function allPrescriptionTemplate (params) {
    return request({
      url: '/medicinePrescriptionTemplate',
      method: 'post',
      data: params
    })
  }

  export function addPrescriptionTemplate (params) {
    return request({
      url: '/medicinePrescriptionTemplate' + '/{' + params.prescriptionTemplateName + '}',
      method: 'post',
      data: params
    })
  }

  export function updatePrescriptionTemplate (params) {
    return request({
      url: '/medicinePrescriptionTemplate' + '/{' + params.prescriptionTemplateName + '}',
      method: 'put',
      data: params
    })
  }

  export function deletePrescriptionTemplate (params) {
    return request({
      url: '/medicinePrescriptionTemplate' + '/{' + params.id + '}',
      method: 'delete',
      data: params
    })
  }
