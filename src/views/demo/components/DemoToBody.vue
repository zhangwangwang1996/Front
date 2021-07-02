<template>
  <div v-show="visible"
       style="margin: auto; position: absolute; top: 0; left: 0; bottom: 0; right: 0;height: 100px;width: 300px;background-color: white;">
    <p>这一个创建在 Body 元素内的组件</p>
    <el-button @click="close">关闭</el-button>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      currentVisible: this.visible,
    }
  },
  computed: {},
  watch: {
    visible () {
      if (this.currentVisible !== this.visible) {
        this.currentVisible = this.visible
      }
    },
    currentVisible () {
      if (this.currentVisible !== this.visible) {
        this.$emit('update:visible', this.currentVisible)
      }
    },
  },
  created () {},
  mounted () {
    document.body.appendChild(this.$el)
  },
  destroyed () {
    this.$el.remove()
  },
  methods: {
    close () {
      this.currentVisible = false
    },
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
