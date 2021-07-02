<template>
  <el-button v-bind="$attrs"
             v-on="$listeners">
    <slot></slot>
  </el-button>
</template>

<script>
export default {
  name: 'InheritAttrs',
  inheritAttrs: false,
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
