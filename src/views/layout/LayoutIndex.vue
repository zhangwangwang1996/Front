<template>
  <el-container style="height: 100%;">
    <el-aside width="auto"
              id="aside">
      <router-link to="/">
        <div id="logo"
             :class="[collapse ? 'collapse' : 'not-collapse']">
        </div>
      </router-link>
      <layout-menu/>
    </el-aside>
    <el-container id="right-container"
                  v-loading="loading"
                  element-loading-background="rgba(255, 255, 255, 0.4)">
      <el-header height="50px"
                 id="header">
        <layout-header/>
      </el-header>
      <el-main
        id="main">
        <transition name="el-fade-in-linear">
          <router-view v-if="!exception.code"></router-view>
          <exception
            v-if="exception.code"
            :code="exception.code"
            :message="exception.message"/>
        </transition>
      </el-main>
      <el-footer height="24px"
                 id="footer">
        <span>© 2018 小零科技, Inc. · Privacy · Terms · </span>
        <span>Versions {{VUE_APP_VERSION}}</span>
      </el-footer>
    </el-container>
  </el-container>
</template>

<script>
import LayoutHeader from './LayoutHeader'
import LayoutMenu from './LayoutMenu'
import Exception from '@core/pages/exception/Exception'
import exceptionPage from '@core/router/exception-page.js'

const { mapState, mapGetters } = Vuex.createNamespacedHelpers('layout')

export default {
  components: {LayoutMenu, LayoutHeader, Exception},
  data () {
    return {
      exception: exceptionPage.exception,
      VUE_APP_VERSION: window._env_.VUE_APP_VERSION,
    }
  },
  computed: {
    ...mapGetters([
      'loading',
    ]),
    ...mapState({
      collapse: state => state.collapseMenu,
    })
  },
  watch: {},
  beforeCreate () {},
  methods: {},
}
</script>

<style lang="scss">
$asideWidth: 200px;
$headerHeight: 50px;
$footerWidth: 24px;
$collapseLogo: "/static/logo/logo-h300.png";
$notCollapseLogo: "/static/logo/logo-full-h80.png";

#logo {
  height: $headerHeight;
  cursor: pointer;
  color: white;
  line-height: $headerHeight;
  text-align: center;
  background-color: #424f63;
  transition: width 0.25s, background 0.25s;

  &.collapse {
    width: 64px !important;
    background: url(#{$collapseLogo}) no-repeat center;
    background-size: auto 26px;
  }

  &.not-collapse {
    width: $asideWidth !important;
    background: url(#{$notCollapseLogo}) no-repeat center;
    background-size: auto 26px;
  }
}

#aside {
  background-color: #424f63;
}

#header {
  box-shadow: 0 1px 0 #eff0f4;
  background-color: #fff;
}

#footer {
  line-height: 24px;
  background-color: #fff;
  color: #999;
  box-shadow: 0 -1px 0 #eff0f4;
  text-align: center;
  font-size: 10px;
}

#main {
  position: relative;
  height: 100%;
}

#right-container {
  position: relative;

  & > .el-loading-mask {
    margin: 50px 0 24px 0;
  }
}
</style>

<style lang="scss"
       scoped>
</style>
