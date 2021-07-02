/*
 * 用户登录认证的方法集
 * @Author: anker.wang
 * @Date: 2018-01-08 11:24:54
 * @Last Modified by: anker.wang
 * @Last Modified time: 2018-01-25 13:41:44
 */

let timer = null
let user = null
let queue = {
  login: [],
  logout: [],
  expired: [],
}

function triggerQueue (queue, data) {
  queue.forEach((event) => {
    event(data)
  })
}

function b64DecodeUnicode (str) {
  // Going backwards: from bytestream, to percent-encoding, to original string.
  return decodeURIComponent(atob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  }).join(''))
}

function getLoginInfo (token) {
  // decode user info from token
  try {
    var start = token.indexOf('.') + 1
    var end = token.indexOf('.', start)
    var encoded = token.substr(start, end - start)
    var claimStr = b64DecodeUnicode(encoded)
    var claim = JSON.parse(claimStr)
    return claim
  } catch (e) {
    return null
  }
}

function getExpiredTime (loginTime, validTime) {
  let currentTime = new Date().getTime()
  // 过期时间 = 有效期(validTime - 5分钟) + 登录时间 - 当前时间
  let expirationTime = 1000 * validTime - 300000 + loginTime * 1000 - currentTime
  // 返回有效时间
  return expirationTime
}

function loginExpiredTimer (loginTime, validTime) {
  // 清除计时器
  timer && clearInterval(timer)
  // 过期事件触发
  let expirationTime = getExpiredTime(loginTime, validTime)
  if (expirationTime <= 0) {
    triggerQueue(queue.expired)
  } else {
    timer = setInterval(() => {
      triggerQueue(queue.expired)
    }, expirationTime)
  }
}

/**
 * 登录事件
 * @param callback
 */
export function onlogin (callback) {
  queue.login.push(callback)
}

/**
 * 退出登录事件
 * @param callback
 */
export function onlogout (callback) {
  queue.logout.push(callback)
}

/**
 * 登录过期事件
 * @param callback
 */
export function onloginExpired (callback) {
  queue.expired.push(callback)
}

/**
 * 获得用户信息
 * @returns {*}
 */
export function getUser () {
  return user
}

/**
 * 退出登录
 * @param token 无token时将从缓存登录
 * @returns {*}
 */
export function login (token) {
  if (token) {
    // 解析用户信息
    let data = getLoginInfo(token)
    // 获取到用户信息
    if (data) {
      user = data.user
      // 储存登录 token
      setToken(token)
      // 返回登录成功的事件
      triggerQueue(queue.login, data.user)
      // 登录有效期计时器
      loginExpiredTimer(data.iat, data.vt)
      // 返回用户信息
      return data.user
    }
  } else {
    // 当token不存在时尝试从缓存中读取
    let storgeToken = getToken()
    if (storgeToken) {
      let data = getLoginInfo(storgeToken)
      if (getExpiredTime(data.iat, data.vt) > 0) {
        user = data.user
        // 返回登录成功的事件
        triggerQueue(queue.login, data.user)
        // 登录有效期计时器
        loginExpiredTimer(data.iat, data.vt)
        // 返回用户信息
        return data.user
      } else {
        logout()
      }
    }
  }
  return false
}

/**
 * 退出登录
 */
export function logout () {
  localStorage.removeItem('token')
  user = null
  triggerQueue(queue.logout)
}

/**
 * 是否已经登录
 * @returns {boolean}
 */
export function isLoggedIn () {
  return user !== null
}

/**
 * 获得token
 * @returns {string | null}
 */
export function getToken () {
  return localStorage.getItem('token')
}

/**
 * 设置token
 * @param token
 */
export function setToken (token) {
  localStorage.setItem('token', token)
}
