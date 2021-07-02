<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  components: {},
  provide () {
    return {
      provideDiv: this,
    }
  },
  props: {
    message: String,
  },
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
