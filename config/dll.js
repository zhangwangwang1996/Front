/**
 * @file DLL 文件相关配置
 * @author Anker(anker.wang@slicejobs.com)
 */
'use strict';

const path = require('path');

module.exports = {
  entry: {
    utils: [
      'axios',
      'lodash',
      'jquery',
      'moment',
      'crypto-js',
      'localforage',
      'vue-router',
      'vuex'
    ],
    plugins: [
      'vuedraggable',
      'cropperjs',
      'cropperjs/dist/cropper.css',
      'viewerjs',
      'viewerjs/dist/viewer.css',
      'video.js/dist/video-js.min.css',
    ]
  },
  manifestPath: path.resolve(__dirname, '../dist/dll/manifest/manifest.dll.json'),
  outputPath: path.resolve(__dirname, '../dist/dll'),
  publicPath: '/dll/',

  // Gzip off by default as many popular static hosts such as
  // Surge or Netlify already gzip all static assets for you.
  // Before setting to `true`, make sure to:
  // npm install --save-dev compression-webpack-plugin
  productionGzip: true,
  productionGzipExtensions: ['js', 'css'],
};
