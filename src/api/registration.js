import request from '../utils/request.js'

// registration
export function registrationsTotal (params) {
    return request({
      url: '/registrationFormsTotal',
      method: 'get',
      data: params
    })
  }

  export function allRegistration (params) {
    return request({
      url: '/registrationForm',
      method: 'post',
      data: params
    })
  }

  export function addRegistration (params) {
    return request({
      url: '/registrationForm' + '/{' + params.identityNumber + '}',
      method: 'post',
      data: params
    })
  }

  export function updateRegistration (params) {
    return request({
      url: '/registrationForm' + '/{' + params.identityNumber + '}',
      method: 'put',
      data: params
    })
  }

  export function deleteRegistration (params) {
    return request({
      url: '/registrationForm' + '/{' + params.id + '}',
      method: 'delete',
      data: params
    })
  }

export function remoteFindPatient (params) {
  return request({
    url: '/patient',
    method: 'post',
    data: params
  })
}
