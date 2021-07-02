<template>
  <div v-title="$route.meta.title">
    <div class="page-heading">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
        <el-breadcrumb-item to="/imag-brower/table">imagBrower列表</el-breadcrumb-item>
        <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <sj-panel>
      <template slot="header">{{$route.meta.title}}</template>
      <el-table :data="table"
                stripe
                highlight-current-row
                :show-header="false"
                class="margin b15"
                style="width: 100%">
        <el-table-column width="150">
          <template slot-scope="scope">
            <b>{{scope.row.label}}</b>
          </template>
        </el-table-column>
        <el-table-column min-width="150">
          <template slot-scope="scope">
            <div>{{scope.row.value}}</div>
          </template>
        </el-table-column>
      </el-table>
      <router-link :to="`/imag-brower/update/${id}`">
        <el-button type="primary"
                   size="small">修 改
        </el-button>
      </router-link>
    </sj-panel>
  </div>
</template>

<script>
import imagBrowerMixins from '../imag-brower.mixins'

export default {
  components: {},
  mixins: [imagBrowerMixins],
  data () {
    return {
      id: null,
      table: [],
    }
  },
  computed: Vuex.mapState({}),
  created () {
    this.id = this.$route.params.id
    this.id > 0 && this.setDetailData(this.id)
  },
  methods: {
    ...Vuex.mapActions([]),
    setDetailData (id) {
      request.page('getImagBrowerDetail', {id}).then(({data}) => {
        this.fields.forEach(({prop, label, formatter}) => {
          this.table.push({
            prop,
            label,
            value: formatter ? formatter(data) : _.get(data, prop, ''),
          })
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
