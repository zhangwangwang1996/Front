## 项目目录结构

```
├── artisan  快速生成模块文件的构建工具
├── build  webpack打包构建配置
├── config webpack中的环境配置文件
├── core  模板的核心代码
│   ├── api  API相关文件
│   │   ├── index.js
│   │   ├── interceptors.js  api拦截器
│   │   └── request.js api扩展调用
│   ├── components 自定义组件
│   │   ├── ExportExcelBox 导出EXCEL弹窗
│   │   ├── ImageUploadControl.vue  图片上传控制(图片列表)
│   │   ├── LayoutPanel.vue  布局面板
│   │   └── RemoteSelect.vue  远程搜索下拉
│   ├── directive 自定义指令
│   │   ├── permission.js 权限控制
│   │   └── title.js  文档标题
│   ├── filters 过滤器(自定义数据处理方法)
│   │   ├── index.js 
│   │   ├── array.js 数组
│   │   ├── date.js 日期
│   │   ├── math.js 数学
│   │   ├── oss.js OSS
│   │   ├── other.js 其他
│   │   ├── router.js 路由
│   │   └── strcase.js 名称风格转换
│   ├── mixins vue混合文件
│   │   ├── dateTimePicker.js 通用的element-ui日期组件options配置
│   │   └── table.js  表格页面相关方法
│   ├── mock  模拟数据文件
│   │   ├── index.js 模拟数据自动加载器
│   │   └── make.js 适用于coreAPI数据的生成器
│   ├── pages  页面文件
│   │   ├── EmptyPage.vue 空页面(包含常用的一些vue框架功能)
│   │   ├── Skeleton.vue 加载动画页面
│   │   └── exception 异常页面
│   ├── router  路由文件
│   │   ├── common-route.js 通用的路由配置(404、首屏加载)
│   │   ├── exception-route.js 异常的路由配置(404、400、424)
│   │   ├── interceptors.js 路由拦截器
│   │   └── routes.js 路由自动加载器
│   ├── style  样式文件
│   │   ├── layout.scss 布局样式文件
│   │   ├── rewrite-element.scss 对于element-ui重写的样式
│   │   └── scrollbar.scss 滚动条样式(仅对chrome生效)
│   ├── update  更新脚本
│   └── utils  工具
│       ├── auth.js 用户认证相关操作
│       ├── requires.js 引入一个文件夹下的所有文件
│       └── rule.js element-ui的表单验证快速编写规则方法
├── dist  打包构建后的文件
│   ├── dll 通过 build:dll 构建，其内容基本无变化
│   └── static  构建的静态文件
├── docs  模板文档
├── src  项目源码
│   ├── App.vue 页面入口文件
│   ├── router.js 路由入口文件
│   ├── entry-skeleton.js 首屏加载入口文件
│   ├── main.js APP入口文件
│   ├── assets  动态资源文件
│   ├── bootstrap app启动引入的相关文件
│   ├── components  组件
│   ├── directive 指令
│   ├── layout 页面布局
│   │   ├── LayoutIndex.vue
│   │   ├── LayoutHeader.vue 顶部菜单
│   │   └── LayoutMenu.vue 左侧菜单
│   ├── mixins 混合
│   ├── store 状态管理入口(模块store自动加载)
│   ├── style 样式
│   │   ├── font.scss 字体图标引入
│   │   └── layout.scss 布局样式
│   ├── vendor 非安装的第三方库
│   └── views 视图模块
│       └── demo
│           ├── demo.api.js  api
│           ├── demo.mock.js 模拟数据
│           ├── demo.route.js 路由
│           ├── demo.rules.js 验证规则
│           ├── demo.store.js 状态管理数据
│           └── pages  页面
│               ├── DemoDetail.vue 详情页
│               ├── DemoForm.vue 表单页
│               └── DemoTable.vue 表格页
├── static  静态资源文件
│   └── icons  图标
└── test  测试
    ├── e2e
    └── unit
```
