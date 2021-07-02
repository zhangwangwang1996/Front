<template>
  <div v-title="$route.meta.title">
    <div class="page-heading">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
        <el-breadcrumb-item>页面名称管理</el-breadcrumb-item>
        <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <sj-panel>
      <template slot="header">搜索</template>
      <el-form :model="search"
               :rules="searchRules"
               ref="searchForm"
               label-width="96px"
               label-position="right"
               size="medium"
               @submit.native.prevent="onSearch()">
        <div class="re-el-form__flex">
          <el-form-item label="页面名称ID"
                        prop="id">
            <el-input placeholder="请输入页面名称ID"
                      v-model="search.id"></el-input>
          </el-form-item>
          <el-form-item label="页面名称名称"
                        prop="name">
            <el-input placeholder="请输入名称"
                      v-model="search.name"></el-input>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button type="primary"
                     icon="el-icon-search"
                     native-type="submit">搜索
          </el-button>
          <el-button icon="sj-icon-export"
                     @click="onExportSearch()">导出
          </el-button>
        </el-form-item>
      </el-form>
    </sj-panel>
    <sj-panel :on-export="onExportPage"
              :on-refresh="onRefresh">
      <template slot="header">列表</template>
      <button-gutter class="margin b15">
        <router-link :to="'/routeName/create'">
          <el-button type="primary"
                     icon="el-icon-news"
                     size="small">添加
          </el-button>
        </router-link>
        <el-button type="danger"
                   icon="el-icon-delete"
                   size="small">删除
        </el-button>
      </button-gutter>
      <el-table :data="table"
                stripe
                highlight-current-row
                border>

        <template v-for="attr of fields">
          <el-table-column v-bind="attr"></el-table-column>
        </template>

        <el-table-column fixed="right"
                         label="操作"
                         width="250">
          <template slot-scope="scope">
            <button-gutter>
              <router-link :to="`/routeName/detail/${scope.row.id}`">
                <el-button size="mini"
                           icon="el-icon-document">详情
                </el-button>
              </router-link>
              <router-link :to="`/routeName/update/${scope.row.id}`">
                <el-button size="mini"
                           type="primary"
                           icon="el-icon-edit-outline">编辑
                </el-button>
              </router-link>
              <el-button type="danger"
                         size="mini"
                         icon="el-icon-delete"
                         @click="onDelete(scope.$index, table)">删除
              </el-button>
            </button-gutter>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination background
                       @size-change="handleSizePageChange"
                       @current-change="handleCurrentPageChange"
                       :current-page="pagination.current_page"
                       :page-sizes="[20, 50, 100, 200]"
                       :page-size="pagination.per_page"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="pagination.total">
        </el-pagination>
      </div>
    </sj-panel>
  </div>
</template>

<script>
import { searchRules } from '../routeName.rules'
import viewNameMixins from '../routeName.mixins'
import table from '@core/mixins/table'

export default {
  mixins: [table, viewNameMixins],
  data () {
    return {
      searchRules,
      search: {
        id: null,
        name: null,
      },
    }
  },
  computed: Vuex.mapState({}),
  created () {},
  methods: {
    ...Vuex.mapActions([]),
    ...request.map(['getViewNameTable']),
    /**
     * 获得表格数据
     * @param {*} params
     */
    getTableData (params) {
      return request.page('getViewNameTable', params)
    },
    onExportPage () {
      this.$export.xlsx(`${this.$route.meta.title}-${this.pagination.current_page}P`, {
        data: this.table,
        header: this.fields,
      })
    },
    onExportSearch () {
      this.$export.xlsx(this.$route.meta.title, {
        header: this.fields,
        total: this.pagination.total,
        request: this.getViewNameTable,
        requestParams: this.search,
      })
    },
    onDelete (index, rows) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {type: 'warning'}).then(() => {
        request.common('deleteViewNameData', {id: rows[index].id}).then(() => {
          this.$message.success('删除成功')
          rows.splice(index, 1)
        })
      }).catch(() => {
        this.$message.info('已取消删除')
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
