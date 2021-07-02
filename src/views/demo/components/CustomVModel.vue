<template>
  <div>
    <p v-for="(value, index) of array">
      <el-input
        style="width: 200px;"
        v-model="array[index]"></el-input>
      <el-button @click="array.splice(index, 1)">删除</el-button>
    </p>
    <el-button @click="array.push('')">添加</el-button>
  </div>
</template>

<script>
export default {
  components: {},
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
  methods: {},
  filters: {},
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
