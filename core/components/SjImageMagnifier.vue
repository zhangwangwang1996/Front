<template>
  <el-popover trigger="hover"
              v-bind="$attrs"
              v-on="$listeners">
    <div :style="{width: width + 'px',height: height + 'px','position': 'relative','overflow': 'hidden'}">
      <img :src="src"
           alt="暂无"
           :style="bigImageStyle">
    </div>
    <div slot="reference"
         ref="imgContainer"
         @mouseenter="onMouseenter"
         @mousemove="onMousemove"
         @mouseleave="onMouseleave"
         class="sj-image-magnifier-img-container">
      <div class="sj-image-magnifier-selected-img-area"
           v-show="showMagnifier"
           :style="{left:left+'px',top: top+'px',width:selectedAreaSize.width+'px',height:selectedAreaSize.height+'px'}"></div>
      <slot>
      </slot>
    </div>
  </el-popover>
</template>

<script>
export default {
  name: 'SjImageMagnifier',
  props: {
    zoom: {
      type: Number,
      default: 2
    },
    width: {
      type: Number,
      default: 200
    },
    height: {
      type: Number,
      default: 200
    },
  },
  data () {
    return {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      src: null,
      showMagnifier: false,
      container: {},
      ImageSize: {
        width: null,
        height: null,
      },
    }
  },
  computed: {
    bigImageStyle () {
      return {
        position: 'absolute',
        left: -this.left * this.zoom + 'px',
        top: -this.top * this.zoom + 'px',
        width: this.ImageSize.width * this.zoom + 'px',
        height: this.ImageSize.height * this.zoom + 'px',
      }
    },
    selectedAreaSize () {
      return {
        width: this.width / parseFloat(this.bigImageStyle.width) * this.ImageSize.width,
        height: this.height / parseFloat(this.bigImageStyle.height) * this.ImageSize.height
      }
    },
  },
  watch: {},
  created () {},
  mounted () {
    this.container = this.$refs.imgContainer.getBoundingClientRect()
  },
  destroyed () {},
  methods: {
    onMouseenter () {
      let image = this.$slots.default[0]
      this.ImageSize.width = parseFloat(image.elm.clientWidth)
      this.ImageSize.height = parseFloat(image.elm.clientHeight)
      this.src = image.child ? image.child.src : image.data.attrs.src
    },
    onMousemove (event) {
      let {left, top, right, bottom} = this.getBoundingMagnifierRect(event)
      this.left = left
      this.top = top
      this.right = right
      this.bottom = bottom
      this.showMagnifier = true
    },
    onMouseleave () {
      this.showMagnifier = false
    },
    getBoundingMagnifierRect (event) {
      // 容器
      let container = this.$refs.imgContainer.getBoundingClientRect()
      // 容器内鼠标位置
      let x = event.clientX - container.left
      let y = event.clientY - container.top
      // 放大镜宽高
      let magnifierWidth = this.selectedAreaSize.width
      let magnifierHeight = this.selectedAreaSize.height
      // 放大镜位置
      let left = x - magnifierWidth / 2
      let right = x + magnifierWidth / 2
      let top = y - magnifierHeight / 2
      let bottom = y + magnifierHeight / 2
      // 判断放大镜边界位置
      left = left < 0 ? 0 : right > container.width ? container.width - magnifierWidth : left
      top = top < 0 ? 0 : bottom > container.height ? container.height - magnifierHeight : top
      return {
        left,
        top,
        right: left + magnifierWidth,
        bottom: top + magnifierHeight,
      }
    }
  }
}
</script>

<style lang="scss"
       scoped>
.sj-image-magnifier-img-container {
  position: relative;
  display: inline-block;

  .sj-image-magnifier-selected-img-area {
    position: absolute;
    top: 0;
    left: 0;
    /*display: none;*/
    background-color: #2d2f33;
    cursor: move;
    opacity: 0.4;
    z-index: 2000;
  }
}
</style>
