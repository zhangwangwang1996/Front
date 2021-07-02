<template>
  <transition name="viewer-fade">
    <div tabindex="-1" ref="el-image-viewer__wrapper" class="el-image-viewer__wrapper" :style="{ 'z-index': zIndex }">
      <div>
      <div class="el-image-viewer__mask"></div>
      <!-- CLOSE -->
      <span class="el-image-viewer__btn el-image-viewer__close" @click="hide">
        <i class="el-icon-circle-close"></i>
      </span>
      <!-- ARROW -->
      <template v-if="!isSingle">
        <span
          class="el-image-viewer__btn el-image-viewer__prev"
          :class="{ 'is-disabled': !infinite && isFirst }"
          @click="prev">
          <i class="el-icon-arrow-left"/>
        </span>
        <span
          class="el-image-viewer__btn el-image-viewer__next"
          :class="{ 'is-disabled': !infinite && isLast }"
          @click="next">
          <i class="el-icon-arrow-right"/>
        </span>
      </template>
      <!-- ACTIONS -->
      <div class="el-image-viewer__btn el-image-viewer__actions">
        <div class="el-image-viewer__actions__inner">
          <i class="el-icon-zoom-out" @click="handleActions('zoomOut')"></i>
          <i class="el-icon-zoom-in" @click="handleActions('zoomIn')"></i>
          <i class="el-image-viewer__actions__divider"></i>
          <i :class="mode.icon" @click="toggleMode"></i>
          <i class="el-image-viewer__actions__divider"></i>
          <i class="el-icon-refresh-left" @click="handleActions('anticlocelise')"></i>
          <i class="el-icon-refresh-right" @click="handleActions('clocelise')"></i>
        </div>
      </div>
      <!-- CANVAS -->
      <div class="el-image-viewer__canvas "  v-for="(url, i) in urlList"
           v-if="i === index">
        <div><img
          ref="img"
          class="el-image-viewer__img"
          :key="url"
          :src="currentImg"
          @load="handleImgLoad"
          @error="handleImgError"
          @mousedown="handleMouseDown">
        </div>
      </div>
    </div>
      <div class="im_show_pic_modal_right" >
        <p>年轻微笑的女人带着手提箱坐在车上Young smiling</p>
        <div class="im_show_pic_modal_right_info">
          <div class="im_show_pic_modal_right_info_item">
            <span>编号：</span>
            <span>wadwawawafefefeaf</span>
          </div>
          <div class="im_show_pic_modal_right_info_item">
            <span>图片大小</span>
            <span>500kb</span>
          </div>
          <div class="im_show_pic_modal_right_info_item">
            <span>作者</span>
            <span>wadwawawafefefeaf</span>
            <div class="im_show_pic_modal_right_info_item">
              <span>下载链接</span>
              <span><a href="">123</a></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { on, off } from 'element-ui/src/utils/dom'
import { rafThrottle, isFirefox } from 'element-ui/src/utils/util'

const Mode = {
  CONTAIN: {
    name: 'contain',
    icon: 'el-icon-full-screen'
  },
  ORIGINAL: {
    name: 'original',
    icon: 'el-icon-c-scale-to-original'
  }
}

const mousewheelEventName = isFirefox() ? 'DOMMouseScroll' : 'mousewheel'

export default {
  name: 'elImageViewer',

  props: {
    urlList: {
      type: Array,
      default: () => []
    },
    zIndex: {
      type: Number,
      default: 2000
    },
    onSwitch: {
      type: Function,
      default: () => {}
    },
    onClose: {
      type: Function,
      default: () => {}
    },
    initialIndex: {
      type: Number,
      default: 0
    }
  },

  data () {
    return {
      index: this.initialIndex,
      isShow: false,
      infinite: true,
      loading: false,
      mode: Mode.CONTAIN,
      transform: {
        scale: 1,
        deg: 0,
        offsetX: 0,
        offsetY: 0,
        enableTransition: false
      }
    }
  },
  computed: {
    isSingle () {
      return this.urlList.length <= 1
    },
    isFirst () {
      return this.index === 0
    },
    isLast () {
      return this.index === this.urlList.length - 1
    },
    currentImg () {
      return this.urlList[this.index]
    },
    imgStyle () {
      const {scale, deg, offsetX, offsetY, enableTransition} = this.transform
      const style = {
        transform: `scale(${scale}) rotate(${deg}deg)`,
        transition: enableTransition ? 'transform .3s' : '',
        'margin-left': `${offsetX}px`,
        'margin-top': `${offsetY}px`
      }
      if (this.mode === Mode.CONTAIN) {
        style.maxWidth = style.maxHeight = '100%'
      }
      return style
    }
  },
  watch: {
    index: {
      handler: function (val) {
        this.reset()
        this.onSwitch(val)
      }
    },
    currentImg (val) {
      this.$nextTick(_ => {
        const $img = this.$refs.img[0]
        if (!$img.complete) {
          this.loading = true
        }
      })
    }
  },
  methods: {
    hide () {
      this.deviceSupportUninstall()
      this.onClose()
    },
    deviceSupportInstall () {
      this._keyDownHandler = rafThrottle(e => {
        const keyCode = e.keyCode
        switch (keyCode) {
          // ESC
          case 27:
            this.hide()
            break
          // SPACE
          case 32:
            this.toggleMode()
            break
          // LEFT_ARROW
          case 37:
            this.prev()
            break
          // UP_ARROW
          case 38:
            this.handleActions('zoomIn')
            break
          // RIGHT_ARROW
          case 39:
            this.next()
            break
          // DOWN_ARROW
          case 40:
            this.handleActions('zoomOut')
            break
        }
      })
      this._mouseWheelHandler = rafThrottle(e => {
        const delta = e.wheelDelta ? e.wheelDelta : -e.detail
        if (delta > 0) {
          this.handleActions('zoomIn', {
            zoomRate: 0.015,
            enableTransition: false
          })
        } else {
          this.handleActions('zoomOut', {
            zoomRate: 0.015,
            enableTransition: false
          })
        }
      })
      on(document, 'keydown', this._keyDownHandler)
      on(document, mousewheelEventName, this._mouseWheelHandler)
    },
    deviceSupportUninstall () {
      off(document, 'keydown', this._keyDownHandler)
      off(document, mousewheelEventName, this._mouseWheelHandler)
      this._keyDownHandler = null
      this._mouseWheelHandler = null
    },
    handleImgLoad (e) {
      this.loading = false
    },
    handleImgError (e) {
      this.loading = false
      e.target.alt = '加载失败'
    },
    handleMouseDown (e) {
      if (this.loading || e.button !== 0) return

      const {offsetX, offsetY} = this.transform
      const startX = e.pageX
      const startY = e.pageY
      this._dragHandler = rafThrottle(ev => {
        this.transform.offsetX = offsetX + ev.pageX - startX
        this.transform.offsetY = offsetY + ev.pageY - startY
      })
      on(document, 'mousemove', this._dragHandler)
      on(document, 'mouseup', ev => {
        off(document, 'mousemove', this._dragHandler)
      })

      e.preventDefault()
    },
    reset () {
      this.transform = {
        scale: 1,
        deg: 0,
        offsetX: 0,
        offsetY: 0,
        enableTransition: false
      }
    },
    toggleMode () {
      if (this.loading) return

      const modeNames = Object.keys(Mode)
      const modeValues = Object.values(Mode)
      const index = modeValues.indexOf(this.mode)
      const nextIndex = (index + 1) % modeNames.length
      this.mode = Mode[modeNames[nextIndex]]
      this.reset()
    },
    prev () {
      if (this.isFirst && !this.infinite) return
      const len = this.urlList.length
      this.index = (this.index - 1 + len) % len
    },
    next () {
      if (this.isLast && !this.infinite) return
      const len = this.urlList.length
      this.index = (this.index + 1) % len
    },
    handleActions (action, options = {}) {
      if (this.loading) return
      const {zoomRate, rotateDeg, enableTransition} = {
        zoomRate: 0.2,
        rotateDeg: 90,
        enableTransition: true,
        ...options
      }
      const {transform} = this
      switch (action) {
        case 'zoomOut':
          if (transform.scale > 0.2) {
            transform.scale = parseFloat((transform.scale - zoomRate).toFixed(3))
          }
          break
        case 'zoomIn':
          transform.scale = parseFloat((transform.scale + zoomRate).toFixed(3))
          break
        case 'clocelise':
          transform.deg += rotateDeg
          break
        case 'anticlocelise':
          transform.deg -= rotateDeg
          break
      }
      transform.enableTransition = enableTransition
    },
    async load (url) {
      await this.loadImage(url)
      this.loading = false
    },
    loadImage (url) {
      let imag = new Image()
      imag.src = url
      return new Promise((resolve) => {
        imag.onload = function () {
          resolve(imag)
        }
      })
    }
  },
  mounted () {
    this.deviceSupportInstall()
    // add tabindex then wrapper can be focusable via Javascript
    // focus wrapper so arrow key can't cause inner scroll behavior underneath
    this.$refs['el-image-viewer__wrapper'].focus()
  }
}
</script>
<style lang="scss" scoped>
.im_show_pic_modal {
  right: 0px;
  height: 100%;
  width: 300px;
  .ant-modal-body {
    display: flex;
    justify-content: space-between;
  }

  &_right {
    padding: 0;
    background: white;
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 300px;
    height: 100%;
    right: 0px;
    margin: 0 ;
    &_btn {
      width: 100%;
      margin-top: 1rem;
      display: flex;
      justify-content: flex-end;
      button {
        margin-right: 0.4rem;
      }
    }
    &_info {
      padding: 0.5rem;
      width: 100%;
      border-radius: 3px;
      &_item {
        line-height: 2;
        span:first-child {
          color: #8b8b8b;
          margin-right: 1rem;
          width: 3.8rem;
          display: inline-block;
          text-align: right;
        }
        span:last-child {
          color: #222222;
        }
      }
    }
    p {
      font-size: 1.2rem;
      color: #222;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      margin-bottom: 0.5rem;
    }
  }
}
.el-image-viewer__mask{
  position:absolute;
  width:100%;
  height:100%;
  top:0;
  left:0;
  opacity:.5;
  background:#000;
}
.el-image-viewer__canvas{
  width:calc(100vw - 300px);
  height:100%;
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  -webkit-box-pack:center;
  -ms-flex-pack:center;
  justify-content:center;
  -webkit-box-align:center;
  -ms-flex-align:center;
  align-items:center
}
.el-image-viewer__next{
  -webkit-transform:translateY(-50%);transform:translateY(-50%);
  right:340px;text-indent:2px}
</style>
