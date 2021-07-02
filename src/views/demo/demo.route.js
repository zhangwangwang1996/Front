import Layout from '@layout/LayoutIndex'

export const demo = [
  {
    path: '/demo',
    component: Layout,
    children: [
      {
        path: '',
        redirect: 'table',
      },
      {
        path: 'table',
        component: () => import(/* webpackChunkName: "demo-table" */ './pages/DemoTable.vue'),
        meta: {
          title: 'DEMO列表',
        },
      },
      {
        path: 'create',
        component: () => import(/* webpackChunkName: "demo-form" */ './pages/DemoForm.vue'),
        meta: {
          title: '添加DEMO',
        },
      },
      {
        path: 'update/:id',
        component: () => import(/* webpackChunkName: "demo-form" */ './pages/DemoForm.vue'),
        meta: {
          title: '修改DEMO',
        },
      },
      {
        path: 'nested',
        component: () => import(/* webpackChunkName: "demo-nested-form" */ './pages/DemoNestedForm.vue'),
        meta: {
          title: '嵌套表单',
        },
      },
      {
        path: 'detail/:id',
        component: () => import(/* webpackChunkName: "demo-detail" */ './pages/DemoDetail.vue'),
        meta: {
          title: 'DEMO详情',
        },
      },
      {
        path: 'components',
        component: () => import(/* webpackChunkName: "demo-components" */ './pages/DemoComponents.vue'),
        meta: {
          title: '定义组件',
        },
      },
      {
        path: 'export-excel',
        component: () => import(/* webpackChunkName: "demo-export-excel" */ './pages/DemoExportExcel.vue'),
        meta: {
          title: '导出EXCEL',
        },
      },
      {
        path: 'icon',
        component: () => import(/* webpackChunkName: "demo-icon" */ './pages/DemoIcon.vue'),
        meta: {
          title: '扩展图标',
        },
      },
      {
        path: 'editor',
        component: () => import(/* webpackChunkName: "demo-editor" */ './pages/DemoEditor.vue'),
        meta: {
          title: '富文本编辑器',
        },
      },
      {
        path: 'image-upload',
        component: () => import(/* webpackChunkName: "demo-image-upload" */ './pages/DemoImageUpload.vue'),
        meta: {
          title: '图片上传',
        },
      },
      {
        path: 'import-alias-path',
        component: () => import(/* webpackChunkName: "demo-import-alias-path" */ './pages/DemoImportAliasPath.vue'),
        meta: {
          title: '引入别名路径',
        },
      },
      {
        path: 'keyboard-listener',
        component: () => import(/* webpackChunkName: "demo-keyboard-listener" */ './pages/DemoKeyboardListener.vue'),
        meta: {
          title: '快捷键监听',
        },
      },
      {
        path: 'copy-and-paste',
        component: () => import(/* webpackChunkName: "demo-copy-and-paste" */ './pages/DemoCopyAndPaste.vue'),
        meta: {
          title: '复制粘贴',
        },
      },
      {
        path: 'player',
        component: () => import(/* webpackChunkName: "demo-player" */ './pages/DemoPlayer.vue'),
        meta: {
          title: '多媒体播放器',
        },
      },
      {
        path: 'image-exif',
        component: () => import(/* webpackChunkName: "demo-image-exif" */ './pages/DemoImageExif/DemoImageExif.vue'),
        meta: {
          title: '图片信息读写',
        },
      },
      {
        path: 'image-magnifier',
        component: () => import(/* webpackChunkName: "demo-image-magnifier" */ './pages/DemoImageMagnifier.vue'),
        meta: {
          title: '图片放大镜',
        },
      },
      {
        path: 'array-pagination',
        component: () => import(/* webpackChunkName: "demo-array-pagination" */ './pages/DemoArrayPagination.vue'),
        meta: {
          title: '数组分页加载',
        },
      },
    ],
  },
]
