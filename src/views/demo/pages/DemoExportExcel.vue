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
      <template slot="header">导出EXCEL</template>
      <el-button type="primary"
                 @click="exportExcelForArray">导出数组
      </el-button>
      <el-button type="primary"
                 @click="exportExcelForObject">导出对象
      </el-button>
      <el-button type="primary"
                 @click="exportExcelForRequest">导出搜索结果
      </el-button>
    </sj-panel>

  </div>
</template>

<script>

export default {
  components: {},
  mixins: [],
  data () {
    return {
      arrayTable: [
        [
          'ID', '用户名',
        ],
        [
          '1', '张三',
        ],
        [
          '2', '李四',
        ],
      ],
      objectTableHeader: [
        {
          prop: 'id',
          label: 'ID',
        },
        {
          prop: 'name',
          label: '用户名',
        },
      ],
      objectTable: [
        {
          id: 1,
          name: '张三',
        },
        {
          id: 2,
          name: '李四',
        },
      ],
    }
  },
  computed: {
    ...Vuex.mapState({}),
  },
  watch: {},
  created () {},
  mounted () {

  },
  destroyed () {
  },
  methods: {
    exportExcelForArray () {
      this.$export.xlsx('EXCEL导出数组', this.arrayTable)
    },
    exportExcelForObject () {
      this.$export.xlsx('EXCEL导出对象', {
        data: this.objectTable,
        header: this.objectTableHeader,
      })
    },
    /**
     * 获得表格数据
     * @param {*} params
     */
    getTableData (params) {
      return request.page('getDemoTable', params)
    },
    exportExcelForRequest () {
      this.$export.xlsx('EXCEL导出搜索结果', {
        header: this.objectTableHeader,
        request: this.getTableData,
        requestParams: {},
        responseData: (data) => data,
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
