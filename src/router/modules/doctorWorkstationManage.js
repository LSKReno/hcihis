export default {
  medicalRecordManage: {
      path: '/medicalRecord_manage',
      name: 'MedicalRecordManage',
      meta: {
          title: '病历管理',
          keepAlive: false
      },
      component: resolve => require(['@/views/medicalRecordManage/MedicalRecord.vue'], resolve)
  }
}
