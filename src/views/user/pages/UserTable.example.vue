<template>
  <div v-title="图库">
    <div class="page-heading">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
        <el-breadcrumb-item>图片查看</el-breadcrumb-item>
        <el-breadcrumb-item>图片列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <sj-panel>
      <template slot="header">分类</template>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled">
        </el-option>
      </el-select>
      <el-tag @click="getBeautiful">美女</el-tag>
      <el-tag>风景</el-tag>
      <el-tag>科技</el-tag>
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
        :file-list="fileList">
        <el-button size="small" type="primary" >点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </sj-panel>

<!--    <div class="demo-image__preview">-->
<!--      <el-image v-for="item in url"-->
<!--        style="width: 100px; height: 100px"-->
<!--        :src= 'item'-->
<!--        :preview-src-list="srcList"-->
<!--        :fit="cover">-->
<!--      </el-image>-->
<!--    </div>-->
    <div class="home-picture-cont">
      <div
        v-for="(item, index) in srcList"
        :key="index"
        :class="['home-picture-cont-img']"
        @click="pictureFun(item)"
      >
<!--        :style="gridHegiht (srcList)"-->
        <el-image :src="item" alt="" :preview-src-list="srcList">

          </el-image>
      </div>
    </div>
      <el-carousel trigger="click" height="250px" :interval="3000" arrow="always" style="width:800px">
        <el-carousel-item v-for="item in imgList" :key="item.name">
          <img :src="item.src" style="height:100%;width:100%;" alt="图片丢失了" :title="item.title" />
        </el-carousel-item>
      </el-carousel>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="1000" align="center">
    </el-pagination>
    Scroll down to see the bottom-right button.
    <el-backtop target=".page-component__scroll .el-scrollbar__wrap"></el-backtop>
  </div>

</template>

<script>
import { searchRules } from '../user.rules'
import userMixins from '../user.mixins'
import table from '@core/mixins/table'

export default {
  mixins: [table, userMixins],
  data () {
    return {
      searchRules,
      search: {
        id: null,
        name: null,
      },
      fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      url: ['https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      ],
      src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
      srcList: [
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
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
      fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
      imgList: [
        {
          name: 'lj',
          src: 'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg',
          title: '这是lj.png'
        },
        {
          name: 'logo',
          src: 'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg',
          title: '这是logo.png'
        },
        {
          name: 'bg',
          src: 'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg',
          title: '这是转身背锅.jepg'
        },
        {
          name: 'sadmas',
          src: 'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg',
          title: '这是转身背锅.jepg'
        }
      ]
    }
  },
  computed: Vuex.mapState({}),
  created () {},
  gridHegiht (imgUrl) {
    let img = new Image()
    img.src = imgUrl
    let heightSm = ''
    return (img.onload = function () {
      let width = img.width
      let height = img.height
      heightSm = {
        'grid-row': `auto / span ${parseInt(parseInt(height / (width / 183)) / 10)}`
      }
      return heightSm
    })()
  },
  methods: {
    ...Vuex.mapActions([]),
    ...request.map(['getUserTable']),
    /**
     * 获得表格数据
     * @param {*} params
     */
    getTableData (params) {
      return request.page('getUserTable', params)
    },
    onExportPage () {
      this.$export.xlsx(`${this.$route.meta.title}-${this.pagination.current_page}P`, {
        data: this.table,
        header: this.fields,
      })
    },
    onExportSearch () {
      this.$export.xlsx(this.$route.meta.title, {
        header: this.fields,
        total: this.pagination.total,
        request: this.getUserTable,
        requestParams: this.search,
      })
    },
    onDelete (index, rows) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {type: 'warning'}).then(() => {
        request.common('deleteUserData', {id: rows[index].id}).then(() => {
          this.$message.success('删除成功')
          rows.splice(index, 1)
        })
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },
  },
}
</script>
<style lang="scss">
.el-carousel{ /*轮播图居中*/
  width: 40%;
  margin:0 auto;
}
.home-picture-cont{
  width: 100%;
  box-sizing: border-box;
  padding: 0 3px;
  display: grid;
  grid-template-columns: repeat(auto-fill, calc(calc(100% - 3px) / 2));
  grid-auto-rows: 10px;
  grid-column-gap: 3px;
  grid-auto-flow: row dense;
  .home-picture-cont-img{
    position: relative;
    margin-bottom: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    img{
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
