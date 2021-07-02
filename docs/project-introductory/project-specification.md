## 项目开发规范


#### 路由使用 import() 懒加载需要配置 webpackChunkName

- import() https://router.vuejs.org/zh/guide/advanced/lazy-loading.html
- 路由懒加载 https://webpack.docschina.org/api/module-methods#import-

```js
{
  component: () => import(/* webpackChunkName: "demo-table" */ './pages/DemoTable.vue')
}
```



#### 路由地址一律采用减号(-)作为单词连接符号

```js
[
  { path: '/user/table' },
  { path: '/user/blacklist-table' }
]
```



#### vue 文件名规范：模块 + [动作] + 类型

- 头部带有模块名称，例如：`UserTable`
- 结尾带有页面类型，例如：`UserTable`，`UserDetail`，`UserDialog`，`UserForm`
- 页面的动作在页面类型前写入，例如：`UserCreateDialog`,`UserCreateForm`



#### 其他文件规范

- 文件夹和js文件采用kebab-case(减号连接)的命名方式



#### 访问页面的路由原则上就是文件名: 模块 / [动作] / 类型

- 例如：`UserRoleTable` => `/user-role/table`
- 例如：`UserCreateForm` => `/user/create/form`



#### 常用动词列表

- 增：`create`、`add`
- 删：`remove` _注：`delete`为js关键字，不要使用_
- 改：`update`、`modify`
- 查：`select`、`query`
- 编辑：`edit` _注：不同于改，大多用于组件名称，例如：富文本编辑器、图片编辑器_
- 其他动词：
  `get`、`set`、`search`、`copy`、`move`、`run`、`jump`、`enter`、`exit`、`go`、`listen`、`work`



#### 其他遵守VUE官方推荐开发规范

##### [优先级-A-的规则：必要的-规避错误](https://cn.vuejs.org/v2/style-guide/#优先级-A-的规则：必要的-规避错误)

- 组件名应该始终是多个单词的，根组件 App 除外
- 组件的 data 必须是一个函数。
- prop 的定义应该尽量详细，至少需要指定其类型。
- 在组件上总是必须用 key 配合 v-for，以便维护内部组件及其子树的状态。
- 永远不要把 v-if 和 v-for 同时用在同一个元素上。
- 组件样式设置作用域，选用基于 class 的策略而不是 scoped 特性。
- 私有属性名

> [Vue风格指南 https://cn.vuejs.org/v2/style-guide/](https://cn.vuejs.org/v2/style-guide/)

