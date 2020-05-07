const doctorMenu = {}

/**
 * 首页
 * @type {{name: string, path: string, icon: string}}
 */
doctorMenu.home = {
  name: '首页',
  path: '/',
  icon: 'fa fa-tachometer'
}

/**
 * 门诊医生工作站
 * @type {{name: string, icon: string, children: {}}}
 */
doctorMenu.doctorWorkstation_manage = {
  name: '门诊医生工作站',
  icon: 'fa fa-eercast',
  children: {}
}

const DoctorWorkstationManage = doctorMenu.doctorWorkstation_manage.children

DoctorWorkstationManage.medicalRecord = {
  name: '门诊病历管理',
  path: '/medicalRecord_manage'
}

export default doctorMenu
