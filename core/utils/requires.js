/*
 * 根据给定的多个文件路径引入模块
 * @Author: anker.wang
 * @Date: 2018-01-08 11:21:15
 * @Last Modified by: anker.wang
 * @Last Modified time: 2018-06-11 17:35:55
 */

export function requires (require, assign = true) {
  let modules = {}
  require.keys().forEach(path => {
    let _module = require(`${path}`)
    // 是否合并对象
    if (assign) {
      Object.assign(modules, _module)
    } else {
      modules[path] = _module
    }
  })
  return modules
}
