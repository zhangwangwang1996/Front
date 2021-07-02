const path = require('path')
const webpack = require('webpack')
const config = require('../config/dll')

const webpackConfig = {
  plugins: [
    // dll manifest
    ...(function () {
      let res = []
      let keys = Object.keys(config.entry)
      keys.forEach(key => {
        res.push(new webpack.DllReferencePlugin({
          context: path.resolve(__dirname, '../'),
          manifest: require(path.posix.join(config.outputPath, 'manifest', `${key}-manifest.json`))
        }))
      });
      return res
    })()
  ]
}
module.exports = webpackConfig
