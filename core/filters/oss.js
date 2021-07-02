function isOss (value) {
  return value.includes('.aliyuncs.com') || /sj[a-zA-z]+\.slicejobs\.com/.test(value)
}

/**
 * 获得OSS正确的URL协议和地址
 * @param {*} value
 * @param {*} suffix
 */
function ossHost (value, suffix = '') {
  if (!value) return ''
  if (!isOss(value)) return value
  value = value.toString()
  // 把http以及https替换为自动协议
  value = value.replace(/^https*:\/\//, '//')
  // 追加后缀前取消原后缀
  if (suffix) {
    value = value.replace(/[?&#].*$/, '') + suffix
  }
  // 把已存在的错误URl修正, img开头无法访问https
  // https://help.aliyun.com/knowledge_detail/39539.html
  value = value.replace('img-cn-shanghai.aliyuncs.com', 'oss-cn-shanghai.aliyuncs.com')
  return value
}

/**
 * 获得文件名
 *
 * @param src
 * @returns {*}
 */
function baseName (src) {
  return src.replace(/[?&#].*$/, '').replace(/^.*\//, '')
}

/**
 * 格式化图片为JPG
 *
 * @param string
 * @returns {string}
 */
function ossFormatJpg (string) {
  return ossHost(string, '?x-oss-process=image/format,jpg')
}

/**
 * 自动图片旋转到正方向
 *
 * @param string
 * @returns {string}
 */
function ossAutoOrient (string) {
  return ossHost(string, '?x-oss-process=image/auto-orient,1')
}

/**
 * 获得缩略图
 *
 * @param value
 * @param width
 * @param height
 * @param color
 * @returns {*}
 */
function ossThumbnail (value, width, height = 0, color = '') {
  let mode = ''
  if (typeof height === 'string') {
    color = height
    height = null
  }

  if (!height) {
    height = width
  }

  if (color) {
    color = `,color_${color}`
    mode = ',m_pad'
  }

  if (height) {
    height = `,h_${height}`
  }

  if (width) {
    width = `,w_${width}`
  }
  return ossHost(value, `?x-oss-process=image/resize${mode}${width}${height}${color}`)
}

function ossConvertMP4 (value) {
  value = ossHost(value)
  let ext = ''
  let index = value.lastIndexOf('.')
  if (index !== -1) {
    ext = value.substr(index + 1)
  }
  if (ext === 'mp4' || ext === '3gp') {
    return value.substr(0, index).replace('taskcert', 'slicejobsvideo') + '.mp4'
  }
  return value
}

function ossImageInfo (value) {
  return axios.create().get(ossHost(value, '?x-oss-process=image/info'))
}

export default {isOss, ossHost, baseName, ossFormatJpg, ossThumbnail, ossConvertMP4, ossImageInfo, ossAutoOrient}
