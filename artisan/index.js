#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

var argv = process.argv.splice(2)
var viewPath = path.normalize('src/views')
var viewTemplatePath = path.normalize(path.join(__dirname, './make/view'))

/**
 * 匹配字符串为单词
 * @param str
 */
function matchStrCase (str) {
  return str && str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
}

function toCamelCase (str, isLarge = false) {
  str = matchStrCase(str)
    .map(x => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
    .join('')
  return isLarge ? str : str.slice(0, 1).toLowerCase() + str.slice(1)
}

function toSeparatorCase (str, separator = '_') {
  return matchStrCase(str)
    .map(x => x.toLowerCase())
    .join(separator)
}

function writeFile (fileName, modelName, pageName, writePath) {
  let viewName = toCamelCase(modelName, false)
  let ViewName = toCamelCase(modelName, true)
  let routeName = toSeparatorCase(modelName, '-')
  let readPath = path.join(viewTemplatePath, fileName)
  let _writePath = writePath(fileName, viewName, ViewName, routeName)
  fs.readFile(readPath, 'utf8', (err, data) => {
    if (err) {
      console.error(`读取模板文件错误：${readPath}`)
    } else {
      let string = data.toString()
        .replace(/viewName/g, viewName)
        .replace(/ViewName/g, ViewName)
        .replace(/routeName/g, routeName)
        .replace(/页面名称/g, pageName)
      fs.writeFile(_writePath, string, function (err) {
        err ? console.error(`写入文件错误：${_writePath}`)
          : console.error(`写入文件成功：${_writePath}`)
      })
    }
  })
}

if (argv[0] === 'make:view') {
  let modelName = argv[1]
  let pageName = argv[2] || modelName
  if (modelName) {
    // 路径是否存在
    viewPath = path.join(viewPath, toSeparatorCase(modelName, '-'))
    if (fs.existsSync(viewPath)) {
      console.error(`${viewPath} 路径已存在`)
    } else {
      fs.mkdirSync(viewPath)
      fs.mkdirSync(path.join(viewPath, 'pages'))
      let writeJsPath = (fileName, viewName, ViewName, routeName) => {
        return path.join(viewPath, routeName + '.' + fileName)
      }
      let writeVuePath = (fileName, viewName, ViewName, routeName) => {
        return path.join(viewPath, 'pages', ViewName + fileName)
      }
      writeFile('api.js', modelName, pageName, writeJsPath)
      writeFile('mock.js', modelName, pageName, writeJsPath)
      writeFile('route.js', modelName, pageName, writeJsPath)
      writeFile('rules.js', modelName, pageName, writeJsPath)
      writeFile('store.js', modelName, pageName, writeJsPath)
      writeFile('mixins.js', modelName, pageName, writeJsPath)
      writeFile('Table.vue', modelName, pageName, writeVuePath)
      writeFile('Form.vue', modelName, pageName, writeVuePath)
      writeFile('Detail.vue', modelName, pageName, writeVuePath)
    }
    // let componentsPath = path.join(viewPath, 'components')
    // if (!fs.existsSync(componentsPath)) fs.mkdirSync(componentsPath)
    // let mixinsPath = path.join(viewPath, 'mixins')
    // if (!fs.existsSync(mixinsPath)) fs.mkdirSync(mixinsPath)
    // let langPath = path.join(viewPath, 'lang')
    // if (!fs.existsSync(langPath)) fs.mkdirSync(langPath)
  } else {
    console.error('缺少 viewName 参数')
  }
} else {
  console.error('可用方法 node artisan make:view [viewName] 页面名称')
}
