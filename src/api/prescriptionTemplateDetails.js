import request from '../utils/request.js'

// prescriptionTemplateDetails
export function getPrescriptionTemplateDetails (params) {
    return request({
        url: '/medicinePrescriptionTemplateDetails' + '/{' + params.templateID + '}',
        method: 'post',
        data: params
    })
}

export function prescriptionTemplateDetailsTotal (params) {
    return request({
        url: '/medicinePrescriptionTemplateDetailsTotal',
        method: 'get',
        data: params
    })
}

export function allPrescriptionTemplateDetails (params) {
    return request({
        url: '/medicinePrescriptionTemplateDetails',
        method: 'post',
        data: params
    })
}

export function addPrescriptionTemplateDetails (params) {
    return request({
        url: '/medicinePrescriptionTemplateDetails' + '/{' + params.prescriptionTemplateDetailsName + '}',
        method: 'post',
        data: params
    })
}

export function updatePrescriptionTemplateDetails (params) {
    return request({
        url: '/medicinePrescriptionTemplateDetails' + '/{' + params.prescriptionTemplateDetailsName + '}',
        method: 'put',
        data: params
    })
}

export function deletePrescriptionTemplateDetails (params) {
    return request({
        url: '/prescriptionTemplateDetails' + '/{' + params.id + '}',
        method: 'delete',
        data: params
    })
}
