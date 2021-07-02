<template>
  <div>
    <children-div></children-div>
  </div>
</template>

<script>
import ChildrenDiv from './ChildrenDiv'
export default {
  components: {ChildrenDiv},
  data () {
    return {
      message: '私有的自定义组件，子组件可以使用 this.$parent 访问，引用页面可以使用 this.refs.privateDiv 访问'
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  destroyed () {},
  methods: {},
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
