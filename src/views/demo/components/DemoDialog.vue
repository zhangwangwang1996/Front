<template>
  <el-dialog
    ref="dialog"
    title="DemoDialog"
    width="50%"
    v-bind="$attrs"
    v-on="$listeners"
    @close="onClose"
    tabindex="-1"
    @keyup.enter.native="onSubmit()">
    <p>一个对模态框进行封装的组件</p>
    <span slot="footer"
          class="dialog-footer">
      <el-button @click="$refs.dialog.handleClose()">取 消</el-button>
      <el-button type="primary"
                 @click="onSubmit()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onClose () {
      Object.assign(this.$data, this.$options.data.call(this))
    },
    onSubmit () {
      this.$refs.dialog.handleClose()
      this.$message.success('提交成功！')
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
