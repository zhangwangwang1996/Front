<template>
  <div class="form-signin">
    <div class="form-signin-heading">
      <h1 class="sign-title">登 录</h1>
      <img width="100"
           src="/static/logo/logo-h300.png"
           alt="">
    </div>
    <div class="login-wrap">
      <el-form ref="loginForm"
               :rules="rules"
               :model="form"
               label-position="left">
        <el-form-item prop="name">
          <el-input
            v-model="form.name"
            placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            class="submit-btn"
            type="primary"
            @click="login"
            :loading="loading">
            <i class="el-icon-check"></i>
          </el-button>
        </el-form-item>
        <div class="login-error"
             v-if="errorMsg != ''">{{ errorMsg }}
        </div>
        <!-- <div class="registration">
          还未拥有账户?
          <a class="" href="registration.html">
            注册
          </a>
        </div> -->
      </el-form>
    </div>
  </div>
</template>

<script>
import request from '@core/api/request'
import store from '@store'

export default {
  name: 'Login',
  data () {
    return {
      loading: false,
      errorMsg: '',
      form: {
        name: '',
        password: '',
      },
      rules: {
        name: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 2, max: 20, message: '用户名长度在 2 到 20 个字符', trigger: 'blur'},
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 3, max: 60, message: '密码长度在 3 到 60 个字符', trigger: 'blur'},
        ],
      },
    }
  },
  mounted () {
    document.addEventListener('keyup', this.keyup)
  },
  destroyed () {
    document.removeEventListener('keyup', this.keyup)
  },
  methods: {
    keyup (e) {
      let keyCode = e.keyCode || e.which || e.charCode
      if (keyCode === 13) {
        this.login()
      }
    },
    login () {
      this.errorMsg = ''
      this.loading = true
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          request('login', this.form).then(({data}) => {
            store.commit('LOGIN', data.jwt)
            // 用户权限控制
            if (store.state.login.user.usertype === '1') {
              this.$emit('login')
            } else {
              request('getPermission').then(({data}) => {
                store.commit('SET_PREMISSIONS', data)
                this.$emit('login')
              }).catch(() => {
                store.commit('LOGOUT')
                this.errorMsg = '登录失败，网络异常'
                this.loading = false
              })
            }
          }).catch((error) => {
            if (error.response) {
              if (error.response.data.ret === 403) {
                this.errorMsg = '登录失败，禁止访问'
              } else {
                this.errorMsg = '登录失败，用户名或密码错误'
              }
            } else {
              this.errorMsg = '网络错误'
            }
            this.loading = false
          })
        } else {
          this.loading = false
          return false
        }
      })
    },
  },
}
</script>
<style lang="scss">
.login-body {
  background: #2d2f33 url() no-repeat fixed;
  background-size: cover;
  height: 100%;
}

.container {
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  padding-top: 100px;
}

.form-signin {
  max-width: 330px;
  margin: 0 auto;
  background: #fff;
  border-radius: 6px;

  .form-signin-heading {
    margin: 0;
    padding: 25px 15px;
    text-align: center;
    color: #fff;
    position: relative;
  }

  .sign-title {
    font-size: 24px;
    color: #fff;
    position: absolute;
    top: -60px;
    left: 0;
    text-align: center;
    width: 100%;
    text-transform: uppercase;
  }

  input[type="text"],
  input[type="password"] {
    // font-weight: lighter;
    letter-spacing: 1px;
    -webkit-border-radius: 5px;
    border: 1px solid #eaeaec;
    background: #eaeaec;
    box-shadow: none;
    font-size: 12px;
    position: relative;
    height: auto;
    padding: 10px;
    box-sizing: border-box;
    display: block;
    width: 100%;
    line-height: 1.42857143;
    transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;

    &::placeholder {
      color: #878d99;
    }
  }

  .el-form-item.is-success {
    .el-input__inner,
    .el-input__inner:focus {
      border-color: #eaeaec;
    }
  }

  .submit-btn {
    width: 100%;

    i {
      font-size: 18px;
      font-weight: bolder;
    }
  }
}

.login-wrap {
  padding: 20px;
  position: relative;

  .registration {
    color: #c7c7c7;
    text-align: center;
    margin-top: 15px;
  }

  .login-error {
    font-size: 12px;
    color: #fa5555;
    text-align: center;
  }
}
</style>
