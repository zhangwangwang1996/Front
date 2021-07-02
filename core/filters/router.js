export default {
  /**
   * 获得登录路由
   * @param fullPath
   * @returns {{path: string}}
   */
  loginPath (fullPath) {
    let path = {path: '/login'}
    // 非默认路由进行登录后跳转
    if (fullPath && fullPath !== '/') {
      path.query = {'to': fullPath}
    }
    return path
  },
}
