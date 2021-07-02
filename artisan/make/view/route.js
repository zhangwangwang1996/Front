import Layout from '@layout/LayoutIndex'

export const viewName = [
  {
    path: '/routeName',
    component: Layout,
    children: [
      {
        path: '',
        redirect: 'table',
      },
      {
        path: 'table',
        component: () => import(/* webpackChunkName: "routeName-table" */ './pages/ViewNameTable.vue'),
        meta: {
          title: '页面名称列表',
        },
      },
      {
        path: 'create',
        component: () => import(/* webpackChunkName: "routeName-form" */ './pages/ViewNameForm.vue'),
        meta: {
          title: '添加页面名称',
        },
      },
      {
        path: 'update/:id',
        component: () => import(/* webpackChunkName: "routeName-form" */ './pages/ViewNameForm.vue'),
        meta: {
          title: '修改页面名称',
        },
      },
      {
        path: 'detail/:id',
        component: () => import(/* webpackChunkName: "routeName-detail" */ './pages/ViewNameDetail.vue'),
        meta: {
          title: '页面名称详情',
        },
      },
    ],
  },
]
