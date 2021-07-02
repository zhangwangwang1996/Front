<template>
  <div v-title="$route.meta.title">
    <div class="page-heading">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
        <el-breadcrumb-item>DEMO管理</el-breadcrumb-item>
        <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <sj-panel>
      <template slot="header">引入别名路径</template>
      <h3>参考文档：<a href="https://vue-loader.vuejs.org/zh/guide/asset-url.html#转换规则"
                  target="_blank">https://vue-loader.vuejs.org/zh/guide/asset-url.html#转换规则</a>
      </h3>
      <p><code>file-loader</code> 可以指定要复制和放置资源文件的位置，以及如何使用版本哈希命名以获得更好的缓存。此外，这意味着 <strong>你可以就近管理图片文件，可以使用相对路径而不用担心部署时
        URL 的问题</strong>。使用正确的配置，webpack 将会在打包输出中自动重写文件路径为正确的 URL。</p>
      <p><code>url-loader</code> 允许你有条件地将文件转换为内联的 base-64 URL (当文件小于给定的阈值)，这会减少小文件的 HTTP 请求数。如果文件大于该阈值，会自动的交给 <code>file-loader</code>
        处理。默认阈值10000字节(10kb)</p>

      <h3>大于10000字节为绝对路径</h3>
      <img :src="aliasPath"
           :title="aliasPath"
           alt="aliasPath">

      <h3>小于10000字节为base-64 URL</h3>
      <img :src="base64"
           :title="base64"
           alt="base64">
    </sj-panel>
  </div>
</template>

<script>
import aliasPath from '@assets/这个锅我背了.gif'
import base64 from '@assets/转身背锅.jpeg'

export default {
  components: {},
  mixins: [],
  data () {
    return {
      aliasPath,
      base64,
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  destroyed () {},
  methods: {},
}
</script>
<style lang="scss">
// 全局CSS
</style>
<style lang="scss"
       scoped>
// 带作用域的CSS
// https://vue-loader.vuejs.org/zh-cn/features/scoped-css.html
</style>
<style lang="scss"
       module>
// 带作用域的CSS
// 绑定class方式 <p :class="$style.red"></p>
// https://vue-loader.vuejs.org/zh-cn/features/css-modules.html
</style>
