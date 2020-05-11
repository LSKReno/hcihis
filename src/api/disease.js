import request from '../utils/request.js'

// disease
export function getTableDiseases (params) {
    return request({
        url: '/disease',
        method: 'get',
        data:params
    })
}
