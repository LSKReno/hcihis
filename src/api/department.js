import request from '../utils/request.js'

// department
export function getDepartmentOptions (params) {
    return request({
      url: '/departmentOptions',
      method: 'get',
      data: params
    })
  }

  export function departmentsTotal (params) {
    return request({
      url: '/departmentsTotal',
      method: 'get',
      data: params
    })
  }

  export function allDepartment (params) {
    return request({
      url: '/department',
      method: 'post',
      data: params
    })
  }

  export function addDepartment (params) {
    return request({
      url: '/department' + '/{' + params.departmentName + '}',
      method: 'post',
      data: params
    })
  }

  export function updateDepartment (params) {
    return request({
      url: '/department' + '/{' + params.departmentName + '}',
      method: 'put',
      data: params
    })
  }

  export function deleteDepartment (params) {
    return request({
      url: '/department' + '/{' + params.id + '}',
      method: 'delete',
      data: params
    })
  }
