import Vue from 'vue'
import Router from 'vue-router'

import Personal from './personal'
import ContentManage from './modules/contentManage'
import doctorWorkstationManage from './modules/doctorWorkstationManage'
import registrationWorkstationManage from './modules/registrationWorkstationManage'
import statisticsManage from './modules/statistics'

Vue.use(Router)

const RouteList = [{
    path: '/',
    component: resolve => require(['@/views/layout/App.vue'], resolve),
    meta: {
      title: '首页',
      keepAlive: false
    },
    children: [{
        path: '/',
        name: 'Dashboard',
        meta: {
          title: '首页',
          keepAlive: true
        },
        component: resolve => require(['@/views/home/Index.vue'], resolve)
      },

      registrationWorkstationManage.registration,
      registrationWorkstationManage.cancelRegistration,
      registrationWorkstationManage.patientPay,
      registrationWorkstationManage.patientRefund,

      // 医生的
      doctorWorkstationManage.medicalRecordManage,
      // 医技医生的
      ContentManage.drug,
      // 财务的统计
      statisticsManage.statistics,

      // 个人中心，可能有修改密码，头像修改等路由
      Personal.index
    ]
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '后台登录',
      keepAlive: false
    },
    components: {
      blank: resolve => require(['@/views/login/Login.vue'], resolve)
    }
  }
]

export default new Router({
  routes: RouteList
})
