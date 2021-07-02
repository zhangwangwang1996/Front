function randomPagination (pagination) {
  return {
    current_page: pagination.current_page || 1,
    per_page: pagination.per_page || 20,
    total: 998,
  }
}

function getStartID (pagination) {
  return (pagination.current_page - 1) * pagination.per_page + 1
}

function getParams (options) {
  let params = !options.body || JSON.parse(options.body)
  return {
    ...filter.URLParamsParse(options.url),
    ...params,
  }
}

function makeTable (options, template) {
  let pagination = randomPagination(getParams(options))
  let startID = getStartID(pagination)
  let data = []
  for (let index = 0; index < pagination.per_page; index++) {
    let _data = {
      id: startID + index,
    }
    for (const key in template) {
      if (template.hasOwnProperty(key)) {
        _.set(_data, key, template[key]())
      }
    }
    data.push(_data)
  }
  return {ret: 0, detail: {...pagination, data}}
}

function makeExport (options, title, template) {
  let pagination = randomPagination(getParams(options))
  let startID = getStartID(pagination)
  let data = [['ID', ...title]]
  for (let index = 0; index < pagination.per_page; index++) {
    let _data = [startID + index]
    for (let i = 0; i < template.length; i++) {
      _data.push(template[i]())
    }
    data.push(_data)
  }
  return {ret: 0, detail: {...pagination, data}}
}

function makeData (template) {
  let data = {}
  for (const key in template) {
    data[key] = template[key]()
  }
  return {ret: 0, detail: data}
}

export default {
  table: makeTable,
  export: makeExport,
  data: makeData,
}
