import Layout from '@layout/LayoutIndex'

export const account = [
  {
    path: '/account',
    component: Layout,
    children: [
      {
        path: '',
        redirect: 'detail',
      },
      {
        path: 'password/form',
        component: () => import(/* webpackChunkName: "account-password-form" */ './pages/AccountPasswordForm.vue'),
        meta: {
          title: '修改账户密码',
        },
      },
      {
        path: 'detail',
        component: () => import(/* webpackChunkName: "account-detail" */ './pages/AccountDetail.vue'),
        meta: {
          title: '账户详情',
        },
      },
    ],
  },
]
