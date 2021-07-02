/**
 * 框架依赖包载入
 */


/**
 * element-ui
 */
import ElementUI from 'element-ui'


/**
 * 提供了一些数据处理的基础方法
 * 中文文档 http://www.css88.com/doc/lodash/
 */

import _ from 'lodash'

/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */

import jquery from 'jquery'

/**
 * Vue is a modern JavaScript library for building interactive web interfaces
 * using reactive data binding and reusable components. Vue's API is clean
 * and simple, leaving you to focus on building your next great project.
 */

import Vue from 'vue'

/**
 * vuex 状态管理器
 */

import Vuex from 'vuex'


/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

import axios from 'axios'

/**
 * Moment.js JavaScript 日期处理类库
 * http://momentjs.cn/
 */

import moment from 'moment'

global._ = _
global.$ = global.jQuery = jquery
global.Vue = Vue
global.Vuex = Vuex
global.ElementUI = ElementUI
global.moment = moment
moment.locale('zh-cn')
global.axios = axios
