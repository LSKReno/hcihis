export default {
  medicalTechnology: {
      path: '/medicaltechnology_manage',
      name: 'MedicalTechnologyManage',
      meta: {
          title: '医技项目管理',
          keepAlive: true
      },
      component: resolve => require(['@/views/contentManage/MedicalTechnology.vue'], resolve)
  }
}
