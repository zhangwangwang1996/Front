import LoginBox from './src/main'

/* istanbul ignore next */
LoginBox.install = function (Vue) {
  Vue.component(LoginBox.name, LoginBox)
}

export default LoginBox
