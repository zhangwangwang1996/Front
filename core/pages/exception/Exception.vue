<template>
  <div class="exception-body">
    <div class="exception-code">
      <strong>{{code}}</strong>
    </div>
    <h3 class="exception-message text-ellipsis"
        :title="message">{{message}}</h3>
    <div>
      <el-button-group>
        <el-button type="primary"
                   round
                   size="medium"
                   @click="$router.push('/')">首页
        </el-button>
        <el-button type="primary"
                   round
                   size="medium"
                   @click="$router.back()">返回上一页
        </el-button>
      </el-button-group>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    code: [Number, String],
    message: String,
  },
}
</script>

<style lang="scss"
       src="./exception.scss"></style>
