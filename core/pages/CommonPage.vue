<template>
  <div v-title="$route.meta.title">
    <div class="page-heading">
      <h3>
        {{$route.meta.title}}
        <small>一个用于描述的小标题</small>
      </h3>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>演示</el-breadcrumb-item>
        <el-breadcrumb-item>空白页</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <sj-panel>
      <template slot="header">CommonPage</template>
      <h1>CommonPage</h1>
    </sj-panel>
  </div>
</template>

<script>
export default {
  // 子组件注册到当前组件
  components: {},
  // 自定义指令
  directives: {
    focus: {
      // 指令的定义
      inserted: function (el) {
        el.focus()
      },
    },
  },
  // 混合对象,可以包含任意组件选项
  mixins: [],
  // 单向传递父组件数据 可使用 sync 修饰符来改变传值
  props: {
    // this allows using the `value` prop for a different purpose
    value: String,
    // use `checked` as the prop which take the place of `value`
    checked: {
      type: Number,
      default: 0,
    },
  },
  // 实例的数据对象
  data () {
    return {}
  },
  // 计算属性将被混入到 Vue 实例中。
  computed: {},
  // 检测数据变化
  watch: {
    value: function (val, oldVal) {
      console.log('new: %s, old: %s', val, oldVal)
    },
    // 深度 watcher, 可用来检测数组/对象变化
    array: {
      handler: function (val, oldVal) { /* ... */ },
      deep: true,
    },
  },
  created () { /* 在实例创建完成后被调用 */ },
  mounted () { /* 在挂载到实例上去之后被调用 */ },
  destroyed () { /* 实例销毁后调用 */ },
  // 混入到 Vue 实例中, 能直接同步调用
  methods: {},
  // 自定义过滤器
  filters: {},
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
