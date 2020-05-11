import localKey from './localKey'

// const devApiUrl = 'http://127.0.0.1:9081';
// const devApiUrl = 'http://49.232.136.80:9081'

// const proApiUrl = 'http://49.232.136.80:9081'
// const proApiUrl = 'http://192.168.49.196:10003';

const nodeDevEnv = process.env.NODE_ENV === 'development'

export default {
  nodeDevEnv: nodeDevEnv,
  // apiUrl: proApiUrl,
  apiUrl: '',
  siteName: '东软云门诊医院管理系统',
  minSiteMame: 'HIS',
  apiPrefix: '',
  timeout: 50000,
  cookiesExpires: 7,
  requestRetry: 4,
  requestRetryDelay: 800,
  tokenKey: 'ACCESS_TOKEN',
  userInfoKey: 'USER_INFO',
  permissionsKey: 'PERMISSION_ARRAY',
  gitHub: 'https://github.com/LSKReno/HalfTown-admin',
  ...localKey
}
