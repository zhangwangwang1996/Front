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
      <template slot="header">图片信息读写</template>
      <div style="display: flex;">
        <div v-if="base64"
             style="padding-right: 20px;">
          <img :src="base64"
               alt=""
               width="100%">
        </div>
        <div style="width: 300px;">
          <el-form ref="form"
                   size="mini"
                   label-position="top">
            <el-form-item label="选择照片">
              <input type="file"
                     accept="image/jpeg,image/png,image/gif"
                     @change="changeFile"/>
            </el-form-item>
            <el-form-item label="拍摄日期">
              <el-date-picker
                v-model="form.datetime"
                type="datetime"
                format="yyyy:MM:dd HH:mm:ss"
                value-format="yyyy:MM:dd HH:mm:ss"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="拍摄经度">
              <el-input-number v-model="form.gpsLongitude"
                               :min="-180"
                               :max="180"
                               :controls="false"></el-input-number>
            </el-form-item>
            <el-form-item label="拍摄纬度">
              <el-input-number v-model="form.gpsLatitude"
                               :min="-180"
                               :max="180"
                               :controls="false"></el-input-number>
            </el-form-item>
            <el-form-item>
              <el-button type="primary"
                         @click="saveImage">下载图片
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </sj-panel>
  </div>
</template>

<script>
import piexif from 'piexifjs'
import PiexifHelper from './piexif-helper.js'
import FileSaver from 'file-saver'
import { base64ToBlob, blobToBase64 } from 'base64-blob'

export default {
  components: {},
  mixins: [],
  data () {
    return {
      base64: null,
      fileName: '',
      form: {
        datetime: null,
        gpsLongitude: null,
        gpsLatitude: null,
      },
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  destroyed () {},
  methods: {
    async changeFile (event) {
      let file = event.target.files[0]
      this.fileName = file.name
      if (file.type === 'image/jpeg') {
        let exif = piexif.load(await blobToBase64(file))
        // 阅读 info
        this.consoleExif(exif)
        this.setForm(exif)
      }
      // 经过 canvas 处理的图片，将会缺失exif信息
      let canvas = await this.canvasDrawImage(file)
      this.base64 = canvas.toDataURL('image/jpeg')
    },
    async saveImage () {
      // 重新写入exif信息到图片
      let base64 = piexif.insert(piexif.dump(this.createExif()), this.base64)
      let blob = await base64ToBlob(base64)
      FileSaver.saveAs(blob, this.fileName.substring(0, this.fileName.lastIndexOf('.')) + '.jpeg')
    },
    setForm (exif) {
      let helper = new PiexifHelper(exif)
      this.form.datetime = helper.DateTimeOriginal() || helper.DateTime()
      this.form.gpsLongitude = helper.GPSLongitude()
      this.form.gpsLatitude = helper.GPSLatitude()
    },
    createExif () {
      let helper = new PiexifHelper()
      helper.DateTimeOriginal(this.form.datetime)
      helper.DateTime(this.form.datetime)
      helper.GPSLongitude(this.form.gpsLongitude)
      helper.GPSLatitude(this.form.gpsLatitude)
      return helper.exif
    },
    canvasDrawImage (blob) {
      return new Promise((resolve, reject) => {
        let canvas = document.createElement('canvas')
        let ctx = canvas.getContext('2d')
        let img = new Image()
        img.onload = function () {
          canvas.width = img.width
          canvas.height = img.height
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
          resolve(canvas)
          URL.revokeObjectURL(blob)
        }
        img.src = URL.createObjectURL(blob)
      })
    },
    consoleExif (exif) {
      // 阅读 exif
      for (let ifd in exif) {
        if (exif.hasOwnProperty(ifd)) {
          if (ifd === 'thumbnail') {
            continue
          }
          console.log('-' + ifd)
          for (let tag in exif[ifd]) {
            if (exif[ifd].hasOwnProperty(tag)) {
              console.log('  ' + piexif.TAGS[ifd][tag]['name'] + ':', exif[ifd][tag])
            }
          }
        }
      }
    }
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
