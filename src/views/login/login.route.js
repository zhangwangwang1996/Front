export const login = [
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ './pages/LoginPage.vue'),
    meta: {
      title: '用户登录',
      auth: false,
    },
  },
]
