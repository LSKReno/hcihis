const mtDoctorAdminMenu = {}

/**
 * 首页
 * @type {{name: string, path: string, icon: string}}
 */
mtDoctorAdminMenu.home = {
  name: '首页',
  path: '/',
  icon: 'fa fa-tachometer'
}

/**
 * 内容管理
 * @type {{name: string, icon: string, children: {}}}
 */
mtDoctorAdminMenu.content_manage = {
  name: '医疗信息管理',
  icon: 'fa fa-ravelr',
  children: {}
}
const ContentManage = mtDoctorAdminMenu.content_manage.children
ContentManage.medicalTechnology = {
  name: '医技项目管理',
  path: '/medicaltechnology_manage'
}

/**
 * 患者检查
 * @type {{name: string, icon: string, children: {}}}
 */
mtDoctorAdminMenu.check = {
  name: '患者检查',
  icon: 'fa fa-ravelr',
  path: '/check'
}
/**
 * 患者检验
 * @type {{name: string, icon: string, children: {}}}
 */
mtDoctorAdminMenu.checkout = {
  name: '患者检验',
  icon: 'fa fa-ravelr',
  path: '/checkout'
}
/**
 * 患者处置
 * @type {{name: string, icon: string, children: {}}}
 */
mtDoctorAdminMenu.disposition = {
  name: '患者处置',
  icon: 'fa fa-ravelr',
  path: '/disposition'
}
export default mtDoctorAdminMenu
