<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    @close="onClose"
    top="40px"
    width="75%">
    <div style="margin: -20px -10px;">
      <video ref="video"
             autoplay
             playsinline
             controls>
        您的浏览器不支持 video 标签。
      </video>
    </div>
    <button ref="videoRotate"
            type="button"
            class="plyr__control"
            @click="onRotate">
      <svg role="presentation">
        <use xlink:href="#plyr-restart"></use>
      </svg>
      <span class="plyr__tooltip"
            role="tooltip">旋转90°</span>
    </button>
  </el-dialog>
</template>

<script>
import Plyr from 'plyr'
import 'plyr/dist/plyr.css'
// https://github.com/sampotts/plyr

export default {
  name: 'SjPlyrVideoBox',
  components: {},
  props: {
    file: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      visible: false,
      action: '',
      title: '',
    }
  },
  computed: {},
  watch: {
    visible (value) {
      if (value) {
        this.view()
      } else {
        this.player && this.player.pause()
      }
    }
  },
  created () {},
  mounted () {
    this.$refs.video && this.init()
  },
  updated () {
    this.$refs.video && this.init()
  },
  destroyed () {
    this.player && this.player.destroy()
  },
  methods: {
    handleAction (action) {
      this.action = action
      this.doClose()
    },
    onClose () {
      if (!this.visible) return
      this.handleAction('close')
    },
    doClose () {
      if (!this.visible) return
      this.visible = false
      setTimeout(() => {
        if (this.action) this.callback(this.action, this)
      })
    },
    init () {
      if (this.player) return
      this.player = new Plyr(this.$refs.video, {
        tooltips: {controls: true},
        volume: 10,
        disableContextMenu: false,
        controls: [
          'play-large',
          // 'restart',
          // 'rewind',
          'play',
          // 'fast-forward',
          'progress',
          'current-time',
          'mute',
          'volume',
          // 'captions',
          'settings',
          'pip',
          'airplay',
          'download',
          'fullscreen',
        ],
        i18n: {
          play: '播放',
          pause: '暂停',
          mute: '静音',
          unmute: '取消静音',
          download: '下载',
          enterFullscreen: '全屏',
          exitFullscreen: '退出全屏',
          pip: '画中画',
          settings: '设置',
          speed: '速度',
          normal: '正常',
        },
      })
      this.player.on('ready', event => {
        this.player.rotateAngle = 0
        $('.plyr__controls', this.$el).append(this.$refs.videoRotate)
      })
      this.view()
    },
    view () {
      if (!this.player) return
      this.$nextTick(() => {
        this.ratio()
        this.player.source = {
          type: 'video',
          sources: [
            {
              src: filter.ossConvertMP4(this.file.src),
              type: 'video/mp4',
            },
            {
              src: filter.ossHost(this.file.src),
              type: 'video/mp4',
            }
          ],
          poster: this.file.poster,
        }
        this.player.play()
        // 控制视频的高度
        $('video', this.$el).add('.plyr', this.$el).height(document.body.clientHeight - 165)
      })
    },
    ratio () {
      this.player.ratio = `${$(this.$refs.content).width()}:${$(this.$refs.content).height()}`
    },
    onRotate () {
      // 顺时针旋转90°
      this.player.rotateAngle += 90
      // 重置旋转角度
      if (this.player.rotateAngle === 360) {
        this.player.rotateAngle = 0
      }
      let video = $('video', this.$el)
      // 需要旋转
      if (this.player.rotateAngle) {
        let width = video.width()
        let height = video.height()
        // 旋转后需要偏移位置
        let translate = ''
        if (this.player.rotateAngle === 90) {
          translate = `translate(${width}px)`
        }
        if (this.player.rotateAngle === 180) {
          translate = `translate(${height}px, ${width}px)`
        }
        if (this.player.rotateAngle === 270) {
          translate = `translate(0px, ${height}px)`
        }
        // 实现旋转
        video.css({
          width: height + 'px',
          height: width + 'px',
          transform: `${translate} rotate(${this.player.rotateAngle}deg)`,
          transformOrigin: 'left top',
        })
      } else {
        video.removeAttr('style')
      }
    },
  },
}
</script>
<style lang="scss">
// 全局作用域的CSS
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
