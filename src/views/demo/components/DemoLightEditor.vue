<template>
  <editor :init="init"
          style="height: 350px;"
          v-bind="$attrs"></editor>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'

export default {
  inheritAttrs: false,
  components: {
    'editor': Editor,
  },
  mixins: [],
  data () {
    return {
      content: '<h2>Hello World！</h2>',
      init: {
        // 可用集成插件列表 https://www.tiny.cloud/docs/plugins/
        plugins: `advlist autolink code
        colorpicker colorpicker contextmenu directionality
        fullscreen hr image imagetools link lists
        nonbreaking noneditable pagebreak paste preview
        save searchreplace tabfocus table
        textcolor textpattern visualblocks visualchars wordcount`,
        toolbar: [
          `
          bold italic underline strikethrough alignleft
          aligncenter alignright outdent indent  blockquote
          removeformat
          `,
          `
          forecolor backcolor formatselect
          hr bullist numlist link image charmap fullscreen
          `,
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
