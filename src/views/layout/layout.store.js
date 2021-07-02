// initial state
const state = {
  // 加载遮罩
  loadingCount: 0,
  // 菜单折叠
  collapseMenu: false,
}

// getters
const getters = {
  loading: state => {
    return state.loadingCount > 0
  },
}

// actions
const actions = {}

// mutations
const mutations = {
  OPEN_LOADING (state, count = 1) {
    if (count > 0) {
      state.loadingCount += count
    }
  },
  CLOSE_LOADING (state, count) {
    // 有效的关闭数
    if (count > 0 && count <= state.loadingCount) {
      state.loadingCount -= count
    } else {
      // 否则默认全部关闭
      state.loadingCount = 0
    }
  },
  COLLAPSE_MENU (state, collapse = true) {
    state.collapseMenu = collapse
  },
}

export const layout = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
