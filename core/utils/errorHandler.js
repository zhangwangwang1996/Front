/*
 * 代码运行中发生错误的抓取与记录
 * @Author: anker.wang
 * @Date: 2018-01-08 11:23:39
 * @Last Modified by: anker.wang
 * @Last Modified time: 2018-07-12 15:40:51
 */

// import fundebug from 'fundebug-javascript'
// const { onLogin, onLogout } = require('@utils/auth')
//
// function formatComponentName (vm) {
//   if (vm.$root === vm) return 'root'
//
//   var name = vm._isVue ? (vm.$options && vm.$options.name) || (vm.$options && vm.$options._componentTag) : vm.name
//   return (name ? 'component <' + name + '>' : 'anonymous component') + (vm._isVue && vm.$options && vm.$options.__file ? ' at ' + (vm.$options && vm.$options.__file) : '')
// }
//
// function openFundebug () {
//   fundebug.apikey = process.env.FUNDEBUG_API_KEY
//   fundebug.appversion = process.env.APP_VERSION
//   onLogin().then((user) => {
//     fundebug.user = {
//       name: `${user.name} [${user.id}]`
//     }
//   })
//   onLogout().then((user) => {
//     delete fundebug.user
//   })
//
//   Vue.config.errorHandler = function (err, vm, info) {
//     var componentName = formatComponentName(vm)
//     var propsData = vm.$options && vm.$options.propsData
//     fundebug.notifyError(err,
//       {
//         metaData:
//         {
//           componentName: componentName,
//           propsData: propsData,
//           info: info
//         }
//       })
//   }
// }
//
// if (process.env.FUNDEBUG_API_KEY) {
//   openFundebug()
// }
