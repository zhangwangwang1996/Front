import moment from 'moment'

export default {
  /**
   * 日期格式化
   *
   * @param date
   * @returns {string}
   */
  formatDate (date) {
    return moment(date).format('YYYY-MM-DD HH:mm:ss')
  },

  /**
   * 时间戳格式化
   * @param time
   * @returns {string}
   */
  formatUnix (time) {
    if (time.constructor !== Number) {
      time = Number(time)
    }
    return moment.unix(time).format('YYYY-MM-DD HH:mm:ss')
  },
  /**
   * 日期转时间戳
   * @param date
   * @returns {number}
   */
  toUnix (date) {
    return moment(date).unix()
  },

  /**
   * 秒数转换为时分秒的计时器格式
   *
   * @param value
   * @returns {string}
   */
  formatTimer (value) {
    if (value) {
      let formats = [
        moment.duration(value * 1000).hours(),
        moment.duration(value * 1000).minutes(),
        moment.duration(value * 1000).seconds(),
      ]
      // 超过24小时
      if (value >= 86400) {
        formats[0] = 24 * parseInt(value / 86400)
      }
      formats.forEach((n, index) => {
        formats[index] = ('00' + n).substr(('' + n).length)
      })
      return formats.join(':')
    }
    return '00:00:00'
  },
}
