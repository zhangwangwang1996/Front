<template>
  <div v-title="'图库'">
    <div class="page-heading">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
        <el-breadcrumb-item>图片查看</el-breadcrumb-item>
        <el-breadcrumb-item>图片列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <sj-panel>
      <template slot="header">分类</template>
      <el-select v-model="value"
                 placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled">
        </el-option>
      </el-select>
      <el-tag>美女</el-tag>
      <el-tag>风景</el-tag>
      <el-tag>科技</el-tag>
      <el-input v-model="input" placeholder="请输入内容" ></el-input>

        <el-button type="primary" icon="el-icon-search">搜索</el-button>

      <el-button type="primary">上传<i class="el-icon-upload el-icon--right"></i></el-button>

    </sj-panel>
<!--    <el-carousel trigger="click"-->
<!--                 height="300px"-->
<!--                 :interval="3000"-->
<!--                 arrow="always">-->
<!--      <el-carousel-item v-for="item in imgList"-->
<!--                        :key="item.name">-->
<!--        <img :src="item.src"-->
<!--             style="height:100%;width:100%;"-->
<!--             alt="图片丢失了"-->
<!--             :title="item.title"/>-->
<!--      </el-carousel-item>-->
<!--    </el-carousel>-->

    <!--    <div class="demo-image__preview">-->
    <!--      <el-image v-for="item in url"-->
    <!--        style="width: 100px; height: 100px"-->
    <!--        :src= 'item'-->
    <!--        :preview-src-list="srcList"-->
    <!--        :fit="cover">-->
    <!--      </el-image>-->
    <!--    </div>-->
    <div class="home-picture-cont"
         style="min-height: 300px;"
         v-loading="loading">
      <div
        v-if="!loading"
        v-for="(item, index) in srcList"
        :key="index"
        :class="['home-picture-cont-img']"
        :style="item.style"


      >
        <!--        :style="gridHegiht (srcList)"-->
        <el-image :src="item.src"
                  :preview-src-list="previewList">

        </el-image>
      </div>
    </div>

  </div>

</template>

<script>
import { searchRules } from '../imag-brower.rules'
import userMixins from '../imag-brower.mixins'
import ElImage from '@/views/imag-brower/components/image2'

export default {
  components: {
    ElImage
  },
  mixins: [userMixins],
  data () {
    return {
      input: null,
      value: null,
      searchRules,
      search: {
        id: null,
        name: null,
      },
      srcList: [
        {src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg', style: {}},
        {src: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg', style: {}},
        {src: 'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg', style: {}},
        {src: 'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg', style: {}},
        {src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg', style: {}},
        {src: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg', style: {}},
        {src: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg', style: {}},
        {src: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg', style: {}},
        {src: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg', style: {}},
        {src: 'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg', style: {}},
        {src: 'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg', style: {}},
        {src: 'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg', style: {}},
        {src: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg', style: {}},
        {src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg', style: {}}
      ],
      options: [{
        value: '选项1',
        label: '美女'
      }, {
        value: '选项2',
        label: '风景',
        disabled: true
      }, {
        value: '选项3',
        label: '科技'
      }],
      loading: true,
    }
  },
  computed: {
    previewList () {
      return this.srcList.map(({src}) => src)
    },
  },
  created () {
    this.loadImages()
  },
  methods: {
    async loadImages () {
      this.loading = true
      const all = []
      for (const item of this.srcList) {
        all.push(this.setImgStyle(item))
      }
      await Promise.all(all)
      this.loading = false
    },
    gridHeight (imgUrl) {
      let img = new Image()
      img.src = imgUrl
      let heightSm = ''
      return new Promise((resolve) => {
        img.onload = function () {
          let width = img.width
          let height = img.height
          heightSm = {
            'grid-row': `auto / span ${parseInt(parseInt(height / (width / 383)) / 5)}`
          }
          setTimeout(() => resolve(heightSm), 1000)
          // // =
          // setTimeout(function () {
          //   resolve(heightSm)
          // }, 1000)
          // // =
          // setTimeout(resolve, 200, heightSm)
          // setTimeout(h => resolve(h), 200, heightSm)
          // setTimeout((h) => resolve(h), 200, heightSm)
          // setTimeout(function (heightSm) {
          //   resolve(heightSm)
          // }, 1000)
        }
      })
    },
    async setImgStyle (item) {
      item.style = await this.gridHeight(item.src)
    },
  }
}
</script>
<style lang="scss">
.el-carousel { /*轮播图居中*/
  width: 60%;
  margin: 0 auto;
  padding-top: 20px;
  position: relative;
}

.home-picture-cont {
  width: 100%;
  box-sizing: border-box;
  padding: 0 3px;
  display: grid;
  grid-template-columns: repeat(auto-fill, calc(calc(100% - 3px) / 2));
  grid-auto-rows: 10px;
  grid-column-gap: 3px;
  grid-auto-flow: row dense;

  .home-picture-cont-img {
    position: relative;
    margin-bottom: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    img {
      display: block;
      width: 100%;
    }
  }
}

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
