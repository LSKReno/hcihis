import Mock from 'mockjs2'
import {
  builder,
  getBody
} from '../util'

const username = ['admin', 'admin1', 'admin2', 'admin3']
const password = ['admin', '111111', '222222', '333333']

const login = (options) => {
  const body = getBody(options)
  console.log('mock: body', body)
  if (!username.includes(body.username) || !password.includes(body.password)) {
    return builder({
      isLogin: false
    }, '账户或密码错误', 401)
  }
  const superAdmin = username[0]
  const doctor = username[1]
  const financialStaff = username[2]
  const mtdoctor = username[3]
  if (body.username === superAdmin) {
    return builder({
      'id': Mock.mock('@guid'),
      'name': Mock.mock('@name'),
      'nickname': '超级管理员',
      'userType': 0, // 超级管理员
      'username': 'admin',
      'password': '',
      'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png',
      'status': 1,
      'telephone': '',
      'lastLoginIp': '27.154.74.117',
      'lastLoginTime': 1534837621348,
      'creatorId': 'admin',
      'createTime': 1497160610259,
      'deleted': 0,
      'roleId': 'admin',
      'lang': 'zh-CN',
      'token': '4291d7da9005377ec9aec4a71ea837f'
    }, '', 200, {
      'Custom-Header': Mock.mock('@guid')
    })
  } else if (body.username === doctor) {
    return builder({
      'id': Mock.mock('@guid'),
      'name': Mock.mock('@name'),
      'nickname': '王建国医生',
      'userType': 1, // 医生
      'username': 'admin1',
      'password': '',
      'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png',
      'status': 1,
      'telephone': '',
      'lastLoginIp': '27.154.74.117',
      'lastLoginTime': 1534837621348,
      'creatorId': 'admin1',
      'createTime': 1497160610259,
      'deleted': 0,
      'roleId': 'admin1',
      'lang': 'zh-CN',
      'token': '4291d7da9005377ec9aec4a71ea837f'
    }, '', 200, {
      'Custom-Header': Mock.mock('@guid')
    })
  } else if (body.username === financialStaff) {
    return builder({
      'id': Mock.mock('@guid'),
      'name': Mock.mock('@name'),
      'nickname': '夏远财务',
      'userType': 2, // 财务人员
      'username': 'admin2',
      'password': '',
      'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png',
      'status': 1,
      'telephone': '',
      'lastLoginIp': '27.154.74.117',
      'lastLoginTime': 1534837621348,
      'creatorId': 'admin2',
      'createTime': 1497160610259,
      'deleted': 0,
      'roleId': 'admin2',
      'lang': 'zh-CN',
      'token': '4291d7da9005377ec9aec4a71ea837f'
    }, '', 200, {
      'Custom-Header': Mock.mock('@guid')
    })
  } else if (body.username === mtdoctor) {
    return builder({
      'id': Mock.mock('@guid'),
      'name': Mock.mock('@name'),
      'nickname': '范闲医技医生',
      'userType': 3, // 医技医生
      'username': 'admin3',
      'password': '',
      'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png',
      'status': 1,
      'telephone': '',
      'lastLoginIp': '27.154.74.117',
      'lastLoginTime': 1534837621348,
      'creatorId': 'admin3',
      'createTime': 1497160610259,
      'deleted': 0,
      'roleId': 'admin3',
      'lang': 'zh-CN',
      'token': '4291d7da9005377ec9aec4a71ea837f'
    }, '', 200, {
      'Custom-Header': Mock.mock('@guid')
    })
  }
}

const logout = () => {
  return builder({}, '[测试接口] 注销成功')
}

const smsCaptcha = () => {
  return builder({
    captcha: Mock.mock('@integer(10000, 99999)')
  })
}

const twofactor = () => {
  return builder({
    stepCode: Mock.mock('@integer(0, 1)')
  })
}

Mock.mock(/\/auth\/login/, 'post', login)
Mock.mock(/\/auth\/logout/, 'post', logout)
Mock.mock(/\/account\/sms/, 'post', smsCaptcha)
Mock.mock(/\/auth\/2step-code/, 'post', twofactor)
