/*
 * excel文件的导出
 * @Author anker.wang
 * @Date: 2018-01-08 11:16:50
 * @Last Modified by: anker.wang
 * @Last Modified time: 2018-06-13 17:43:58
 */

import XLSX from 'xlsx'
import FileSaver from 'file-saver'

function s2ab (s) {
  var buf = new ArrayBuffer(s.length)
  var view = new Uint8Array(buf)
  for (var i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF
  return buf
}

export default {
  /**
   * 转换对象列表转换为二维数组列表
   * [{}] => [[]]
   * @param {array} arrayObjects 数组对象
   * @param {array} keys 字段顺序列表，使转换后的值顺序保持一致
   * @returns {Array}
   * @constructor
   */
  ArrayObjectsToArrays (arrayObjects, keys) {
    var arrays = []
    // 为数组且数组有内容
    if (arrayObjects && arrayObjects instanceof Array && arrayObjects.length) {
      // 获得标题行
      if (!(keys && keys.length)) {
        keys = Object.keys(arrayObjects[0])
      }
      // 写入标题行
      arrays.push(keys)
      // 获得数据列
      arrayObjects.forEach((arrayObject) => {
        let array = []
        // 必须为对象
        if (arrayObject instanceof Object) {
          // 根据标题行顺序获取内容保障数组顺序
          keys.forEach((key) => {
            let value = _.get(arrayObject, key, null)
            // 如果值为数组或者对象自动转为字符串
            if (_.isArray(value) || _.isObject(value)) {
              value = value.toString()
            }
            array.push(value)
          })
        }
        arrays.push(array)
      })
    }
    return arrays
  },
  exportXlsx (arrays, options) {
    options.sheetName = options.sheetName || 'Sheet1'
    options.fileName = options.fileName || 'unnamed'
    let wb = {
      SheetNames: [],
      Sheets: {},
    }

    let ws = XLSX.utils.aoa_to_sheet(arrays)

    /* add worksheet to workbook */
    wb.SheetNames.push(options.sheetName)
    wb.Sheets[options.sheetName] = ws

    /* bookType can be 'xlsx' or 'xlsm' or 'xlsb' or 'ods' */
    var wopts = {bookType: 'xlsx', bookSST: false, type: 'binary'}
    var wbout = XLSX.write(wb, wopts)

    /* the saveAs call downloads a file on the local machine */
    FileSaver.saveAs(new Blob([s2ab(wbout)], {type: 'application/octet-stream'}), options.fileName + '.xlsx')
  },
}
