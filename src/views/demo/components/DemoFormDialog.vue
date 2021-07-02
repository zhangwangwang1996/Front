<template>
  <el-dialog
    title="DemoFormDialog"
    width="450px"
    :close-on-click-modal="false"
    :visible="visible"
    @update:visible="updateVisible"
    @open="onOpen"
    @close="onClose"
    tabindex="-1"
    @keyup.enter.native="onSubmit()">
    <el-form ref="form"
             :model="form"
             :rules="rules"
             v-loading="loading"
             size="small"
             label-width="70px"
             style="padding-right: 50px;margin-bottom: -20px;">
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
    </el-form>
    <span slot="footer"
          class="dialog-footer">
      <el-button @click="updateVisible(false)">取 消</el-button>
      <el-button type="primary"
                 @click="onSubmit()"
                 :disabled="loading">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import rules from '../rules/demoForm.rules'

export default {
  components: {},
  mixins: [rules],
  props: {
    id: Number,
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      loading: false,
      form: {
        name: '',
        phone: '',
        email: '',
      },
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    updateVisible (value) {
      this.$emit('update:visible', value)
    },
    onOpen () {
      this.id && this.setForm(this.id)
    },
    onClose () {
      this.$refs.form.resetFields()
    },
    setForm (id) {
      this.loading = true
      request.common('getDemoDetail', {id}).then(({data}) => {
        filter.setLoop(this.form, data)
      }).finally(() => {
        this.loading = false
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
      this.loading = true
      request.common('createDemoData', this.form).then((res) => {
        this.$alert(this.$route.meta.title + '成功!', '提示', {type: 'success'}).then(() => {
          this.updateVisible(false)
          this.$message.success('添加成功！')
        })
      }).finally(() => {
        this.loading = false
      })
    },
    update (id) {
      this.loading = true
      request.common('updateDemoData', {id, ...this.form}).then((res) => {
        this.$alert(this.$route.meta.title + '成功!', '提示', {type: 'success'}).then(() => {
          this.updateVisible(false)
          this.$message.success('修改成功！')
        })
      }).finally(() => {
        this.loading = false
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
