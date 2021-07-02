/**
 * 环境配置文件
 */
import '@/env'

/**
 * 初始化
 */
import '@/bootstrap'

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

import Vue from 'vue'
import App from './App.vue'
import store from '@store'

Vue.config.productionTip = false

/**
 * 全局事件派发监听
 * @type {CombinedVueInstance<V, Object, Object, Object, Record<never, any>>}
 */
global.eventBus = new Vue()

/* eslint-disable no-new */
global.app = new Vue({
  router: Router,
  store,
  template: '<App/>',
  components: {App},
})

global.mountApp = () => {
  global.app.$mount('#app')
}
if (process.env.NODE_ENV === 'production') {
  if (global.STYLE_READY) {
    global.mountApp()
  }
} else {
  global.mountApp()
}
