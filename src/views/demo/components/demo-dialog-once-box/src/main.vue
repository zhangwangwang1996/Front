<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    @close="onClose"
    width="50%">
    {{message}}
    <span slot="footer"
          class="dialog-footer">
      <el-button @click="handleAction('cancel')">取 消</el-button>
      <el-button type="primary"
                 @click="handleAction('confirm')">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  components: {},
  props: {},
  data () {
    return {
      visible: false,
      action: '',
      title: undefined,
      message: '',
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  destroyed () {},
  methods: {
    handleAction (action) {
      this.action = action
      this.doClose()
    },
    onClose () {
      if (!this.visible) return
      this.handleAction('close')
    },
    doClose () {
      if (!this.visible) return
      this.visible = false
      setTimeout(() => {
        if (this.action) this.callback(this.action, this)
      })
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
