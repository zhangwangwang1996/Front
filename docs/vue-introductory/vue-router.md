## Vue Router

> 完整文档请参阅：https://router.vuejs.org/zh/
>

Vue Router 是 [Vue.js](http://cn.vuejs.org/) 官方的路由管理器。它和 Vue.js 的核心深度集成，让构建单页面应用变得易如反掌。包含的功能有：

- 嵌套的路由/视图表
- 模块化的、基于组件的路由配置
- 路由参数、查询、通配符
- 基于 Vue.js 过渡系统的视图过渡效果
- 细粒度的导航控制
- 带有自动激活的 CSS class 的链接
- HTML5 历史模式或 hash 模式，在 IE9 中自动降级
- 自定义的滚动条行为

##### 常用特效介绍

- [动态路径参数,以冒号开头](https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html#动态路由匹配)   `{ path: '/user/:id', component: User }`
- [响应路由参数的变化](https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html#响应路由参数的变化)   `watch: { '$route' (to, from) {}}`
- 声明式的导航 `<router-link :to="">`
- [编程式的导航](https://router.vuejs.org/zh/guide/essentials/navigation.html])  `router.push(location, onComplete?, onAbort?)`
- [组件内的守卫](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#组件内的守卫)  `beforeRouteEnter`, `beforeRouteUpdate`, `beforeRouteLeave`

