import XLSX from 'xlsx'

onmessage = function (event) {
  if (event.data.constructor === File) {
    event.data = {
      file: event.data,
    }
  }
  if (!event.data.output) {
    // sheet_to_csv 生成CSV
    // sheet_to_txt 生成UTF16格式化文本
    // sheet_to_html 生成HTML
    // sheet_to_json 生成一个对象数组
    // sheet_to_formulae 生成公式列表
    event.data.output = 'sheet_to_json'
  }
  if (!event.data.options) {
    // header 参数可选,
    // 默认值：读取并移除第一行的内容作为键,
    // 1: 二维数组，"A": 行键作为对象名称(A1、A2)，[]: 使用指定的字符串作为行对象中的键
    // 文档参考：https://docs.sheetjs.com/#json
    event.data.options = {}
  }
  let file = event.data.file
  let outputFormat = event.data.output
  let options = event.data.options

  let fileReader = new FileReader()
  fileReader.onload = function (event) {
    let data = new Uint8Array(event.target.result)

    let workbook = null
    try {
      // 以二进制流方式读取得到整份excel表格对象
      workbook = XLSX.read(data, {
        type: 'array',
      })
    } catch (e) {
      this.$message.error('文件类型不正确')
      return
    }
    // 获取第一张表的数据
    let sheetName = workbook.SheetNames[0]
    let sheetData = workbook.Sheets[sheetName]
    // console.log(XLSX.utils.decode_range('A1'))
    // for (let key in sheetData) {
    //   console.log(key, XLSX.utils.decode_row(sheetData[key]))
    // }
    // console.log(sheetData)
    // decode_cell
    // 发送数据
    postMessage(XLSX.utils[outputFormat](sheetData, options))
  }
  // 以二进制方式打开文件
  fileReader.readAsArrayBuffer(file)
}
