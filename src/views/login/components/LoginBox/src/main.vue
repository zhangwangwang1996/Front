<template>
  <el-dialog
    width="330px"
    :visible.sync="visible"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    custom-class="login-dialog">
    <login v-if="visible"
           @login="onLogin"/>
  </el-dialog>
</template>

<script>
import Login from '@views/login/components/Login'

export default {
  name: 'LoginDialog',
  components: {Login},
  data () {
    return {
      visible: false,
    }
  },
  created () {},
  methods: {
    onLogin () {
      this.visible = false
    },
  },
}
</script>
<style lang="scss">
.login-dialog {
  .el-dialog__header {
    display: none;
  }

  .el-dialog__body {
    padding: 0px;
  }
}
</style>
