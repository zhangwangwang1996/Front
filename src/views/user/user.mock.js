/**
 * https://github.com/nuysoft/Mock/wiki/Mock.Random
 * Type     Method
 * Basic    boolean, natural, integer, float, character, string, range, date, time, datetime, now
 * Image    image, dataImage
 * Color    color
 * Text     paragraph, sentence, word, title, cparagraph, csentence, cword, ctitle
 * Name     first, last, name, cfirst, clast, cname
 * Web      url, domain, email, ip, tld
 * Address  area, region
 * Helper   capitalize, upper, lower, pick, shuffle
 */

/* global process */

import Mock from 'mockjs'
import make from '@core/mock/make'

let base = window._env_.VUE_APP_HOST

Mock.setup({
  timeout: '300-1000',
})

Mock.mock(new RegExp(`${base}/getUserTable`), 'post', function (options) {
  let template = {
    name: () => Mock.Random.cname(),
    phone: () => Mock.Random.integer(13000000000, 19999999999),
    email: () => Mock.Random.email('slicejobs.com'),
    created_at: () => Mock.Random.date('yyyy-MM-dd HH:mm:ss'),
  }
  return make.table(options, template)
})

Mock.mock(new RegExp(`${base}/getUserDetail/[1-9]\\d*`), 'get', function (options) {
  let template = {
    id: () => Mock.Random.integer(1, 10000),
    name: () => Mock.Random.cname(),
    phone: () => Mock.Random.integer(13000000000, 19999999999),
    email: () => Mock.Random.email('slicejobs.com'),
    created_at: () => Mock.Random.date('yyyy-MM-dd HH:mm:ss'),
  }
  return make.data(template)
})

Mock.mock(new RegExp(`${base}/exportUserData/[1-9]\\d*`), 'get', function (options) {
  let title = ['名称', '手机号', '邮箱', '注册日期']
  let template = [
    () => Mock.Random.cname(),
    () => Mock.Random.integer(13000000000, 19999999999),
    () => Mock.Random.email('slicejobs.com'),
    () => Mock.Random.date('yyyy-MM-dd HH:mm:ss'),
  ]
  return make.export(options, title, template)
})


Mock.mock(new RegExp(`${base}/deleteUserData/[1-9]\\d*`), 'post', function (options) {
  let template = {}
  return make.data(template)
})

Mock.mock(new RegExp(`${base}/createUserData`), 'post', function (options) {
  let template = {}
  return make.data(template)
})

Mock.mock(new RegExp(`${base}/updateUserData/[1-9]\\d*`), 'post', function (options) {
  let template = {}
  return make.data(template)
})
