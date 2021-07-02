export default {
  /**
   * 深拷贝JSON对象
   * @param jsonObject
   * @returns {any}
   */
  copyJson (jsonObject) {
    return JSON.parse(JSON.stringify(jsonObject))
  },

  /**
   *  把来源的对象的值循环赋值到目标对象
   * @param {*} targetArray
   * @param {*} sourceArray
   * @param {*} setMethod
   */
  setLoop (targetArray, sourceArray, setMethod) {
    for (const key in sourceArray) {
      if (targetArray.hasOwnProperty(key)) {
        // 默认获得来源数据
        let value = sourceArray[key]
        // 是否有自定义处理方法
        if (setMethod) {
          value = setMethod(targetArray[key], sourceArray[key])
        }
        // 赋值
        targetArray[key] = value
      }
    }
  },
  /**
   * 合并一个数组到数组中, 保持数组唯一性, 可根据关键字段匹配
   * @param array
   * @param array1
   * @param field {string} 数组对象中key
   */
  concatArray (array, array1, field) {
    if (field) {
      array1 = _.differenceBy(array1, array, field)
    } else {
      array1 = _.difference(array1, array)
    }
    // 必须使用传入的数组使用 push, 否则 vue 数据绑定无法触发
    array.push.apply(array, array1)
  },
  /**
   * 从数组中获得匹配的引用数组
   * @param findArrays
   * @param quoteArrays
   * @param field
   * @returns {Array}
   */
  findQuoteArray (findArrays, quoteArrays, field = 'id') {
    let _quoteArrays = []
    for (let index = 0; index < quoteArrays.length; index++) {
      for (let _index = 0; _index < findArrays.length; _index++) {
        if (quoteArrays[index][field] === findArrays[_index][field]) {
          quoteArrays[index] = findArrays[_index]
          _quoteArrays.push(findArrays[_index])
          break
        }
      }
    }
    return _quoteArrays
  },
  /**
   * 数据类型转换
   * @param value
   * @param type
   * @returns {*}
   * @deprecated
   */
  dataTypeConve (value, type) {
    // 递归对象验证内容
    if (type.constructor === Object && Object.keys(type).length > 0) {
      for (const field in type) {
        if (value[field]) {
          value[field] = this.dataTypeConve(value[field], type[field])
        }
      }
    } else if (value.constructor !== type) {
      // 日期处理
      if (type === Date) {
        value = new Date(value)
      } else {
        value = type(value)
      }
    }
    return value
  },

  /**
   * URL 参数解析
   * @param url
   * @returns {*}
   * @constructor
   */
  URLParamsParse (url) {
    let params = url.match(/([^?=&]+)(=([^&]*))/g) || []
    return params.reduce((a, v) => {
      a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)
      return a
    }, {})
  },
  /**
   * 设置最小延迟执行时间，将会在函数执行或者设置的延迟时间完成后 resolve
   * @param fn
   * @param delay
   * @returns {Promise<unknown>}
   */
  setMinTime (fn, delay = 0) {
    return new Promise(async (resolve) => {
      let startTime = new Date().getTime()
      await fn()
      let endTime = new Date().getTime()
      let totalTime = endTime - startTime
      if (totalTime >= delay) {
        resolve()
      } else {
        setTimeout(resolve, delay - totalTime)
      }
    })
  }
}
