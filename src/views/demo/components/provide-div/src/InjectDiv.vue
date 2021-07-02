<template>
  <div>
    <p>这是祖先组件传递的message的值: <b style="color: #409EFF;">{{provideDiv.message}}</b></p>
    <p>祖先组件提供给后代组件的数据/方法</p>
    <p>后代组件不论隔了多少层组件都能访问祖先组件提供的数据/方法</p>
  </div>
</template>

<script>
export default {
  components: {},
  inject: ['provideDiv'],
  props: {},
  data () {
    return {}
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
