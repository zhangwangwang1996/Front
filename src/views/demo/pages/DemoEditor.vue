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
      <template slot="header">tinymce</template>
      <h3>tinymce-vue <a href="https://github.com/tinymce/tinymce-vue">https://github.com/tinymce/tinymce-vue</a></h3>
      <h3>tinymce <a href="https://github.com/tinymce/tinymce">https://github.com/tinymce/tinymce</a></h3>
      <h3>可用集成工具 <a href="https://www.tiny.cloud/docs/advanced/editor-control-identifiers/#toolbarcontrols">https://www.tiny.cloud/docs/advanced/editor-control-identifiers/#toolbarcontrols</a>
      </h3>
      <editor :init="init"
              v-model="content"
              style="height: 350px;"></editor>
      <h3>常用配置</h3>
      <demo-light-editor v-model="content"></demo-light-editor>
    </sj-panel>
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
import DemoLightEditor from '../components/DemoLightEditor'

export default {
  components: {
    DemoLightEditor,
    'editor': Editor,
  },
  mixins: [],
  data () {
    return {
      content: '<h2>Hello World！</h2>',
      init: {
        // 可用集成插件列表 https://www.tiny.cloud/docs/plugins/
        plugins: `advlist anchor autolink autosave code codesample
        colorpicker colorpicker contextmenu directionality emoticons
        fullscreen hr image imagetools insertdatetime link lists
        media nonbreaking noneditable pagebreak paste preview print
        save searchreplace spellchecker tabfocus table template
        textcolor textpattern visualblocks visualchars wordcount`,
        // 可用集成工具列表 https://www.tiny.cloud/docs/advanced/editor-control-identifiers/#toolbarcontrols
        toolbar: [
          `searchreplace bold italic underline strikethrough alignleft
          aligncenter alignright outdent indent  blockquote undo redo
          removeformat subscript superscript code codesample`,
          `hr bullist numlist link image charmap preview anchor
          pagebreak insertdatetime media table emoticons forecolor backcolor fullscreen`,
        ],
        language_url: '/static/tinymce/langs/zh_CN.js',
        language: 'zh_CN',
        // 图片与文件上传 https://www.tiny.cloud/docs/configure/file-image-upload/
        images_upload_handler: this.imagesUploadHandler,
      },
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  destroyed () {},
  methods: {
    imagesUploadHandler (blobInfo, success, failure) {
      let formData = new FormData()
      formData.append('file', blobInfo.blob(), blobInfo.filename())
      request('uploadDemoImage').then(({data}) => {
        success(data.url)
      }).catch((error) => {
        failure(error.toString())
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
