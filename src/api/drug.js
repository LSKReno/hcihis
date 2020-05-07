import request from '../utils/request.js'

// drug
export function getDrugOptions (params) {
    return request({
      url: '/drugOptions',
      method: 'get',
      data: params
    })
  }

  export function drugsTotal (params) {
    return request({
      url: '/drugsTotal',
      method: 'get',
      data: params
    })
  }

  export function allDrug (params) {
    return request({
      url: '/drug',
      method: 'post',
      data: params
    })
  }

  export function addDrug (params) {
    return request({
      url: '/drug' + '/{' + params.drugName + '}',
      method: 'post',
      data: params
    })
  }

  export function updateDrug (params) {
    return request({
      url: '/drug' + '/{' + params.drugName + '}',
      method: 'put',
      data: params
    })
  }

  export function deleteDrug (params) {
    return request({
      url: '/drug' + '/{' + params.id + '}',
      method: 'delete',
      data: params
    })
  }
