import { isLoggedIn } from '@utils/auth'
import exceptionPage from '@core/router/exception-page'

export default function (to, from, next) {
  // 切换路由取消上一个页面的请求
  request.cancelAll('switch to a new route ' + to.path)
  request.createCancelToken()

  // 重置页面状态
  exceptionPage.cancel()

  let logined = isLoggedIn()
  // 是否需要认证
  if (to.meta.auth !== false) {
    // 未登录
    if (!logined) {
      // 进入登录页
      return next(filter.loginPath(to.fullPath))
    }
  } else {
    // 已登录的自动跳转，已登录并在登录页面
    if (logined && to.path === '/login') {
      return next('/')
    }
  }
  return next()
}
