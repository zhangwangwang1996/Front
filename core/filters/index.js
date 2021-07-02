/*
 * 字段过滤处理方法集
 * @Author: anker.wang
 * @Date: 2018-01-08 11:23:21
 * @Last Modified by: anker.wang
 * @Last Modified time: 2018-06-20 22:13:44
 */

import other from './other'
import strcase from './strcase'
import math from './math'
import date from './date'
import array from './array'
import oss from './oss'
import router from './router'

export default {
  ...date,
  ...math,
  ...strcase,
  ...array,
  ...oss,
  ...router,
  ...other,
}
