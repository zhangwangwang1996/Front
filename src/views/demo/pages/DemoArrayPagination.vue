<template>
  <div v-title="$route.meta.title">
    <div class="page-heading">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
        <el-breadcrumb-item>DEMO管理</el-breadcrumb-item>
        <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <sj-panel>
      <template slot="header">数组分页加载</template>
      <div>
        <el-card v-for="value in arrayPagination"
                 :key="value"
                 shadow="hover"
                 style="width: 150px;display: inline-block;margin: 0 10px 10px 0;">
          数组{{value}}
        </el-card>
      </div>
      <el-pagination background
                     @size-change="handleSizePageChange"
                     @current-change="handleCurrentPageChange"
                     :current-page="pagination.current_page"
                     :page-sizes="[20, 50, 100, 200]"
                     :page-size="pagination.per_page"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="pagination.total">
      </el-pagination>
    </sj-panel>
  </div>
</template>

<script>
export default {
  components: {},
  mixins: [],
  data () {
    let array = []
    for (let i = 0; i < 123456; i++) {
      array.push(i)
    }
    return {
      array,
      pagination: {
        current_page: 1,
        per_page: 20,
        total: array.length,
      },
    }
  },
  computed: {
    arrayPagination () {
      return this.array.slice(
        (this.pagination.current_page - 1) * this.pagination.per_page,
        this.pagination.current_page * this.pagination.per_page
      )
    }
  },
  watch: {},
  created () {},
  mounted () {},
  destroyed () {},
  methods: {
    /**
     * 处理分页大小时的变化
     * @param {*} val
     */
    handleSizePageChange (val) {
      this.pagination.per_page = val
    },
    /**
     * 处理页码变化
     * @param {*} val
     */
    handleCurrentPageChange (val) {
      this.pagination.current_page = val
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
