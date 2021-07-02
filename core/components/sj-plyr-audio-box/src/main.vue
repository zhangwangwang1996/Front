<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    @close="onClose"
    width="500px">
    <div style="margin: -20px -10px;">
      <audio ref="audio"
             :src="src"
             controls
             autoplay>
        您的浏览器不支持 audio 标签。
      </audio>
    </div>
    <button ref="audioPip"
            style="display: inline-block;"
            class="plyr__controls__item plyr__control"
            type="button"
            data-plyr="pip"
            @click="audioPip">
      <svg role="presentation"
           focusable="false">
        <use xlink:href="#plyr-pip"></use>
      </svg>
      <span class="plyr__tooltip">画中画</span>
    </button>
  </el-dialog>
</template>

<script>
import Plyr from 'plyr'
import 'plyr/dist/plyr.css'
import musicIcon from '../img/music-icon.svg'
// https://github.com/sampotts/plyr

export default {
  name: 'SjPlyrAudioBox',
  components: {},
  props: {
    file: Object
  },
  data () {
    return {
      visible: false,
      action: '',
      title: '',
    }
  },
  computed: {
    src () {
      return this.file ? filter.ossHost(this.file.src) : ''
    }
  },
  watch: {
    visible (value) {
      if (this.player) {
        if (value) {
          this.player.currentTime = 0
          this.player.play()
        } else {
          this.player && this.player.pause()
        }
      }
    }
  },
  created () {},
  mounted () {
    this.$refs.audio && this.init()
  },
  updated () {
    this.$refs.audio && this.init()
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
      this.player = new Plyr(this.$refs.audio, {
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
          pip: '画中画',
          settings: '设置',
          speed: '速度',
          normal: '正常',
        },
      })
      this.player.on('ready', event => {
        if (navigator.userAgent.indexOf('Chrome') > -1) {
          $('.plyr__controls', this.$el).append(this.$refs.audioPip)
        } else {
          this.$refs.audioPip.remove()
        }
      })
    },
    async audioPip () {
      this.player.pause()
      if (!this.playAudio) {
        await this.pictureInPicture()
      }
      this.playAudio()
    },
    /**
     * 音频画中画实现
     * 参考：https://googlechrome.github.io/samples/picture-in-picture/audio-playlist
     * 次要参考：https://blog.arnellebalane.com/the-picture-in-picture-api-30415372009f
     */
    async pictureInPicture () {
      let media = this.player.media
      let audio = document.createElement('audio')

      /* Picture-in-Picture Canvas */

      const canvas = document.createElement('canvas')
      canvas.width = canvas.height = 512

      /* Picture-in-Picture Video */

      const video = document.createElement('video')
      video.srcObject = canvas.captureStream()
      video.muted = true

      video.addEventListener('leavepictureinpicture', () => {
        audio.pause()
        if (media && media.src === audio.src) {
          media.currentTime = audio.currentTime
          media.play()
        }
      })

      /* Picture-in-Picture Canvas */

      async function showPictureInPictureWindow () {
        const image = new Image()
        image.src = musicIcon
        await image.decode()

        let ctx = canvas.getContext('2d')
        ctx.fillStyle = '#72CAAF'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height)

        await video.play()
        await video.requestPictureInPicture()
      }

      navigator.mediaSession.metadata = new window.MediaMetadata()

      /* Play & Pause */

      navigator.mediaSession.setActionHandler('play', function () {
        console.log('play')
        audio.play()
        if (document.pictureInPictureElement) {
          document.pictureInPictureElement.play()
        }
      })

      navigator.mediaSession.setActionHandler('pause', function () {
        console.log('pause')
        audio.pause()
        if (document.pictureInPictureElement) {
          document.pictureInPictureElement.pause()
        }
      })

      async function playAudio () {
        try {
          audio.src = media.src
          audio.currentTime = media.currentTime
          // Play audio
          await audio.play()
          // Update Media Session metadata
          // navigator.mediaSession.metadata = new window.MediaMetadata()
          // Show track album in a Picture-in-Picture window
          await showPictureInPictureWindow(media)
        } catch (error) {
          console.error(error)
        }
      }

      this.playAudio = playAudio
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
