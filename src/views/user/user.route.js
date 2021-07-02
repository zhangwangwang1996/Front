import Layout from '@layout/LayoutIndex'

export const user = [
  {
    path: '/user',
    component: Layout,
    children: [
      {
        path: '',
        redirect: 'table',
      },
      {
        path: 'table',
        component: () => import(/* webpackChunkName: "user-table" */ './pages/UserTable.example.vue'),
        meta: {
          title: 'user列表',
        },
      },
      {
        path: 'create',
        component: () => import(/* webpackChunkName: "user-form" */ './pages/UserForm.vue'),
        meta: {
          title: '添加user',
        },
      },
      {
        path: 'update/:id',
        component: () => import(/* webpackChunkName: "user-form" */ './pages/UserForm.vue'),
        meta: {
          title: '修改user',
        },
      },
      {
        path: 'detail/:id',
        component: () => import(/* webpackChunkName: "user-detail" */ './pages/UserDetail.vue'),
        meta: {
          title: 'user详情',
        },
      },
    ],
  },
]
