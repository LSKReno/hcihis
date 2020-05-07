export default {
    registration: {
        path: '/registration_manage',
        name: 'RegistrationManage',
        meta: {
          title: '挂号管理',
          keepAlive: true
        },
        component: resolve => require(['@/views/registrationManage/Registration.vue'], resolve)
      },
      cancelRegistration: {
        path: '/cancelRegistration_manage',
        name: 'CancelRegistrationManage',
        meta: {
          title: '退号管理',
          keepAlive: true
        },
        component: resolve => require(['@/views/registrationManage/CancelRegistration.vue'], resolve)
      },
      patientPay: {
        path: '/patientPay_manage',
        name: 'PatientPayManage',
        meta: {
          title: '处方药品收费',
          keepAlive: true
        },
        component: resolve => require(['@/views/registrationManage/PatientPay.vue'], resolve)
      },
      patientRefund: {
        path: '/patientRefund_manage',
        name: 'PatientRefundManage',
        meta: {
          title: '药品退费',
          keepAlive: true
        },
        component: resolve => require(['@/views/registrationManage/PatientRefund.vue'], resolve)
      }
}
