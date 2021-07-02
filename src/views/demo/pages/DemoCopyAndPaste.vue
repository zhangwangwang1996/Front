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
      <template slot="header">复制的实现</template>
      <el-input v-model="copyText"
                style="width: 300px;"></el-input>
      <el-button ref="copy">复制</el-button>
    </sj-panel>
    <sj-panel>
      <template slot="header">粘贴的实现</template>
      <p>MDN文献：<a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/paste_event">/Element/paste_event</a>
      <p>
        相关问答：<a href="https://stackoverflow.com/questions/2176861/javascript-get-clipboard-data-on-paste-event-cross-browser">javascript-get-clipboard-data-on-paste-event-cross-browser"</a>
      </p>
      <p>在当前页面直接粘贴，以下是粘贴的内容</p>
      <div class="color-info">{{pasteText}}</div>
    </sj-panel>
  </div>
</template>

<script>
import ClipboardJS from 'clipboard'

let clipboard
export default {
  components: {},
  mixins: [],
  data () {
    return {
      copyText: '这里的文字将会被复制',
      pasteText: '',
    }
  },
  computed: {},
  watch: {},
  created () {
    document.addEventListener('paste', this.paste)
  },
  mounted () {
    clipboard = new ClipboardJS(this.$refs.copy.$el, {
      text: () => this.copyText,
    })
    clipboard.on('success', () => {
      this.$message({
        message: '复制成功！',
        type: 'success',
      })
    })
    clipboard.on('error', () => {
      this.$message({
        message: '复制失败，请手动选择复制！',
        type: 'error',
      })
    })
  },
  destroyed () {
    clipboard.destroy()
    document.removeEventListener('paste', this.paste)
  },
  methods: {
    paste (event) {
      event.stopPropagation()
      event.preventDefault()

      this.pasteText = (event.clipboardData || window.clipboardData).getData('text')
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
