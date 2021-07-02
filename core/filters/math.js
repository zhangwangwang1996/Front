export default {
  /**
   * 求平均值
   *
   * @param array
   * @returns {number}
   */
  average (array) {
    var sum = 0
    array.forEach((obj, index) => {
      sum += Number(array[index])
    })
    return sum / array.length
  },
  /**
   * 获得四舍五入后的数字字符串
   *
   * @param n
   * @param decimals 保留的小数位数
   * @returns {string}
   */
  toFixed (n, decimals = 0) {
    return Number(n).toFixed(decimals)
  },
}
