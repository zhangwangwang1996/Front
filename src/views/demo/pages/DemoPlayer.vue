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
      <template slot="header">弹出视频播放器</template>
      <img v-for="({poster}, index) in video"
           :src="poster"
           :key="index"
           class="margin r10"
           :alt="poster"
           width="100"
           height="100"
           @click="openVideo(index)">
    </sj-panel>

    <sj-panel>
      <template slot="header">弹出录音播放器</template>
      <div v-for="({src}, index) in audio"
           :key="index"
           class="margin b10">
        <el-button @click="openAudio(index)">播放{{src|baseName}}
        </el-button>
      </div>
    </sj-panel>
  </div>
</template>

<script>
import SjPlyrVideoBox from '@core/components/sj-plyr-video-box'
import SjPlyrAudioBox from '@core/components/sj-plyr-audio-box'

export default {
  components: {},
  mixins: [],
  data () {
    return {
      video: [{
        // 有转到mp4的转码视频
        src: 'http://taskcert.oss-cn-shanghai.aliyuncs.com/934/8446934/1093408_8446934_Q1486882228172_first_normal_1562811749603_255ADA61.3gp',
        poster: 'http://taskcert.oss-cn-shanghai.aliyuncs.com/934/8446934/1093408_8446934_Q1486882228172_first_normal_1562811732938_5B55DB18.jpg'
      }, {
        src: 'http://taskcertdev.oss-cn-shanghai.aliyuncs.com/770/430770/1404_430770_Q201906181044522_first_normal_1560855941603_11357211.mp4',
        poster: 'http://taskcertdev.oss-cn-shanghai.aliyuncs.com/770/430770/1404_430770_Q201906181044522_first_normal_1560855940600_17651377.jpeg'
      }, {
        src: 'http://taskcertdev.oss-cn-shanghai.aliyuncs.com/539/426539/1697_426539_Q1504761683801_first_normal_1559012636629_19A0F9C4.3gp',
        poster: 'http://taskcertdev.oss-cn-shanghai.aliyuncs.com/539/426539/1697_426539_Q1504761683801_first_normal_1559012636553_EF22F9E3.jpg'
      }],
      audio: [{
        src: 'http://taskcertdev.oss-cn-shanghai.aliyuncs.com/539/426539/1697_426539_Q1504761740199_first_normal_1559012636559_2AB1167F.mp3'
      }, {
        src: 'http://taskcertdev.oss-cn-shanghai.aliyuncs.com/539/426539/1697_426539_Q1504761740199_amend_normal_1559015222983_3A42B03B.mp3'
      }]
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  destroyed () {},
  methods: {
    openVideo (index) {
      SjPlyrVideoBox.open(this.video[index])
    },
    openAudio (index) {
      SjPlyrAudioBox.open(this.audio[index])
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
ul.icon-list {
  overflow: hidden;
  list-style: none;
  padding: 0;
  border: 1px solid #eaeefb;
  border-radius: 4px;
  margin: 10px 0;
  font-size: 14px;
  color: #5e6d82;
  line-height: 2em;

  li {
    float: left;
    width: 16.66%;
    text-align: center;
    height: 120px;
    line-height: 120px;
    color: #666;
    font-size: 13px;
    border-right: 1px solid #eee;
    border-bottom: 1px solid #eee;
    margin-right: -1px;
    margin-bottom: -1px;

    &:after {
      content: "";
      height: 100%
    }
  }

  li:after, li span {
    display: inline-block;
    vertical-align: middle
  }

  li span {
    line-height: normal;
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
    color: #99a9bf;
    transition: color .15s linear
  }

  li i {
    display: block;
    font-size: 32px;
    margin-bottom: 15px;
    color: #606266;
    transition: color .15s linear
  }

  li .icon-name {
    display: inline-block;
    padding: 0 3px;
    height: 1em
  }

  li:hover i, li:hover span {
    color: #5cb6ff
  }
}
</style>
<style lang="scss"
       module>
// 带作用域的CSS
// 绑定class方式 <p :class="$style.red"></p>
// https://vue-loader.vuejs.org/zh-cn/features/css-modules.html
</style>
