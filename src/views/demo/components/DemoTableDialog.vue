<template>
  <el-dialog
    ref="dialog"
    title="DemoTableDialog"
    width="50%"
    :close-on-click-modal="false"
    v-bind="$attrs"
    v-on="$listeners"
    top="10vh"
    @close="onClose"
    @open="onOpen">
    <div v-loading="loading">
      <el-table :data="table"
                stripe
                highlight-current-row
                border
                style="width: 100%"
                :max-height="height"
                @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="39">
        </el-table-column>
        <el-table-column prop="id"
                         label="ID"
                         width="90"></el-table-column>
        <el-table-column prop="name"
                         label="名称"></el-table-column>
        <el-table-column prop="created_at"
                         label="更新时间"
                         width="160"></el-table-column>
      </el-table>
      <div style="margin-top: 10px;">
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
    </div>
    <span slot="footer"
          class="dialog-footer">
      <el-button @click="$refs.dialog.handleClose()">取 消</el-button>
      <el-button type="primary"
                 @click="onConfirm()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  components: {},
  props: {},
  data () {
    return {
      // 表格数据
      table: [],
      // 分页参数
      pagination: {
        current_page: 1,
        per_page: 20,
        total: 0,
      },
      // 已选择的行
      multipleSelection: [],
      // 加载
      loading: false
    }
  },
  computed: {
    // 表格高度
    height () {
      let height =
        document.body.clientHeight -
        54 - // dialog header
        42 - // pagination
        60 - // dialog body padding
        70 - // dialog footer
        50 - // dialog bottom
        document.body.clientHeight * 0.10 // dialog top
      if (height < 250) {
        height = 250
      }
      return height + 'px'
    }
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {
    /**
     * 打开弹窗
     */
    async onOpen () {
      this.loading = true
      await this.getTableData()
      this.loading = false
      this.$emit('open')
    },
    /**
     * 点击关闭
     */
    onClose () {
      Object.assign(this.$data, this.$options.data.call(this))
      this.$emit('close')
    },
    /**
     * 点击确认
     */
    onConfirm () {
      this.$refs.dialog.handleClose()
      this.$emit('confirm ')
    },
    /**
     * 获得表格的数据
     */
    async getTableData () {
      let {data} = await request.alert('getDemoTable')
      this.table = data.data
      this.pagination.per_page = Number(data.per_page)
      this.pagination.current_page = Number(data.per_page)
      this.pagination.total = Number(data.per_page)
    },
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
    /**
     * 处理选择的表格行
     * @param {*} val
     */
    handleSelectionChange (val) {
      this.multipleSelection = val
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
