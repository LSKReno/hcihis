import request from '../utils/request.js'

export function getDrugFee (params) {
    return request({
        url: '/fee/drugfee',
        method: 'post',
        data: params
    })
}

export function addFee (params) {
    return request({
        url: '/fee/addfee',
        method: 'post',
        data: params
    })
}

export function feeForm (params) {
    return request({
        url: '/fee/feeform',
        method: 'post',
        data: params
    })
}
