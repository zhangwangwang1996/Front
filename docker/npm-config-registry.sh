#!/bin/bash

# npm 淘宝源镜像
npm config set registry https://registry.npm.taobao.org && \
# node-gyp 编译依赖的 node 源码镜像
npm config set disturl https://npm.taobao.org/dist && \
# chromedriver 二进制包镜像
npm config set chromedriver_cdnurl https://npm.taobao.org/mirrors/chromedriver && \
# operadriver 二进制包镜像
npm config set operadriver_cdnurl https://npm.taobao.org/mirrors/operadriver && \
# phantomjs 二进制包镜像
npm config set phantomjs_cdnurl https://npm.taobao.org/mirrors/phantomjs && \
# fsevents 二进制包镜像
npm config set fse_binary_host_mirror https://npm.taobao.org/mirrors/fsevents && \
# node-sass 二进制包镜像
npm config set sass_binary_site https://npm.taobao.org/mirrors/node-sass && \
# electron 二进制包镜像
npm config set electron_mirror https://npm.taobao.org/mirrors/electron
