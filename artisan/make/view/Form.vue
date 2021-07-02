<template>
  <div v-title="$route.meta.title">
    <div class="page-heading">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
        <el-breadcrumb-item to="/routeName/table">页面名称列表</el-breadcrumb-item>
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
            <el-form-item label="页面名称名称"
                          prop="name">
              <el-input v-model.trim="form.name"></el-input>
            </el-form-item>
          </div>
          <div class="medium">
            <el-form-item label="页面名称名称"
                          prop="name">
              <el-input v-model.trim="form.name"></el-input>
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
import { formRules } from '../routeName.rules.js'

export default {
  components: {},
  data () {
    return {
      id: 0,
      formRules,
      form: {
        name: '',
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
      request.page('getViewNameDetail', {id}).then(({data}) => {
        filter.setLoop(this.form, data)
      })
    },
    getForm () {
      return filter.copyJson(this.form)
    },
    onSubmit () {
      this.$refs.form.validate().then(() => {
        this.id ? this.update(this.id) : this.create()
      }).catch(() => {
        this.$message.error('提交内容填写不正确！')
      })
    },
    create () {
      request.common('createViewNameData', this.getForm()).then((res) => {
        this.$confirm(this.$route.meta.title + '成功, 是否继续添加？', '提示', {type: 'success'}).then(() => {
          this.$refs.form.resetFields()
        }, () => {
          this.$router.push({path: '/routeName/table/'})
        })
      })
    },
    update (id) {
      request.common('updateViewNameData', {id, ...this.getForm()}).then((res) => {
        this.$confirm(this.$route.meta.title + '成功, 是否前往列表页面？', '提示', {type: 'success'}).then(() => {
          this.$router.push({path: '/routeName/table/'})
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
