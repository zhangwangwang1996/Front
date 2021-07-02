<template>
  <div class="demo-nested-form">
    <el-form v-for="(value, index) of array"
             :key="index"
             ref="form"
             :model="value"
             :rules="rules"
             size="medium"
             :inline="true">
      <el-form-item prop="name">
        <el-input v-model="value.name"
                  placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item prop="price">
        <el-input v-model="value.price"
                  placeholder="请输入价格"></el-input>
      </el-form-item>
      <el-button icon="el-icon-delete-solid"
                 type="info"
                 plain
                 @click="array.splice(index, 1)">
      </el-button>
    </el-form>
    <el-button icon="el-icon-news"
               type="info"
               plain
               @click="array.push({name:'', price:''})">
      添加
    </el-button>
  </div>
</template>

<script>
import rules from '../rules/demoMultipleForm.rules'

export default {
  components: {},
  mixins: [rules],
  props: {
    value: Array,
  },
  data () {
    return {}
  },
  computed: {
    array: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      },
    },
  },
  watch: {},
  created () {},
  mounted () {},
  destroyed () {},
  methods: {
    async validate () {
      if (this.$refs.form) {
        let promises = []
        for (let form of this.$refs.form) {
          promises.push(form.validate())
        }
        await Promise.all(promises)
      }
    },
  },
  filters: {},
}
</script>
<style lang="scss">
// 全局CSS
.demo-nested-form {
  .el-form-item {
    margin-bottom: 22px;
    width: 153px;
  }
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
