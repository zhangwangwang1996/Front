<template>
  <div class="header clear-both">
    <div class="pull-left">
      <el-button class="collapse-btn"
                 type="text"
                 icon="sj-icon-category"
                 @click="COLLAPSE_MENU(!collapse)"></el-button>
    </div>
    <!--notification menu start -->
    <div class="pull-right">
      <el-dropdown trigger="click"
                   @command="handleCommand">
        <div class="el-dropdown-link">
          <i class="sj-icon-user-avatar"
             style="font-size: 22px;"></i>
          <span>{{user.name}}</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </div>
        <el-dropdown-menu class="dropdown-menu"
                          slot="dropdown">
          <el-dropdown-item command="changePassword">
            <span class="sj-icon-change-password"> 修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item command="logout">
            <span class="sj-icon-logout"> 退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!--notification menu end -->
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  computed: {
    ...Vuex.mapState({
      collapse: state => state.layout.collapseMenu,
      user: state => state.login.user,
    }),
  },
  methods: {
    ...Vuex.mapMutations('layout', [
      'COLLAPSE_MENU',
    ]),
    logout () {
      this.$confirm('确认退出登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnClickModal: false,
        type: 'warning',
      }).then(() => {
        this.$store.commit('LOGOUT')
        this.$router.push(filter.loginPath(this.$route.fullPath))
      })
    },
    changePassword () {
      this.$router.push('/account/password/form')
    },
    handleCommand (command) {
      switch (command) {
        case 'logout':
          this.logout()
          break
        case 'changePassword':
          this.changePassword()
          break
      }
    },
  },
}
</script>

<style lang="scss">
.dropdown-menu {
  min-width: 120px;
  margin-top: 0 !important;
  border-top-width: 0 !important;
  -webkit-box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.1) !important;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.1) !important;
  border-radius: 0 !important;
  background-color: #424e62 !important;
  padding: 0 !important;

  .el-dropdown-menu__item {
    color: #bfcbd9;

    &:hover {
      background-color: #353f4f !important;
    }
  }

  .popper__arrow {
    border-color: transparent !important;

    &::after {
      border-bottom-color: #424e62 !important;
    }
  }
}
</style>

<style lang="scss"
       scoped>
.header {
  line-height: 50px;

  .collapse-btn {
    margin-left: -20px;
    border-right: 1px solid #eff0f4;
    width: 50px;
    height: 50px;
    border-radius: 0;
    font-size: 22px;

    &:hover {
      color: #fff;
      background-color: #409EFF;
      border-right-color: transparent;
    }
  }

  .el-dropdown {
    cursor: pointer;

    .el-dropdown-link {
      height: 50px;
      position: relative;

      * {
        vertical-align: middle;
      }
    }
  }
}
</style>
