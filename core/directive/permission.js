import Vue from 'vue'
import store from '@store'

// 用户权限
Vue.directive('permission', {
  inserted (el, binding, vnode) {
    const {value} = binding

    // 超级用户
    const user = store.getters && store.getters.user
    if (user && user.usertype === '1') {
      return
    }

    // 是否存在权限列表
    const permissions = store.getters && store.getters.permissions
    if (!permissions) {
      return
    }

    // 用户是否拥有该权限
    let hasPermission = false
    if (value) {
      if (Number.isInteger(value)) {
        hasPermission = permissions.includes(value)
      } else if (value && value instanceof Array && value.length > 0) {
        hasPermission = permissions.some(permission => {
          return value.includes(permission)
        })
      } else {
        throw new Error('need permissions! Like v-permission="1" or v-permission="[1,2]"')
      }
    }

    // 表示该权限不在用户权限内时
    if (binding.modifiers.not) {
      hasPermission = !hasPermission
    }

    // 无权限时删除元素
    if (!hasPermission) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  },
})
