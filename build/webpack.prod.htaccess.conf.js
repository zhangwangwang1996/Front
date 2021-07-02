const path = require('path')
const config = require('../config')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const webpackConfig = {
  plugins: [
    // copy .htaccess, vue-router history mode
    // https://router.vuejs.org/zh-cn/essentials/history-mode.html
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../.htaccess'),
        to: config.build.assetsRoot
      }
    ])
  ]
}
module.exports = webpackConfig
