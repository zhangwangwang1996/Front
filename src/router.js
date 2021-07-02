import Vue from 'vue'
import Router from 'vue-router'
import interceptors from '@core/router/interceptors'
import commonRoute from '@core/router/common-route'
import routes from '@core/router/routes'

Vue.use(Router)
const router = new Router({
  // history 模式，需要服务器后端配合做路由代理，将所有的前端路由同步代理到 /
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  },
  routes: routes(commonRoute),
})

router.beforeEach(interceptors)

export default router
