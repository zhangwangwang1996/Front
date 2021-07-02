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
      <template slot="header">图片上传</template>
      <sj-image-upload v-model="images"
                       :multiple="true"
                       :http-request="onUpload"></sj-image-upload>
    </sj-panel>
  </div>
</template>

<script>
import SjImageUpload from '@core/components/SjImageUpload'

export default {
  components: {
    SjImageUpload,
  },
  mixins: [],
  data () {
    return {
      images: [
        'https://slicejobsmisc.oss-cn-shanghai.aliyuncs.com/prod/imgr/product/zan-wu-tu-pian-0-20180424_160209_976990.png',
        'https://slicejobsmisc.oss-cn-shanghai.aliyuncs.com/prod/imgr/product/zan-wu-tu-pian-0-20180424_160209_976990.png',
      ],
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  destroyed () {},
  methods: {
    onUpload (object) {
      let formData = new FormData()
      formData.append('file', object.file)
      request.alert('uploadDemoImage', formData).then(({data}) => {
        this.images.push(data.url)
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
