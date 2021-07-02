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
    <sj-panel :show-header="false">
      <h1>EmptyPage</h1>
    </sj-panel>
  </div>
</template>

<script>
import { component, mixin } from ''

/**
 * 参照 https://cn.vuejs.org/v2/api/# 使用属性
 * 参照 https://cn.vuejs.org/v2/style-guide/#组件-实例的选项的顺序-推荐
 * @author anker
 */
export default {
  // 组件名称
  name: 'EmptyPage',
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
  // 继承一个组件
  extends: component,
  // 混合对象,可以包含任意组件选项
  mixins: [mixin],
  // 允许一个自定义组件在使用 v-model 时定制 prop 和 event
  model: {
    prop: 'checked',
    event: 'change',
  },
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
  // 路由生命周期
  beforeRouteEnter (to, from, next) { /* 在导航转入新的路由前获取数据, 不能获取this */
    next(vm => vm.setData('', ''))
  },
  beforeRouteUpdate (to, from, next) { /* 在路由更新前获取数据, 能获取this */
    next()
  },
  // 生命周期钩子
  beforeCreate () { /* 在实例初始化之后被调用 */ },
  created () { /* 在实例创建完成后被调用 */ },
  beforeMount () { /* 在挂载开始之前被调用 */ },
  mounted () { /* 在挂载到实例上去之后被调用 */ },
  beforeUpdate () { /* 数据更新时调用,发生在虚拟 DOM 重新渲染和打补丁之前 */ },
  updated () { /* 数据更新时调用,发生在虚拟 DOM 重新渲染和打补丁之后 */ },
  activated () { /* keep-alive 组件激活时调用 */ },
  deactivated () { /* keep-alive 组件停用时调用 */ },
  beforeDestroy () { /* 实例销毁之前调用 */ },
  destroyed () { /* 实例销毁后调用 */ },
  errorCaptured () { /* 当捕获一个来自子孙组件的错误时被调用 */ },
  // 混入到 Vue 实例中, 能直接同步调用
  methods: {},
  // 一个字符串模板作为 Vue 实例的标识使用。
  template: '',
  // 字符串模板的代替方案，允许你发挥 JavaScript 最大的编程能力。
  render: createElement => {
    return createElement(
      'h' + this.level, // tag-name标签名称
      this.$slots.default, // 子组件中的阵列
    )
  },
  // 当 render 函数遭遇错误时，提供另外一种渲染输出。
  renderError (h, err) {
    return h('pre', {style: {color: 'red'}}, err.stack)
  },
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
