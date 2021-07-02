<template>
  <div class="sj-gutter">
    <div class="sj-gutter-wrapper"
         :style="wrapperStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SjGutter',
  props: {
    wrapperStyle: [String, Object, Array]
  },
  watch: {},
  data () {
    return {}
  },
  created () {},
  mounted () {},
  methods: {},
}
</script>
<style lang="scss">
// 全局CSS
.button-gutter {
  overflow: hidden;
}

.button-gutter-wrapper {
  // 忽略其子元素之间的空白，并且将显示与连续的内联块元素类似的内容
  display: flex;
  flex-wrap: wrap;
  align-items: end;
}
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
