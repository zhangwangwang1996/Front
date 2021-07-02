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
      <template slot="header"></template>
      <el-form label-width="100px">
        <el-form-item label="倍数">
          <el-input v-model="zoom"></el-input>
        </el-form-item>
        <el-form-item label="放大镜宽度">
          <el-input v-model="width"></el-input>
        </el-form-item>
        <el-form-item label="放大镜高度">
          <el-input v-model="height"></el-input>
        </el-form-item>
      </el-form>
      <div style="display: inline-block;">
        <div style="font-size: xx-large;text-align: center">img标签</div>
        <sj-image-magnifier :zoom="zoom"
                            :width="width"
                            :height="height"
                            placement="right">
          <img :src="src|ossThumbnail(300, 'FFFFFF')">
        </sj-image-magnifier>
      </div>
      <div style="display: inline-block;">
        <div style="font-size: xx-large;text-align: center">el-image标签</div>
        <sj-image-magnifier :zoom="zoom"
                            :width="width"
                            :height="height">
          <el-image :src="src|ossThumbnail(300, 'FFFFFF')">
          </el-image>
        </sj-image-magnifier>
      </div>
    </sj-panel>
  </div>
</template>

<script>
import SjImageMagnifier from '@core/components/SjImageMagnifier'

export default {
  components: {SjImageMagnifier},
  data () {
    return {
      src: 'http://sjpublicdev.oss-cn-hangzhou.aliyuncs.com/ajx/2/audit/20128/20191219/1576743015_1084_555231.jpeg',
      zoom: 2,
      width: 150,
      height: 150
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  destroyed () {},
  methods: {}
}
</script>

<style scoped>

</style>
