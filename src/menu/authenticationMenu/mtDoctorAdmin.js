const drugAdminMenu = {}

/**
 * 首页
 * @type {{name: string, path: string, icon: string}}
 */
drugAdminMenu.home = {
  name: '首页',
  path: '/',
  icon: 'fa fa-tachometer'
}

/**
 * 内容管理
 * @type {{name: string, icon: string, children: {}}}
 */
drugAdminMenu.content_manage = {
  name: '医疗信息管理',
  icon: 'fa fa-ravelr',
  children: {}
}
const ContentManage = drugAdminMenu.content_manage.children
ContentManage.drug = {
  name: '药品管理',
  path: '/drug_manage'
}

export default drugAdminMenu
