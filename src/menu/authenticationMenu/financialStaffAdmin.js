
const financialStaffAdminMenu = {}

/**
 * 首页
 * @type {{name: string, path: string, icon: string}}
 */
financialStaffAdminMenu.home = {
  name: '首页',
  path: '/',
  icon: 'fa fa-tachometer'
}

/**
 * 门诊财务工作站
 * @type {{name: string, icon: string, children: {}}}
 */
financialStaffAdminMenu.statistics_manage = {
  name: '门诊财务工作站',
  icon: 'fa fa-eercast',
  children: {}
}

const StatisticsManage = financialStaffAdminMenu.statistics_manage.children
StatisticsManage.feemanage = {
  name: '费用科目管理',
  path: '/fee_manage'
}
StatisticsManage.statistics = {
  name: '门诊医生工作量统计',
  path: '/statistics_manage'
}
StatisticsManage.department = {
  name: '门诊科室工作量统计',
  path: '/department_statistics'
}
StatisticsManage.dailysettle = {
  name: '门诊日结核对',
  path: '/daily_settle'
}
export default financialStaffAdminMenu
