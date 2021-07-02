/**
 * 载入样式到全局
 */
import './style.js'

/**
 * 载入依赖包到全局
 */

import './package.js'

/**
 * 载入自定义事件
 */
import './event'

/**
 * 全局Vue自定义指令
 */
import '@core/directive/title'
import '@core/directive/permission'

/**
 * API 拦截器
 */
import '@api/interceptors'

/**
 * Vue全局组件
 */
import '@/components'

/**
 * 载入路由
 */
global.Router = require('@/router').default

/**
 * 安装 ElementUI 到Vue
 */
Vue.use(ElementUI)

/**
 * filter 自定义的过滤方法
 * 可以在<template>或全局filter[]中直接调用
 */
global.filter = require('@core/filters').default
Vue.prototype.$filter = global.filter
for (let key in global.filter) {
  if (global.filter.hasOwnProperty(key)) {
    Vue.filter(key, filter[key])
  }
}

/**
 * request api预处理器
 */
global.request = require('@core/api/request').default

/**
 * Mock.js
 * 生成随机数据，拦截 Ajax 请求
 * 通过覆盖和模拟原生 XMLHttpRequest 的行为来拦截 Ajax 请求
 * http://mockjs.com/
 */
if (process.env.NODE_ENV === 'development' && window._env_.VUE_APP_MOCK_API === 'true') {
  require('@core/mock')
}
