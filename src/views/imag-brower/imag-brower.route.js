import Layout from '@layout/LayoutIndex'

export const imagBrower = [
  {
    path: '/imag-brower',
    component: Layout,
    children: [
      {
        path: '',
        redirect: 'table',
      },
      {
        path: 'table',
        component: () => import(/* webpackChunkName: "imag-brower-table" */ './pages/ImagBrowerTable.vue'),
        meta: {
          title: 'imagBrower列表',
        },
      },
      {
        path: 'create',
        component: () => import(/* webpackChunkName: "imag-brower-form" */ './pages/ImagBrowerForm.vue'),
        meta: {
          title: '添加imagBrower',
        },
      },
      {
        path: 'update/:id',
        component: () => import(/* webpackChunkName: "imag-brower-form" */ './pages/ImagBrowerForm.vue'),
        meta: {
          title: '修改imagBrower',
        },
      },
      {
        path: 'detail/:id',
        component: () => import(/* webpackChunkName: "imag-brower-detail" */ './pages/ImagBrowerDetail.vue'),
        meta: {
          title: 'imagBrower详情',
        },
      },
    ],
  },
]
