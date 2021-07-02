'use strict'

require('./check-versions')()

const config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

const opn = require('opn')
const express = require('express')

// default port where dev server listens for incoming traffic
const port = config.dev.port
const host = config.dev.host
// automatically open browser, if not set will be false
const autoOpenBrowser = !!config.dev.autoOpenBrowser

const app = express()

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve pure static assets
app.use(express.static('dist'))

let uri = 'http://' + host + ':' + port

let _resolve
const readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')

const server = app.listen(port, host, () => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
