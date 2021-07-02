// 载入 views 目录下所有路由文件模块
const modules = require('@utils/requires').requires(require.context('@views', true, /\.route\.js$/))
const routes = (routes = []) => {
  for (const key in modules) {
    Array.prototype.push.apply(routes, modules[key])
  }
  return routes
}
export default routes
