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
      <template slot="header">搜索</template>
      <el-form :model="search"
               :rules="rules"
               ref="searchForm"
               label-width="96px"
               label-position="right"
               size="medium"
               @submit.native.prevent="onSearch()">
        <div class="re-el-form__flex">
          <el-form-item label="用户名"
                        prop="name">
            <el-input placeholder="请输入名称"
                      v-model="search.name"></el-input>
          </el-form-item>
          <el-form-item label="日期区间选择"
                        prop="datetimerange">
            <el-date-picker
              v-model="search.datetimeRange"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetimerange"
              :picker-options="dateTimePickerRangeOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="center"
              class="width-max">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="手机号"
                        prop="phone">
            <el-input placeholder="请输入手机号"
                      v-model="search.phone"></el-input>
          </el-form-item>
          <el-form-item label="下拉多选1"
                        prop="options">
            <el-select v-model="search.options"
                       multiple
                       clearable
                       placeholder="请选择"
                       class="width-max">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="下拉多选2"
                        prop="disabled">
            <el-select v-model="search.disabled"
                       multiple
                       clearable
                       placeholder="请选择"
                       class="width-max">
              <el-option
                v-for="(label, value) in disabledOptions"
                :key="value"
                :label="label"
                :value="value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日期选择"
                        prop="datetime">
            <el-date-picker
              value-format="yyyy-MM-dd HH:mm:ss"
              v-model="search.datetime"
              type="datetime"
              :picker-options="dateTimePickerOptions"
              placeholder="选择日期时间"
              align="center"
              class="width-max">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="区间"
                        class="re-el-form__interval">
            <el-row>
              <el-col :span="11">
                <el-form-item prop="min"
                              label-width="0px">
                  <el-input placeholder="最小值"
                            v-model="search.min"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <span>~</span>
              </el-col>
              <el-col :span="11">
                <el-form-item prop="max"
                              label-width="0px">
                  <el-input placeholder="最大值"
                            v-model="search.max"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
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
        <router-link :to="'/demo/create'">
          <el-button type="primary"
                     icon="el-icon-news"
                     size="small">添加
          </el-button>
        </router-link>
        <el-button type="danger"
                   icon="el-icon-delete"
                   size="small"
                   @click="onDeleteMultiple()">删除
        </el-button>
      </button-gutter>
      <el-table :data="table"
                :height="$store.getters.tableHeight"
                stripe
                highlight-current-row
                border
                @selection-change="val => this.multipleSelection = val">
        <el-table-column
          type="selection"
          width="35"
          :selectable="(row) => !!row.disabled">
        </el-table-column>

        <template v-for="attr of fields">
          <el-table-column v-bind="attr"></el-table-column>
        </template>

        <el-table-column fixed="right"
                         label="操作"
                         width="138">
          <template slot-scope="scope">
            <button-gutter>
              <router-link :to="`/demo/detail/${scope.row.id}`">
                <el-button size="mini">详情</el-button>
              </router-link>
              <el-button size="mini"
                         type="info"
                         @click="onExportRows(scope.row.id)">导出
              </el-button>
              <router-link :to="`/demo/update/${scope.row.id}`">
                <el-button size="mini"
                           type="primary">编辑
                </el-button>
              </router-link>
              <el-button type="danger"
                         size="mini"
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
import rules from '../rules/demoSearch.rules'
import dateTimePicker from '@core/mixins/dateTimePicker'
import table from '@core/mixins/table'
import demoMixins from '../demo.mixins'

export default {
  components: {},
  mixins: [rules, table, dateTimePicker, demoMixins],
  data () {
    return {
      search: {
        name: null,
        phone: null,
        datetime: null,
        datetimeRange: [],
        option: '1',
        disabled: null,
        options: [],
        min: null,
        max: null,
      },
      searchFieldType: {
        phone: Number,
        min: Number,
        max: Number,
        options: Array,
        datetimeRange: Array,
      },
      tableRequestName: 'getDemoTable',
      multipleSelection: [],
    }
  },
  computed: {
    ...Vuex.mapState({
      options: state => state.demo.options,
      disabledOptions: state => state.demo.disabledOptions,
    }),
  },
  created () {},
  methods: {
    ...Vuex.mapActions([]),
    ...request.map(['getDemoTable']),
    getTableData (params) {
      return request.page('getDemoTable', params)
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
        request: this.getDemoTable,
        requestParams: this.search,
      })
    },
    onExportRows (id) {
      this.$export.xlsx(this.$route.meta.title, {
        request: (params) => request('exportDemoData', params),
        requestParams: {id},
        getResponseData (data) {
          // 导出大于一页时去掉标题行
          data.current_page > 1 && data.data.splice(0, 1)
          return data
        },
      })
    },
    onDelete (index, rows) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {type: 'warning'}).then(() => {
        request.common('deleteDemoData', {id: rows[index].id}).then(() => {
          this.$message.success('删除成功')
          rows.splice(index, 1)
        })
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },
    onDeleteMultiple () {
      this.$confirm(`此操作将永久删除此${this.multipleSelection.length}条数据, 是否继续?`, '提示', {type: 'warning'}).then(() => {
        request.common('deleteMultipleDemoData', {id: this.multipleSelection.map(_ => _.id)}).then(() => {
          this.$message.success('删除成功')
          this.multipleSelection.forEach((row) => {
            this.table.splice(this.table.indexOf(row), 1)
          })
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
