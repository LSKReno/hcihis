
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

StatisticsManage.statistics = {
  name: '门诊日结',
  path: '/statistics_manage'
}

export default financialStaffAdminMenu
