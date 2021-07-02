'use strict'

let externals = {
  'fabric': 'fabric',
}
let cdn = [
  '//s.slicejobs.com/static/web-cdn/tinymce/5.0.4/tinymce.min.js',
  '//s.slicejobs.com/static/web-cdn/fabric.js/2.3.6/fabric.min.js',
]

module.exports = {
  build: {
    externals: Object.assign({
      'vue': 'Vue',
      'element-ui': 'ELEMENT',
      'xlsx': 'XLSX',
      // 'echarts': 'echarts',
      // 'video.js': 'videojs',
    }, externals),
    cdn: [
      '//s.slicejobs.com/static/web-cdn/vue/2.6.10/vue.min.js',
      '//s.slicejobs.com/static/web-cdn/element-ui/2.8.2/index.js',
      '//s.slicejobs.com/static/web-cdn/xlsx/0.14.3/xlsx.full.min.js',
      // '//cdn.staticfile.org/echarts/4.2.0-rc.1/echarts.min.js',
      // '//cdn.staticfile.org/video.js/7.3.0/video.min.js',
    ].concat(cdn),
  },
  dev: {
    externals: Object.assign({}, externals),
    cdn: [].concat(cdn),
  },
}
