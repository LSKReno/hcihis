export default {
  statistics: {
      path: '/statistics_manage',
      name: 'StatisticsManage',
      meta: {
        title: '门诊医生工作量统计',
        keepAlive: true
      },
      component: resolve => require(['@/views/statistics/doctorWorkloadStatistics.vue'], resolve)
    },
  fee_manage: {
      path: '/fee_manage',
      name: 'FeeManage',
      meta: {
          title: '费用项目管理',
          keepAlive: true
      },
      component: resolve => require(['@/views/statistics/feeManage.vue'], resolve)
  },
  department_statistics: {
      path: '/department_statistics',
      name: 'DepartmentStatistics',
      meta: {
          title: '门诊科室工作量统计',
          keepAlive: true
      },
      component: resolve => require(['@/views/statistics/departmentWorkloadStatistics.vue'], resolve)
  },
  daily_settle: {
      path: '/daily_settle',
      name: 'DoctorDailySettlement',
      meta: {
          title: '门诊日结核对',
          keepAlive: true
      },
      component: resolve => require(['@/views/statistics/doctordailysettle.vue'], resolve)
  }
}
