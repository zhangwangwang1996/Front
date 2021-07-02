/* global process */
import Vuex from 'vuex'
import state from '@/store/state'
import * as actions from '@/store/actions'
import * as getters from '@/store/getters'
import * as mutations from '@/store/mutations'

const debug = process.env.NODE_ENV !== 'production'

// 载入 views 目录下所有文件模块
const modules = require('@utils/requires').requires(require.context('@views', true, /\.store\.js$/))

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules,
  strict: debug,
})
