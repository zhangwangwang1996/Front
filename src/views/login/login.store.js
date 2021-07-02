import { login as _login, logout } from '@utils/auth'


// initial state
// shape: [{ id, quantity }]
const state = {
  // 自动获取已登录的用户信息
  user: _login() || {},
  permissions: JSON.parse(localStorage.getItem('permissions') || '[]'),
}

// getters
const getters = {
  user: state => state.user,
  permissions: state => state.permissions,
}

// actions
const actions = {
  login ({commit}, params) {
    let promised = request.alert('login', params)
    return promised
  },
  refreshToken ({commit}, params) {
    let promised = request.alert('refreshToken', params)
    return promised
  },
  getPermission ({commit}, params) {
    let promised = request.alert('getPermission', params)
    return promised
  },
}

// mutations
const mutations = {
  LOGIN (state, token) {
    // 解析用户信息
    let userInfo = _login(token)
    // 获取到用户信息
    if (userInfo) {
      // 置入用户信息
      state.user = userInfo
    }
  },
  LOGOUT (state) {
    logout()
    state.user = {}
  },
  SET_PREMISSIONS (state, data) {
    state.permissions = data.map(val => Number(val))
    localStorage.setItem('permissions', JSON.stringify(state.permissions))
  },
}

export const login = {
  state,
  getters,
  actions,
  mutations,
}
