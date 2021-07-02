<template>
  <el-dialog
    custom-class="sj-export-dialog"
    :title="title"
    :visible.sync="visible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="onClose"
    width="380px">
    <div v-loading="loading">
      <p class="sj-file-name">{{fileName}}.xlsx</p>
      <el-progress :text-inside="true"
                   :stroke-width="18"
                   :percentage="percentage2decimal"
                   :status="progressStatus"></el-progress>
    </div>
    <span slot="footer">
      <template v-if="loading">
        <span class="sj-export-alert">正在查找数据中……</span>
        <el-button size="small"
                   @click="onClose()">取 消</el-button>
      </template>
      <template v-else>
        <template v-if="total > 0">
          <span v-show="status === ''">
            <span class="sj-export-alert">本次将导出{{total}}条数据</span>
            <el-button type="primary"
                       size="small"
                       @click="start()">开 始</el-button>
          </span>
          <span v-show="status === 'loading'">
            <span class="sj-export-alert">从服务器获取数据中，请不要关闭页面！</span>
            <el-button size="small"
                       @click="onClose()">取 消</el-button>
          </span>
          <span v-show="status === 'error' && !retryTotal">
            <span class="sj-export-alert">获取服务器数据发生了错误。</span>
            <el-button type="danger"
                       size="small"
                       @click="retry()">重 试</el-button>
          </span>
          <span v-show="status === 'error' && retryTotal">
            <span class="sj-export-alert">获取服务器数据再次发生了错误。</span>
            <el-button type="warning"
                       size="small"
                       @click="jump()">跳 过</el-button>
            <el-button type="danger"
                       size="small"
                       @click="retry()">继续重试</el-button>
          </span>
          <span v-show="status === 'end'">
            <span class="sj-export-alert">数据已获取完毕，请点击下载获得Excel文件</span>
            <el-button type="success"
                       size="small"
                       @click="download()">
              <span v-if="isDownload">已下载</span>
              <span v-else>下 载</span>
            </el-button>
          </span>
        </template>
        <template v-else>
          <span class="sj-export-alert">没有找到导出的数据，请稍候重试。</span>
          <el-button size="small"
                     @click="onClose()">关 闭</el-button>
        </template>
      </template>
    </span>
  </el-dialog>
</template>

<script>
import TweenLite from 'gsap/TweenLite'
import moment from 'moment'
import xlsx from './xlsx'

export default {
  name: 'SjExportXlsxBox',
  components: {},
  props: {},
  data () {
    return {
      loading: false,
      visible: false,
      action: '',
      title: '导出EXCEL文件',
      status: '',
      retryTotal: 0,
      isDownload: false,
      percentage: 0,
      // 可控参数
      total: 0,
      name: 'unnamed',
      data: [],
    }
  },
  computed: {
    totalPage () {
      return Math.ceil(this.total / this.perPage)
    },
    fileName () {
      return this.name + '-' + moment().format('YYMMDD') + 'T' + this.total
    },
    percentage2decimal () {
      return parseInt(this.percentage * 100)
    },
    progressStatus () {
      switch (this.status) {
        case 'error':
          return 'exception'
        case 'end':
          return 'success'
      }
    },
  },
  watch: {
    data () {
      let percentage = 0
      if (this.total > 0) {
        percentage = this.data.length / this.total
        if (percentage > 1) {
          percentage = 1
        }
      }
      TweenLite.to(this.$data, 0.2, {percentage})
    },
  },
  created () {},
  mounted () {},
  destroyed () {},
  methods: {
    handleAction (action) {
      this.action = action
      this.doClose()
    },
    doClose () {
      if (!this.visible) return
      setTimeout(() => {
        if (this.action) this.callback(this.action, this)
        Object.assign(this.$data, this.$options.data())
      })
    },
    onClose () {
      // 直接结束下载
      if (!this.total || !this.data.length) {
        return this.handleAction('close')
      }
      // 数据已获取完成
      if (this.isDownload) {
        this.handleAction('close')
      } else {
        this.$confirm('确认终止导出数据吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.handleAction('close')
        })
      }
    },
    getTotal () {
      this.loading = true
      this.request({
        ...this.requestParams,
        [this.currentPageField]: 1,
        [this.perPageField]: 1,
      }).then(({data}) => {
        this.total = data.total
        this.loading = false
      })
    },
    requestData () {
      this.request({
        ...this.requestParams,
        [this.currentPageField]: this.currentPage,
        [this.perPageField]: this.perPage,
      }).then(({data}) => {
        if (this.status === 'loading') {
          // 获得响应
          data = this.responseData(data)
          // push 数据
          this.data.push.apply(this.data, data.data)
          // 数据总量是0条
          if (!this.total) {
            this.status = 'end'
            return false
          }
          // 全部加载完成
          if (this.currentPage === this.totalPage) {
            this.status = 'end'
            return false
          }
          // 继续加载
          this.currentPage++
          this.requestData()
        }
      }, () => {
        this.status = 'error'
      })
    },
    start () {
      this.requestData()
      this.status = 'loading'
    },
    retry () {
      this.retryTotal++
      this.start()
    },
    jump () {
      this.retryTotal = 0
      this.currentPage++
      this.start()
    },
    getHeader () {
      let props = []
      let labels = []
      if (this.header && this.header.length) {
        this.header.forEach((value) => {
          props.push(value[this.headerModel.prop])
          labels.push(value[this.headerModel.label])
        })
      }
      return {props, labels}
    },
    getData () {
      if (this.header && this.header.length) {
        this.header.forEach((value) => {
          if (value.hasOwnProperty('formatter') && _.isFunction(value.formatter)) {
            this.data.forEach((row) => {
              _.set(row, value[this.headerModel.prop], value.formatter(row))
            })
          }
        })
      }
      return this.data
    },
    download () {
      let data = []
      // 数据模式 第一行是表头
      if (this.data[0].constructor === Array) {
        data = this.data
      }
      if (this.data[0].constructor === Object) {
        // 获得表格 header
        let header = this.getHeader()
        // 转换 object 为 array
        data = xlsx.ArrayObjectsToArrays(this.getData(), header.props)
        // 置入 header
        header.labels.length && (data[0] = header.labels)
      }
      xlsx.exportXlsx(data, {fileName: this.fileName})
      this.isDownload = true
    },
  },
}
</script>
<style lang="scss">
// 全局CSS
.sj-export-dialog {
  .el-dialog__body {
    padding: 0px 20px 15px;
  }

  .el-dialog__footer {
    padding: 15px 20px;
  }
}
</style>
<style lang="scss"
       scoped>
// 带作用域的CSS
// https://vue-loader.vuejs.org/zh-cn/features/scoped-css.html
.sj-file-name {
  font-size: 12px;
  display: block; /*内联对象需加*/
  word-break: keep-all; /* 不换行 */
  white-space: nowrap; /* 不换行 */
  overflow: hidden; /* 内容超出宽度时隐藏超出部分的内容 */
  text-overflow: ellipsis; /* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
  width: 340px; /* 长度限制 */
}

.sj-export-alert {
  font-size: 10px;
  color: #f56c6c;
  float: left;
  line-height: 32px;
}
</style>
<style lang="scss"
       module>
// 带作用域的CSS
// 绑定class方式 <p :class="$style.red"></p>
// https://vue-loader.vuejs.org/zh-cn/features/css-modules.html
</style>
