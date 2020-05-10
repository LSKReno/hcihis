import Mock from 'mockjs2'
import {
  builder,
  getBody
} from '../util'

const getMedicalTechnologysTotal = (options) => {
  const body = getBody(options)
  console.log('mock: body', body)
  return builder({
    medicalTechnologysTotal: 113
  }, '', 200, {})
}

const allMedicalTechnology = (options) => {
  const body = getBody(options)
  console.log('mock: body', body)
  return builder([{
    medicalTechnologyID: Mock.mock('@guid'),
    medicalTechnologyName: '超声诊疗',
    medicalTechnologySpecifications: '次',
    category: '超声类',
    department: '超声科室',
    fee: '1000',
    pinyinMnemonic: 'chaoshengzhenliao',
    deleted: 0
  }, {
    medicalTechnologyID: Mock.mock('@guid'),
    medicalTechnologyName: '心血管超声诊疗',
    medicalTechnologySpecifications: '次',
    category: '心血管超声和新功能类',
    department: '心血管超声和新功能科',
    fee: '1000',
    pinyinMnemonic: 'xinxueguanchaoshengzhenliao',
    deleted: 1
  }, {
    medicalTechnologyID: Mock.mock('@guid'),
    medicalTechnologyName: 'beita超声诊疗E',
    medicalTechnologySpecifications: '次',
    category: '超声类',
    department: '超声科室',
    fee: '1000',
    pinyinMnemonic: 'beitachaoshengzhenliaoE',
    deleted: 0
  }, {
    medicalTechnologyID: Mock.mock('@guid'),
    medicalTechnologyName: '胃镜',
    medicalTechnologySpecifications: '次',
    category: '内镜类',
    department: '内镜科室',
    fee: '1786',
    pinyinMnemonic: 'weijing',
    deleted: 1
  }, {
    medicalTechnologyID: Mock.mock('@guid'),
    medicalTechnologyName: '阑尾炎手术',
    medicalTechnologySpecifications: '场',
    category: '手术类',
    department: '手术科',
    fee: '2760',
    pinyinMnemonic: 'lanweiyanshoushu',
    deleted: 1
  }, {
    medicalTechnologyID: Mock.mock('@guid'),
    medicalTechnologyName: 'α超声诊疗C',
    medicalTechnologySpecifications: '次',
    category: '超声类',
    department: '超声科室',
    fee: '1000',
    pinyinMnemonic: 'alphachaoshengzhenliaoC',
    deleted: 0
  }, {
    medicalTechnologyID: Mock.mock('@guid'),
    medicalTechnologyName: '核医学化验',
    medicalTechnologySpecifications: '次',
    category: '核医学类',
    department: '核医学科室',
    fee: '10000',
    pinyinMnemonic: 'heyixuekeshi',
    deleted: 0
  }, {
    medicalTechnologyID: Mock.mock('@guid'),
    medicalTechnologyName: '肠镜',
    medicalTechnologySpecifications: '次',
    category: '内镜类',
    department: '内镜科室',
    fee: '786',
    pinyinMnemonic: 'changjing',
    deleted: 0
  } ], '', 200, {})
}

const getWaitedPatientByDoctor = (options) => {
  const body = getBody(options)
  console.log('mock: body', body)
  return builder([{
    registeredID: Mock.mock('@guid').substring(0, 10),
    realName: '张飞',
    medicalRecordID: Mock.mock('@guid').substring(0, 10),
    age: 18,
    gender: '男',
    registeredLevel: 'pth'
  }, {
    registeredID: Mock.mock('@guid').substring(0, 10),
    realName: '孙尚香',
    medicalRecordID: Mock.mock('@guid').substring(0, 10),
    age: 18,
    gender: '女',
    registeredLevel: 'pth'
  }, {
    registeredID: Mock.mock('@guid').substring(0, 10),
    realName: '赵云',
    medicalRecordID: Mock.mock('@guid').substring(0, 10),
    age: 18,
    gender: '男',
    registeredLevel: 'pth'
  }, {
    registeredID: Mock.mock('@guid').substring(0, 10),
    realName: '马超',
    medicalRecordID: Mock.mock('@guid').substring(0, 10),
    age: 18,
    gender: '男',
    registeredLevel: 'pth'
  }, {
    registeredID: Mock.mock('@guid').substring(0, 10),
    realName: '刘备',
    medicalRecordID: Mock.mock('@guid').substring(0, 10),
    age: 18,
    gender: '男',
    registeredLevel: 'pth'
  }, {
    registeredID: Mock.mock('@guid').substring(0, 10),
    realName: '诸葛亮',
    medicalRecordID: Mock.mock('@guid').substring(0, 10),
    age: 18,
    gender: '男',
    registeredLevel: 'pth'
  }, {
    registeredID: Mock.mock('@guid').substring(0, 10),
    realName: '孙策',
    medicalRecordID: Mock.mock('@guid').substring(0, 10),
    age: 18,
    gender: '男',
    registeredLevel: 'pth'
  }, {
    registeredID: Mock.mock('@guid').substring(0, 10),
    realName: '孙坚',
    medicalRecordID: Mock.mock('@guid').substring(0, 10),
    age: 18,
    gender: '男',
    registeredLevel: 'pth'
  }], '', 200, {})
}

const getVisitedPatientByDoctor = (options) => {
  const body = getBody(options)
  console.log('mock: body', body)
  return builder([{
    registeredID: Mock.mock('@guid').substring(0, 10),
    realName: '黄忠',
    medicalRecordID: Mock.mock('@guid').substring(0, 10),
    age: 18,
    gender: '男',
    registeredLevel: 'pth'
  }, {
    registeredID: Mock.mock('@guid').substring(0, 10),
    realName: '姜维',
    medicalRecordID: Mock.mock('@guid').substring(0, 10),
    age: 18,
    gender: '男',
    registeredLevel: 'pth'
  }, {
    registeredID: Mock.mock('@guid').substring(0, 10),
    realName: '曹丕',
    medicalRecordID: Mock.mock('@guid').substring(0, 10),
    age: 18,
    gender: '男',
    registeredLevel: 'pth'
  }, {
    registeredID: Mock.mock('@guid').substring(0, 10),
    realName: '王允',
    medicalRecordID: Mock.mock('@guid').substring(0, 10),
    age: 18,
    gender: '男',
    registeredLevel: 'pth'
  }], '', 200, {})
}

const getPatientMT = (options) => {
  const body = getBody(options)
  console.log('mock: body', body)
  return builder([{
    medicalTechnologyID: Mock.mock('@guid').substring(0, 10),
    medicalTechnologyName: '胃镜',
    medicalTechnologySpecifications: '次',
    category: '内镜类',
    department: '内镜科室',
    fee: '1000',
    hasPaid: 1,
    executed: 0
  }, {
    medicalTechnologyID: Mock.mock('@guid').substring(0, 10),
    medicalTechnologyName: 'beita超声诊疗',
    medicalTechnologySpecifications: '次',
    category: '超声类',
    department: '超声科室',
    fee: '1700',
    hasPaid: 1,
    executed: 0
  }, {
    medicalTechnologyID: Mock.mock('@guid').substring(0, 10),
    medicalTechnologyName: 'α超声诊疗',
    medicalTechnologySpecifications: '次',
    category: '超声类',
    department: '超声科室',
    fee: '1900',
    hasPaid: 1,
    executed: 0
  }, {
    medicalTechnologyID: Mock.mock('@guid').substring(0, 10),
    medicalTechnologyName: '核医学化验',
    medicalTechnologySpecifications: '次',
    category: '核医学类',
    department: '核医学科室',
    fee: '1700',
    hasPaid: 1,
    executed: 0
  }], '', 200, {})
}

Mock.mock(/\/medicaltechnologystotal/, 'get', getMedicalTechnologysTotal)
Mock.mock(/\/medicaltechnology/, 'get', allMedicalTechnology)
Mock.mock(/\/doctor\/waitedPatient/, 'post', getWaitedPatientByDoctor)
Mock.mock(/\/doctor\/visitedPatient/, 'post', getVisitedPatientByDoctor)
Mock.mock(/\/patient\/mt/, 'post', getPatientMT)
