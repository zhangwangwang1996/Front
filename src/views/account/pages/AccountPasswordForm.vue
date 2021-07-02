<template>
  <div v-title="$route.meta.title">
    <div class="page-heading">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
        <el-breadcrumb-item>账户管理</el-breadcrumb-item>
        <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <sj-panel>
      <span slot="header">表单</span>
      <el-form ref="form"
               :model="form"
               :rules="formRules"
               size="medium"
               label-width="140px"
               @submit.native.prevent="onSubmit()">
        <div class="re-el-form__flex">
          <div class="medium">
            <el-form-item label="旧密码"
                          prop="oldPassword">
              <el-input v-model="form.oldPassword"
                        type="password"></el-input>
            </el-form-item>
            <el-form-item label="新密码"
                          prop="password">
              <el-input v-model="form.password"
                        type="password"></el-input>
            </el-form-item>
            <el-form-item label="确认新密码"
                          prop="checkPassword">
              <el-input v-model="form.checkPassword"
                        type="password"></el-input>
            </el-form-item>
          </div>
        </div>
        <el-form-item>
          <el-button type="primary"
                     native-type="submit">提交表单
          </el-button>
          <el-button @click="onReload">重置</el-button>
        </el-form-item>
      </el-form>
    </sj-panel>
  </div>
</template>

<script>
import { formPasswordRules } from '../account.rules.js'

export default {
  components: {},
  data () {
    return {
      formRules: formPasswordRules,
      form: {
        oldPassword: '',
        password: '',
        checkPassword: '',
      },
    }
  },
  computed: {},
  watch: {},
  beforeRouteEnter (to, from, next) {
    next()
  },
  beforeRouteUpdate (to, from, next) {
    next()
    this.onReload()
  },
  beforeCreate () {
    formPasswordRules.checkPassword.push({
      validator: (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.form.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    })
  },
  created () {},
  mounted () {},
  methods: {
    onReload () {
      Object.assign(this.$data, this.$options.data.call(this))
    },
    getForm () {
      return filter.copyJson(this.form)
    },
    onSubmit () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.update()
        } else {
          this.$message.error('提交内容填写不正确！')
        }
      })
    },
    update () {
      request.common('updateAccountPassword', this.getForm()).then((res) => {
        this.$confirm(this.$route.meta.title + '成功!', '提示', {type: 'success'}).then(() => {
          this.onReload()
        })
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
