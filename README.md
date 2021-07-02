# alg-admin-template

> 基于 element-ui 的 admin 管理模板

## 启动项目

``` bash
# 安装依赖
yarn install

# 生成环境配置文件
cp .env.example .env

# 启动本地服务 localhost:8090
yarn run dev

# 构建生产环境使用的DLL文件(打包长期不会发生变化的代码和库)
yarn run build:dll

# 构建生产环境的转换和压缩后的代码文件
yarn run build

# build for production and view the bundle analyzer report
yarn run build --report

# run unit tests
yarn run unit

# run e2e tests
yarn run e2e

# run all tests
yarn test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

