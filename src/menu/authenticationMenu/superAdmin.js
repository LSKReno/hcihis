
const superAdminMenu = {}

/**
 * 首页
 * @type {{name: string, path: string, icon: string}}
 */
superAdminMenu.home = {
  name: '首页',
  path: '/',
  icon: 'fa fa-tachometer'
}

/**
 * 内容管理
 * @type {{name: string, icon: string, children: {}}}
 */
superAdminMenu.content_manage = {
  name: '医疗信息管理',
  icon: 'fa fa-ravelry',
  children: {}
}

const ContentManage = superAdminMenu.content_manage.children

ContentManage.drug = {
  name: '药品管理',
  path: '/drug_manage'
}
ContentManage.registration = {
  name: '挂号管理',
  path: '/registration_manage'
}
ContentManage.cancelRegistration = {
  name: '退号管理',
  path: '/cancelRegistration_manage'
}

/**
 * 门诊挂号工作站
 * @type {{name: string, icon: string, children: {}}}
 */
superAdminMenu.registrationWorkstation_manage = {
  name: '门诊挂号工作站',
  icon: 'fa fa-lemon-o',
  children: {}
}

const RegistrationWorkstationManage = superAdminMenu.registrationWorkstation_manage.children

RegistrationWorkstationManage.registration = {
  name: '门诊挂号管理',
  path: '/registration_manage'
}
RegistrationWorkstationManage.cancelRegistration = {
  name: '门诊退号管理',
  path: '/cancelRegistration_manage'
}
RegistrationWorkstationManage.patientPay = {
  name: '处方药品收费',
  path: '/patientPay_manage'
}
RegistrationWorkstationManage.patientRefund = {
  name: '药品退费',
  path: '/patientRefund_manage'
}

/**
 * 门诊医生工作站
 * @type {{name: string, icon: string, children: {}}}
 */
superAdminMenu.doctorWorkstation_manage = {
  name: '门诊医生工作站',
  icon: 'fa fa-eercast',
  children: {}
}

const DoctorWorkstationManage = superAdminMenu.doctorWorkstation_manage.children

DoctorWorkstationManage.medicalRecord = {
  name: '门诊病历管理',
  path: '/medicalRecord_manage'
}

/**
 * 用户管理
 * @type {{name: string, icon: string, children: {}}}
 */
superAdminMenu.user_manage = {
  name: '用户管理',
  icon: 'fa fa-user-circle-o',
  children: {}
}
const UserManage = superAdminMenu.user_manage.children

UserManage.user = {
  name: '用户列表',
  path: '/user_manage'
}

/**
 * 门诊财务工作站
 * @type {{name: string, icon: string, children: {}}}
 */
superAdminMenu.statistics_manage = {
  name: '门诊财务工作站',
  icon: 'fa fa-eercast',
  children: {}
}

const StatisticsManage = superAdminMenu.statistics_manage.children

StatisticsManage.statistics = {
  name: '门诊医生工作量统计',
  path: '/statistics_manage'
}

export default superAdminMenu
