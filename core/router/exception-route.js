import NotFound from '@core/pages/exception/NotFound'
import Skeleton from '@core/pages/Skeleton'

const routes = [
  {
    path: '*',
    component: NotFound,
    name: '404',
    meta: {
      auth: false,
    },
  },
  {
    path: '/skeleton',
    component: Skeleton,
    name: '首次加载等待页',
  },
]

export default routes
