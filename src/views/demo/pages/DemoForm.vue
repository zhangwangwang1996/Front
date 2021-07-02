<template>
  <div v-title="$route.meta.title">
    <div class="page-heading">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
        <el-breadcrumb-item to="/demo/table">DEMO列表</el-breadcrumb-item>
        <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <sj-panel>
      <span slot="header">表单</span>
      <el-form ref="form"
               :model="form"
               :rules="rules"
               size="medium"
               label-width="140px"
               @submit.native.prevent="onSubmit()">
        <div class="re-el-form__flex">
          <div class="medium">
            <el-form-item label="用户名"
                          prop="name">
              <el-input v-model.trim="form.name"></el-input>
            </el-form-item>
            <el-form-item label="手机号"
                          prop="phone">
              <el-input v-model.trim="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="邮箱"
                          prop="email">
              <el-input v-model.trim="form.email"></el-input>
            </el-form-item>
          </div>
          <div class="medium">
            <!-- 表单的第二列 -->
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
import rules from '../rules/demoForm.rules'

export default {
  components: {},
  mixins: [rules],
  data () {
    return {
      id: 0,
      form: {
        name: '',
        phone: '',
        email: '',
      },
    }
  },
  computed: {},
  watch: {},
  beforeRouteEnter (to, from, next) {
    next(vm => vm.onLoad())
  },
  beforeRouteUpdate (to, from, next) {
    next()
    this.onReload()
  },
  created () {},
  mounted () {},
  methods: {
    onLoad () {
      if (this.$route.params.id) {
        this.setForm(this.id = this.$route.params.id)
      }
    },
    onReload () {
      Object.assign(this.$data, this.$options.data.call(this))
      this.onLoad()
    },
    setForm (id) {
      request.page('getDemoDetail', {id}).then(({data}) => {
        filter.setLoop(this.form, data)
      })
    },
    onSubmit () {
      this.$refs.form.validate().then(() => {
        this.id ? this.update(this.id) : this.create()
      }).catch(() => {
        this.$message.error('提交内容填写不正确！')
      })
    },
    create () {
      request.common('createDemoData', this.form).then((res) => {
        this.$confirm(this.$route.meta.title + '成功, 是否继续添加？', '提示', {type: 'success'}).then(() => {
          this.$refs.form.resetFields()
        }, () => {
          this.$router.push({path: '/demo/table/'})
        })
      })
    },
    update (id) {
      request.common('updateDemoData', {id, ...this.form}).then((res) => {
        this.$confirm(this.$route.meta.title + '成功, 是否前往列表页面？', '提示', {type: 'success'}).then(() => {
          this.$router.push({path: '/demo/table/'})
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
