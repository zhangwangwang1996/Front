import Layout from '@layout/LayoutIndex'

export const home = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import(/* webpackChunkName: "home-index" */ './pages/HomeIndex.vue'),
        meta: {
          title: '首页',
        },
      },
    ],
  },
]
