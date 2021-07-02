<template>
  <div class="sj-image-upload">
    <el-upload
      :show-file-list="false"
      drag
      action
      :before-upload="beforeUpload"
      v-bind="$attrs">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip"
           slot="tip">{{tip}}
      </div>
    </el-upload>
    <div ref="images"
         class="margin t10">
      <el-card v-for="(url, index) in images"
               :key="index"
               shadow="hover"
               class="sj-image-card"
               :style="'background-image: url('+ url|ossThumbnail(75, 'FFFFFF') +')'"
               :body-style="{ padding: '0', 'line-height': '0' }">
        <img
          v-show="false"
          :data-src="url|ossHost"
          :src="url|ossThumbnail(75, 'FFFFFF')"
          :alt="url|baseName"/>
        <span class="el-upload-list__item-actions">
        <span class="el-upload-list__item-preview">
          <i class="el-icon-zoom-in"
             @click="onView(index)"></i>
        </span>
        <span class="el-upload-list__item-delete">
          <i class="el-icon-delete"
             @click="onRemove(index)"></i>
        </span>
      </span>
      </el-card>
    </div>
  </div>
</template>

<script>
import 'viewerjs/dist/viewer.css'
import Viewer from 'viewerjs'

let viewer

export default {
  name: 'SjImageUpload',
  inheritAttrs: false,
  components: {},
  props: {
    value: {
      type: Array,
      default: [],
    },
    accept: {
      type: String,
      default: 'image/gif,image/jpeg,image/png,image/gif',
    },
    beforeUpload: {
      type: Function,
      default: (file) => {
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isLt2M) {
          ElementUI.Message.error('上传图片大小不能超过 2MB!')
        }
        return isLt2M
      },
    },
    tip: {
      type: String,
      default: '只能上传gif/jpg/png文件，且不超过2048kb',
    },
  },
  data () {
    return {
      views: {},
    }
  },
  computed: {
    images: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      },
    },
  },
  watch: {},
  created () {},
  updated () {
    if (viewer) {
      viewer.update()
    } else {
      viewer = new Viewer(this.$refs.images, {
        url: (image) => filter.ossAutoOrient(image.dataset.src),
      })
    }
  },
  mounted () {},
  destroyed () {
    viewer && viewer.destroy()
  },
  methods: {
    onRemove (index) {
      this.images.splice(index, 1)
    },
    onView (index) {
      viewer.view(index)
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
.sj-image-upload {
  .sj-image-card {
    display: inline-block;
    margin: 0 10px 10px 0;
    position: relative;
    width: 75px;
    height: 75px;
    // 把图像图像扩展至最大尺寸，以使其宽度和高度完全适应内容区域，并居中
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;

    .el-upload-list__item-actions {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      cursor: default;
      text-align: center;
      color: #fff;
      opacity: 0;
      font-size: 20px;
      background-color: rgba(0, 0, 0, .5);
      transition: opacity .3s;
      border-radius: 3px;

      span {
        display: none;
        cursor: pointer;
      }

      span + span {
        margin-left: 15px
      }

      &:hover {
        opacity: 1;

        span {
          display: inline-block;
        }
      }

      &::after {
        display: inline-block;
        content: "";
        height: 100%;
        vertical-align: middle;
      }
    }

    .el-upload-list__item-delete {
      position: static;
      font-size: inherit;
      color: inherit;
    }
  }
}
</style>
<style lang="scss"
       module>
// 带作用域的CSS
// 绑定class方式 <p :class="$style.red"></p>
// https://vue-loader.vuejs.org/zh-cn/features/css-modules.html
</style>
