import Vue from 'vue'
import LoginBoxVue from './main.vue'

const LoginBoxConstructor = Vue.extend(LoginBoxVue)

let instance

const initInstance = () => {
  instance = new LoginBoxConstructor({
    el: document.createElement('div'),
  })
  document.body.appendChild(instance.$el)
}

const LoginBox = function (options) {
  if (!instance) {
    initInstance()
  }
  instance.visible = true
}

export default LoginBox
export { LoginBox }
