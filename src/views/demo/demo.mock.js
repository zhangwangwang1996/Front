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

Mock.mock(new RegExp(`${base}/getDemoTable`), 'post', function (options) {
  let template = {
    name () { return Mock.Random.cname() },
    phone () { return Mock.Random.integer(13000000000, 19999999999) },
    email () { return Mock.Random.email('slicejobs.com') },
    comment: () => Mock.Random.csentence(6, 60),
    disabled: () => Mock.Random.integer(0, 1),
    created_at () { return Mock.Random.date('yyyy-MM-dd HH:mm:ss') },
  }
  return make.table(options, template)
})

Mock.mock(new RegExp(`${base}/getDemoDetail/[1-9]\\d*`), 'get', function (options) {
  let template = {
    id () { return Mock.Random.integer(1, 10000) },
    name () { return Mock.Random.cname() },
    phone () { return Mock.Random.integer(13000000000, 19999999999) },
    email () { return Mock.Random.email('slicejobs.com') },
    created_at () { return Mock.Random.date('yyyy-MM-dd HH:mm:ss') },
  }
  return make.data(template)
})

Mock.mock(new RegExp(`${base}/exportDemoData/[1-9]\\d*`), 'get', function (options) {
  let title = ['名称', '手机号', '邮箱', '注册日期']
  let template = [
    () => Mock.Random.cname(),
    () => Mock.Random.integer(13000000000, 19999999999),
    () => Mock.Random.email('slicejobs.com'),
    () => Mock.Random.date('yyyy-MM-dd HH:mm:ss'),
  ]
  return make.export(options, title, template)
})

Mock.mock(new RegExp(`${base}/deleteDemoData/[1-9]\\d*`), 'post', function (options) {
  let template = {}
  return make.data(template)
})

Mock.mock(new RegExp(`${base}/deleteMultipleDemoData`), 'post', function (options) {
  let template = {}
  return make.data(template)
})

Mock.mock(new RegExp(`${base}/createDemoData`), 'post', function (options) {
  let template = {}
  return make.data(template)
})

Mock.mock(new RegExp(`${base}/updateDemoData/[1-9]\\d*`), 'post', function (options) {
  let template = {}
  return make.data(template)
})

Mock.mock(new RegExp(`${base}/uploadDemoImage`), 'post', function (options) {
  let template = {
    url: () => 'https://slicejobsmisc.oss-cn-shanghai.aliyuncs.com/prod/imgr/product/zan-wu-tu-pian-0-20180424_160209_976990.png',
  }
  return make.data(template)
})
