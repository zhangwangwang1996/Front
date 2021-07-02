<template>
  <el-menu :default-active="$route.path"
           :collapse="collapse"
           background-color="#424f63"
           text-color="#bfcbd9"
           active-text-color="#409EFF"
           :router="true"
           class="aside-menu">
    <!-- 演示列表 -->
    <template v-if="development">
      <el-submenu index="/demo/users">
        <template slot="title">
          <i class="sj-icon-demo"></i>
          <span class="menu-text">演示管理</span>
        </template>
        <el-menu-item index="/demo/table">演示列表</el-menu-item>
        <el-menu-item index="/demo/create">演示创建</el-menu-item>
        <el-menu-item index="/demo/detail/1">演示详情</el-menu-item>
        <el-menu-item index="/demo/nested">嵌套表单</el-menu-item>
        <el-menu-item index="/demo/components">演示组件</el-menu-item>
        <el-menu-item index="/demo/icon">扩展图标</el-menu-item>
        <el-menu-item index="/demo/export-excel">导出EXCEL</el-menu-item>
        <el-menu-item index="/demo/editor">富文本编辑器</el-menu-item>
        <el-menu-item index="/demo/player">多媒体播放器</el-menu-item>
        <el-menu-item index="/demo/image-upload">图片上传</el-menu-item>
        <el-menu-item index="/demo/image-exif">图片EXIF读写</el-menu-item>
        <el-menu-item index="/demo/import-alias-path">引入别名路径</el-menu-item>
        <el-menu-item index="/demo/keyboard-listener">监听快捷键</el-menu-item>
        <el-menu-item index="/demo/copy-and-paste">复制粘贴</el-menu-item>
        <el-menu-item index="/demo/image-magnifier">图片放大镜</el-menu-item>
        <el-menu-item index="/demo/array-pagination">数组分页加载</el-menu-item>
      </el-submenu>
      <el-menu-item index="/demo/table">
        <i class="sj-icon-demo"></i>
        <span slot="title"
              class="menu-text">演示列表</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      development: process.env.NODE_ENV === 'development',
    }
  },
  computed: Vuex.mapState({
    collapse: state => state.layout.collapseMenu,
  }),
  watch: {},
  methods: {},
}
</script>

<style lang="scss">

</style>
<style lang="scss"
       scoped>
.aside-menu:not(.el-menu--collapse) {
  width: 200px;
  padding-bottom: 56px;
}

.el-menu {
  border-right: none;
}

.el-submenu i,
.el-menu-item i {
  color: #bfcbd9;
}

.el-submenu__title i,
.el-menu-item i {
  color: #bfcbd9;

  &[class^=sj-icon-] {
    vertical-align: middle;
    text-align: center;
    font-size: 18px;
    margin-right: 8px;
    margin-left: 3px;
  }
}

.menu-text {
  padding-left: 10px;
}
</style>
