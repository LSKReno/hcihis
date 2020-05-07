import request from '../utils/request.js'

// registrationLevel
export function registrationLevelsTotal (params) {
    return request({
      url: '/registrationLevelsTotal',
      method: 'get',
      data: params
    })
  }
export function getRegistrationLevelOptions (params) {
    return request({
      url: '/registrationLevelOptions',
      method: 'get',
      data: params
    })
  }

  export function allRegistrationLevel (params) {
    return request({
      url: '/registrationLevel',
      method: 'post',
      data: params
    })
  }

  export function addRegistrationLevel (params) {
    return request({
      url: '/registrationLevel' + '/{' + params.registrationLevelCode + '}',
      method: 'post',
      data: params
    })
  }

  export function updateRegistrationLevel (params) {
    return request({
      url: '/registrationLevel' + '/{' + params.registrationLevelCode + '}',
      method: 'put',
      data: params
    })
  }

  export function deleteRegistrationLevel (params) {
    return request({
      url: '/registrationLevel' + '/{' + params.id + '}',
      method: 'delete',
      data: params
    })
  }
