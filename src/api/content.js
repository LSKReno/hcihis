import request from '../utils/request.js'

// pharmacyDrug
export function pharmacyDrug(params) {
  return request({
    url: '/pharmacyDrug',
    method: 'post',
    data: params
  })
}

//patientPay
export function patientPay(params) {
  return request({
    url: '/patientPay',
    method: 'post',
    data: params
  })
}
// patientRefund
export function patientRefund(params) {
  return request({
    url: '/patientRefund',
    method: 'post',
    data: params
  })
}























