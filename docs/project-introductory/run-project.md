## 运行项目

##### 安装 node 和 npm

> 官网安装：https://nodejs.org/zh-cn/
>
> windows 安装教程：https://jingyan.baidu.com/article/48b37f8dd141b41a646488bc.html

##### 安装 yarn

> 官网介绍：https://yarn.bootcss.com/
>
> npm 更好替代品

```bash
npm install -g yarn
```

##### 开发环境的构建

```bash
# 安装依赖
yarn install

# 生成环境配置文件
cp .env.example .env

# 启动本地服务 localhost:8090
yarn run dev
```

##### 生产环境的构建

``` bash
# 安装依赖
yarn install

# 生成环境配置文件
cp .env.example .env

# 构建生产环境使用的DLL文件(打包长期不会发生变化的代码和库)
yarn run build:dll

# 构建生产环境的转换和压缩后的代码文件
yarn run build
```



## 项目打包中应用了哪些技术？

##### 基于 vuejs-templates/pwa 模板修改

> github https://github.com/vuejs-templates/pwa

一个功能齐全的项目模板，包含了Webpack、vue-loader设置，具有热加载、测试、css提取功能。

##### webpack

> https://www.webpackjs.com

本质上，*webpack* 是一个现代 JavaScript 应用程序的*静态模块打包器(module bundler)*。当 webpack 处理应用程序时，它会递归地构建一个*依赖关系图(dependency graph)*，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 *bundle*。

##### vue-loader

> https://vue-loader.vuejs.org/zh

Vue Loader 是一个 [webpack](https://webpack.js.org/) 的 loader，它允许你以一种名为[单文件组件 (SFCs)](https://vue-loader.vuejs.org/zh/spec.html)的格式撰写 Vue 组件