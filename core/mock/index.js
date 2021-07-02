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

// 载入 views 目录下所有文件模块
require('@utils/requires').requires(require.context('@views', true, /\.mock\.js$/))
