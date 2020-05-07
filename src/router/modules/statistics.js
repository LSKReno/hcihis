export default {
    statistics: {
        path: '/statistics_manage',
        name: 'StatisticsManage',
        meta: {
          title: '门诊医生工作量统计',
          keepAlive: true
        },
        component: resolve => require(['@/views/statistics/doctorWorkloadStatistics.vue'], resolve)
      }
}
