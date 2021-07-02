/* global process */
import Vue from 'vue'

// 文档标题
Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = binding.value + ' - ' + window._env_.VUE_APP_NAME
  },
  update: function (el, binding) {
    if (binding.oldValue !== binding.value) {
      document.title = binding.value + ' - ' + window._env_.VUE_APP_NAME
    }
  },
})
