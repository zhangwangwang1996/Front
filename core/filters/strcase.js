export default {

  /**
   * 匹配字符串为单词
   * @param str
   */
  matchStrCase (str) {
    return str && str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
  },
  /**
   * 转为大驼峰
   * @param str
   * @returns {*}
   */
  toLargeCamelCase (str) {
    return this.matchStrCase(str)
      .map(x => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
      .join('')
  },
  /**
   * 转为小驼峰
   * @param str
   * @returns {string}
   */
  toSmallCamelCase (str) {
    str = this.matchStrCase(str)
      .map(x => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
      .join('')
    return str.slice(0, 1).toLowerCase() + str.slice(1)
  },
  /**
   * 转为分隔符连接
   * @param str
   * @param separator
   * @returns {*}
   */
  toSeparatorCase (str, separator = '_') {
    return this.matchStrCase(str)
      .map(x => x.toLowerCase())
      .join(separator)
  },
}
