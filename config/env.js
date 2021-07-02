/**
 * @file 项目自定义配置文件
 * @author Anker(anker.wang@slicejobs.com)
 */

const chalk = require('chalk')
const shell = require('shelljs')
const env = require('dotenv').config().parsed;

// .env 环境配置文件不存在
if (!env) {
  console.log(chalk.red('.env环境配置文件读取错误，请检查。'));
  console.log(chalk.cyan('请尝试运行 cp .env.example .env 解决。'));
  process.exit();
}

// 读取 package.json 中的配置
let appVersion = require('../package.json').version + `(${(new Date()).toJSON().substr(8, 8).replace(/[^0-9]/ig, '')})`
// 获得 git 仓库版本
if (shell.which('git')) {
  console.log('\n$ git rev-parse --short HEAD')
  shortCommit = shell.exec('git rev-parse --short HEAD').toString().trim()
  console.log('$ git describe --all')
  appVersion = shell.exec('git describe --all').toString().trim().split('/').pop()
  appVersion += `(${shortCommit})`
  console.log('')
} else {
  console.log(chalk.yellow('没有查找到 git 命令，使用 package.json 内的版本。'));
}

const config = {
  VUE_APP_VERSION: appVersion,
  ...env
}

for (let key in config) {
  if (config.hasOwnProperty(key)) {
    let value = config[key]
    if (process.env.hasOwnProperty(key)) {
      value = process.env[key]
    }
    config[key] = JSON.stringify(value)
  }
}

module.exports = config
