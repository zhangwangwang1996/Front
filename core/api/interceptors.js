import axios from 'axios'
import { isLoggedIn, getToken } from '@utils/auth'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 记录取消请求Token
  request.cancelToken && (config.cancelToken = request.cancelToken)

  // 已登录
  if (isLoggedIn()) {
    config.headers['SJ-Auth-Token'] = getToken()
  }
  // 发送请求配置
  return config
}, function (error) {
  // 返回请求错误
  return Promise.reject(error)
})

// 添加响应拦截器
// axios.interceptors.response.use((response) => {})
