import Mock from 'mockjs2'

// 使用同步加载依赖
// 防止 vuex 中的 GetInfo 早于 mock 运行，导致无法 mock 请求返回结果
console.log('mock mounting')
require('./services/auth')
require('./services/medicalTechnology')
require('./services/doctor')
require('./services/disease')
require('./services/medicalItems')
Mock.setup({
  timeout: 800 // setter delay time
})
console.log('mock mounted')
