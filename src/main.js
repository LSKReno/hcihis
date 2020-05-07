import Vue from 'vue'
import store from './store/'
import ElementUI from 'element-ui'
import './assets/css/style.scss'
import router from './router/'
import Config from './config/app'
import Moment from 'moment'
import Router from 'vue-router'
import {
  isLogin
} from './utils/dataStorage'
import App from './App.vue'
import animated from './assets/css/animate.css'

import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'

// mock
import './mock'

Vue.use(VXETable)

Vue.prototype.$Config = Config
Vue.use(animated)
Vue.use(ElementUI)
Vue.prototype.moment = Moment

Vue.use(Router)

// 注册全局钩子用来拦截导航
router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title ? to.meta.title + '-' + Config.siteName : Config.siteName
  if (!isLogin() && to.path !== '/login') {
    next({
      path: '/login'
    })
  } else {
    next()
  }
})
// 后置导航守卫
router.afterEach(transition => {

})

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
