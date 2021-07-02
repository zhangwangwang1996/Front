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
      <template slot="header">扩展图标</template>
      <h4>Element-UI 图片参阅：
        <a href="https://element.faas.ele.me/#/zh-CN/component/icon"
           target="_blank">https://element.faas.ele.me/#/zh-CN/component/icon</a>
      </h4>
      <ul class="icon-list">
        <li v-for="name of icon">
          <span>
            <i :class="name"></i>
            <span class="icon-name">{{name}}</span>
          </span>
        </li>
      </ul>
    </sj-panel>
  </div>
</template>

<script>

export default {
  components: {},
  mixins: [],
  data () {
    return {
      icon: [
        'sj-icon-logout',
        'sj-icon-export',
        'sj-icon-demo',
        'sj-icon-change-password',
        'sj-icon-user-avatar',
        'sj-icon-category',
      ],
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
ul.icon-list {
  overflow: hidden;
  list-style: none;
  padding: 0;
  border: 1px solid #eaeefb;
  border-radius: 4px;
  margin: 10px 0;
  font-size: 14px;
  color: #5e6d82;
  line-height: 2em;

  li {
    float: left;
    width: 16.66%;
    text-align: center;
    height: 120px;
    line-height: 120px;
    color: #666;
    font-size: 13px;
    border-right: 1px solid #eee;
    border-bottom: 1px solid #eee;
    margin-right: -1px;
    margin-bottom: -1px;

    &:after {
      content: "";
      height: 100%
    }
  }

  li:after, li span {
    display: inline-block;
    vertical-align: middle
  }

  li span {
    line-height: normal;
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
    color: #99a9bf;
    transition: color .15s linear
  }

  li i {
    display: block;
    font-size: 32px;
    margin-bottom: 15px;
    color: #606266;
    transition: color .15s linear
  }

  li .icon-name {
    display: inline-block;
    padding: 0 3px;
    height: 1em
  }

  li:hover i, li:hover span {
    color: #5cb6ff
  }
}
</style>
<style lang="scss"
       module>
// 带作用域的CSS
// 绑定class方式 <p :class="$style.red"></p>
// https://vue-loader.vuejs.org/zh-cn/features/css-modules.html
</style>
