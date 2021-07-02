/*
 * 根据给定的多个文件路径引入模块
 * @Author: anker.wang
 * @Date: 2018-01-08 11:23:04
 * @Last Modified by: anker.wang
 * @Last Modified time: 2018-07-26 12:37:26
 */

/**
 * 快速制作验证规则
 * https://github.com/yiminghe/async-validator
 * @param {*} message
 * @param {*} type
 * @param {*} trigger
 * @param {*} required
 *
 string: Must be of type string. This is the default type.
 number: Must be of type number.
 boolean: Must be of type boolean.
 method: Must be of type function.
 regexp: Must be an instance of RegExp or a string that does not generate an exception when creating a new RegExp.
 integer: Must be of type number and an integer.
 float: Must be of type number and a floating point number.
 array: Must be an array as determined by Array.isArray.
 object: Must be of type object and not Array.isArray.
 enum: Value must exist in the enum.
 date: Value must be valid as determined by Date
 url: Must be of type url.
 hex: Must be of type hex.
 email: Must be of type email.
 */

function extend (type) {
  let rule = {type}
  switch (type) {
    case 'id':
      rule.type = 'integer'
      rule.min = 1
      break
    case 'phone':
      rule.type = 'integer'
      rule.min = 12999999999
      rule.max = 19999999999
      break
    default:
      break
  }
  return rule
}

/**
 * 快速生成 async-validator 验证规则
 * @param {string|object} message
 * @param {string|object} type
 * @param {string|object} trigger
 * @param {object} options
 * @returns {{message, type, trigger, required, transform}}
 */
export function validatorRule (message = '', type = 'string', trigger = 'blur', options = {}) {
  // options 参数提前
  let args = {message, type, trigger}
  for (let key in args) {
    if (args[key]) {
      if (args[key].constructor === Object) {
        Object.assign(options, args[key])
        break
      } else {
        options[key] = args[key]
      }
    }
  }
  let _rule = {
    ...options,
    ...extend(options.type),
  }
  _rule.transform = (value) => {
    // 为空字符串时转换为null
    (value === '') && (value = null)
    // 数字类型忽略为null的数字转换
    if (value !== null && ['number', 'integer', 'float'].includes(_rule.type)) {
      value = Number(value)
    }
    return value
  }
  return _rule
}

export function required (...args) {
  let _rule = validatorRule(...args)
  _rule.required = true
  return _rule
}

validatorRule.required = required

export default validatorRule
