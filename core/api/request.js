import store from '@store'
import { MessageBox } from 'element-ui'
import exceptionPage from '@core/router/exception-page.js'

let isRefreshToken = false

/**
 * 刷新token
 */
function refreshToken () {
  isRefreshToken = true
  store.dispatch('refreshToken').then(({data}) => {
    store.commit('LOGIN', data.jwt)
    isRefreshToken = false
  })
}

function showAlert (promise) {
  return promise.catch((thrown) => {
    if (axios.isCancel(thrown)) {
      console.warn('Request canceled', thrown.message)
    } else {
      if (thrown.response) {
        if (thrown.response.data.hasOwnProperty('ret') && thrown.response.data.hasOwnProperty('msg')) {
          MessageBox.alert(thrown.response.data.msg, '错误提示', {type: 'error'})
        } else {
          MessageBox.alert(thrown.response.data.toString(), '响应错误', {type: 'error'})
        }
      } else {
        MessageBox.alert(thrown.toString(), '错误提示', {type: 'error'})
      }
    }
    // 返回响应错误
    return Promise.reject(thrown)
  })
}

function handleData (promise) {
  return promise.then((response) => {
    // 刷新token
    if (response.headers['sj-auth-require-refresh'] && !isRefreshToken) {
      refreshToken()
    }
    // 响应数据处理
    let data = response.data
    let thrown = null
    if (data.hasOwnProperty('ret')) {
      // 服务报错
      if (data.ret) {
        // 含响应消息
        if (data.msg) {
          thrown = new Error(data.msg.toString())
        } else {
          thrown = new Error(data.toString())
        }
      } else {
        // 正确响应
        if (data.hasOwnProperty('detail')) {
          response.data = data.detail
        }
        return response
      }
    } else {
      thrown = new Error(data.toString())
    }
    thrown.response = response
    // 抛出异常
    return Promise.reject(thrown)
  })
}

function showLoading (promise) {
  store.commit('layout/OPEN_LOADING')
  return promise.finally(() => {
    store.commit('layout/CLOSE_LOADING', 1)
  })
}

function request (name, params) {
  return handleData(request.dispatch(name, params))
}

function getRequestItems () {
  let items = {}
  let modules = require('@utils/requires').requires(require.context('@views', true, /\.api\.js$/), false)
  // 模块列表
  for (let path in modules) {
    if (modules.hasOwnProperty(path)) {
      // 请求列表
      for (let name in modules[path]) {
        if (modules[path].hasOwnProperty(name)) {
          // api 是否已存在
          if (items.hasOwnProperty(name)) {
            console.thrown(`${items[name].path} 和 ${path} 中的 ${name} 方法冲突。`)
          } else {
            items[name] = modules[path][name]
            items[name].path = path
          }
        }
      }
    }
  }
  return items
}

/**
 * 异常响应
 * @param thrown
 */
function exceptionResponse (thrown) {
  if (axios.isCancel(thrown)) {
    console.warn('Request canceled', thrown.message)
  } else {
    // 存在响应
    if (thrown.response) {
      // 请求失败
      if (thrown.response.status > 200) {
        exceptionPage.throw(404, '哎呀...找不到页面了！')
      } else {
        if (thrown.response.data && thrown.response.data.ret === 403) {
          // 响应无权限
          exceptionPage.throw(403, '哎呀...没有权限访问该页面！')
        } else if (thrown.response.data && thrown.response.data.ret > 0 && thrown.response.data.msg) {
          // 其他错误
          exceptionPage.throw(thrown.response.data.ret, thrown.response.data.msg)
        } else {
          // 响应的内容无法解析
          exceptionPage.throw(424, '哎呀...请求发生了错误！')
        }
      }
    }
  }
}

request.items = getRequestItems()

request.dispatch = (name, params) => {
  return request.items[name](params)
}

request.alert = (name, params) => {
  return showAlert(request(name, params))
}

request.loading = (name, params) => {
  return showLoading(request(name, params))
}

request.common = (name, params) => {
  return showLoading(showAlert(request(name, params)))
}

request.all = (items) => {
  return Promise.all(items)
}

request.all.common = (items) => {
  return showLoading(showAlert(Promise.all(items)))
}

request.all.loading = (items) => {
  return showLoading(Promise.all(items))
}

request.all.alert = (items) => {
  return showAlert(Promise.all(items))
}

request.page = (name, params) => {
  return showLoading(request(name, params).catch((thrown) => {
    // 异常响应
    exceptionResponse(thrown)
    // 抛出异常
    return Promise.reject(thrown)
  }))
}

request.all.page = (items) => {
  return showLoading(Promise.all(items).catch((thrown) => {
    // 异常响应
    exceptionResponse(thrown)
    // 抛出异常
    return Promise.reject(thrown)
  }))
}

request.map = (itmes) => {
  let requests = {}
  itmes.forEach((name) => {
    requests[name] = function (params) {
      return request(name, params)
    }
  })
  return requests
}

// 取消请求操作
request.cancelAll = () => {}
request.cancelToken = null
request.createCancelToken = () => {
  let source = axios.CancelToken.source()
  request.cancelAll = source.cancel
  request.cancelToken = source.token
}

export default request
