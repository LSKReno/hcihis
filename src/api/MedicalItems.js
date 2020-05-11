import request from '../utils/request.js'
export function getTableMedicalItems (params) {
    return request({
        url: '/meidcalItems',
        method: 'get',
        data: params
    })
}

export function getTableMedicalItemModel (params) {
    return request({
        url: '/medicalItemModel',
        method: 'get',
        data: params
    })
}
