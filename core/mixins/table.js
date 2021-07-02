/*
 * 表格页面的通用方法
 * @Author: anker.wang
 * @Date: 2018-01-08 11:25:59
 * @Last Modified by: anker.wang
 * @Last Modified time: 2018-06-27 12:12:26
 * @Description 路由参数自动同步到搜索参数;在路由更新时获得表格数据;使用分页和搜索事件自动变更路由
 */

import moment from 'moment'

export default {
  data () {
    return {
      // 搜索表单字段
      search: {},
      // 搜索字段申明
      searchFieldType: {},
      // 表格数据
      table: [],
      // 分页参数
      pagination: {
        current_page: 1,
        per_page: 50,
        total: 0,
      },
      refSearchForm: 'searchForm',
      lastSearchParams: {},
      isLoadTableInBeforeRouteEnter: true,
      isLoadTableInBeforeRouteUpdate: true,
    }
  },
  // 路由进入时
  beforeRouteEnter (to, from, next) {
    // 在导航转入新的路由前
    next(vm => {
      if (vm.isLoadTableInBeforeRouteEnter) {
        // 处理路由参数
        let queryParams = vm.getRouterQueryParams(to.query, to.params)
        // 设置搜索参数。 当仅 params 更新时, 需要全部重置 search 数据
        vm.setSearchParams(_.merge(vm.$options.data.call(vm).search, queryParams))
        // 加载表格数据
        vm.loadTableData(queryParams)
      }
    })
  },
  // 路由更新时
  beforeRouteUpdate (to, from, next) {
    if (this.isLoadTableInBeforeRouteUpdate) {
      // 处理路由参数
      let queryParams = this.getRouterQueryParams(to.query, to.params)
      // 加载表格数据
      this.loadTableData(queryParams)
    }
    // 继续加载路由
    next()
  },
  methods: {
    /**
     * 获得表格数据
     * @param {*} params
     */
    getTableData (params) {

    },
    /**
     * 设置表格数据
     * @param {*} params
     */
    setTableData ({data}) {
      this.$set(this, 'table', data.data)
      this.setPagination(data)
    },
    /**
     * 获得搜索参数
     */
    getSearchParams () {
      return this.search
    },
    /**
     * 设置搜索参数
     */
    setSearchParams (params) {
      setParams(this.search, params)
    },
    /**
     * 获得搜索参数的类型声明
     * @description 从路由上同步参数时会造成获得全部都是字符串
     */
    getSearchFieldType () {
      return this.searchFieldType
    },
    /**
     * 获取分页数据
     */
    getPagination () {
      return {
        current_page: this.pagination.current_page,
        per_page: this.pagination.per_page,
      }
    },
    /**
     * 设置分页数据
     * @pagination {current_page, per_page, total}
     */
    setPagination (pagination) {
      // 转换数据类型
      pagination = conveSomeDataType(pagination, this.pagination)
      // 设置参数
      setParams(this.pagination, pagination)
    },
    /**
     * 处理分页大小时的变化
     * @param {*} val
     */
    handleSizePageChange (val) {
      this.setPagination({per_page: val})
      this.setRouterQueryParams({
        ...this.getRouterQueryParams(),
        ...this.getPagination(),
      })
    },
    /**
     * 处理页码变化
     * @param {*} val
     */
    handleCurrentPageChange (val) {
      this.setPagination({current_page: val})
      this.setRouterQueryParams({
        ...this.getRouterQueryParams(),
        ...this.getPagination(),
      })
    },
    /**
     * 获得路由参数
     * 必须 search 中存在的字段，通过申明的类型转换
     * @param {*} query
     * @param {*} params
     */
    getRouterQueryParams (query = this.$route.query, params = this.$route.params) {
      // 删除标识路由更新的空名字段
      if (query.hasOwnProperty('')) {
        delete query['']
      }
      if (params.hasOwnProperty('')) {
        delete params['']
      }
      // 获得参数默认值
      let {pagination, search} = this.$options.data.call(this)
      return conveSomeDataType({...query, ...params}, {
        ...search,
        ...pagination,
      }, this.getSearchFieldType())
    },
    /**
     * 设置路由参数
     * @description 设置路由参数
     */
    setRouterQueryParams (query = {}) {
      let {pagination, search} = this.$options.data.call(this)
      this.$router.replace({
        query: {
          // 移除分页默认值
          ...removeEmptyParams(
            trimParams(
              removeDefaultParams(query, {...search, ...pagination}),
            ),
          ),
          // 用于相同的搜索参数时也触发路由更新
          '': moment().format('HHmmssSS'),
        },
      })
    },
    /**
     * 加载表格数据
     * @param {*} params
     */
    loadTableData (params) {
      // 移除空的参数
      params = removeEmptyParams({
        ...this.getSearchParams(),
        ...params,
      })
      // 设置默认分页大小值
      let {pagination} = this.$options.data.call(this)
      params = setDefaultParams(params, {
        current_page: pagination.current_page,
        per_page: pagination.per_page,
      })
      // 保存本次请求参数
      this.lastSearchParams = params
      // 获得表格数据
      this.getTableData(params).then(this.setTableData)
    },
    /**
     * 刷新当前页的表格数据
     */
    onRefresh () {
      // 根据上次请求数据再次获取
      return this.getTableData(this.lastSearchParams).then(this.setTableData)
    },
    /**
     * 搜索列表方法
     * @param {*} params
     */
    onSearch (params) {
      const search = () => {
        this.setPagination({current_page: 1})
        this.setRouterQueryParams({
          ...this.getPagination(),
          ...this.getSearchParams(),
          ...params,
        })
      }
      // 验证填写参数
      let searchForm = this.$refs[this.refSearchForm]
      if (searchForm) {
        searchForm.validate((valid) => {
          if (valid) {
            search()
          } else {
            this.$message.error('搜索内容填写不正确！')
          }
        })
      } else {
        search()
      }
    },
    /**
     * 重置表单方法
     */
    resetSearch () {
      this.$refs[this.refSearchForm].resetFields()
    },
  },
}

/**
 * 移除参数中的默认参数
 * @param params
 * @param defaultParams
 * @returns {*}
 */
export function removeDefaultParams (params, defaultParams) {
  for (const key in defaultParams) {
    if (defaultParams.hasOwnProperty(key) && params.hasOwnProperty(key)) {
      if (_.isEqual(defaultParams[key], params[key])) {
        delete params[key]
      }
    }
  }
  return params
}

/**
 * 移除参数中字符串的前后空格
 * @param params
 * @param defaultParams
 * @returns {*}
 */
export function trimParams (params) {
  for (const key in params) {
    if (params.hasOwnProperty(key) && typeof params[key] === 'string') {
      params[key] = params[key].trim()
    }
  }
  return params
}

/**
 * 删除空的参数
 * @param params
 * @returns {*}
 */
export function removeEmptyParams (params) {
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      // 为数组时必须长度大于0
      if (params[key] instanceof Array && params[key].length === 0) {
        delete params[key]
      }
      // 空字符串或者null时删除字段
      if (params[key] === '' || params[key] === null) {
        delete params[key]
      }
    }
  }
  return params
}

/**
 * 设置数据
 * @param params
 * @param newParams
 * @returns {*}
 */
export function setParams (params, newParams) {
  for (const key in params) {
    if (params.hasOwnProperty(key) && newParams.hasOwnProperty(key)) {
      if (params[key] && params[key].constructor === Object) {
        setParams(params[key], newParams[key])
      } else {
        Vue.set(params, key, newParams[key])
      }
    }
  }
  return params
}

/**
 * 设置默认参数
 * @param params
 * @param defaultParams
 * @returns {*}
 */
export function setDefaultParams (params, defaultParams) {
  for (const key in defaultParams) {
    if (defaultParams.hasOwnProperty(key) && !params.hasOwnProperty(key)) {
      params[key] = defaultParams[key]
    }
  }
  return params
}

/**
 * 数据类型转换
 * @param value
 * @param type
 */
export function conveDataType (value, type) {
  // 类型相同不用转换
  if (value.constructor !== type) {
    // 实际类型为对象时进入内部
    if (type.constructor === Object && Object.keys(type).length > 0) {
      for (const key in value) {
        if (value.hasOwnProperty(key)) {
          // 声明为对象时逐个转换
          value[key] = conveDataType(value[key], type[key])
        }
      }
    } else {
      value = type(value)
    }
  }
  return value
}

/**
 * 转换一些数据类型
 * @param params
 * @param defaultParams
 * @param types
 * @returns {*}
 * @description
 * types = {
 *   count: Number,
 *   object: {
 *     id: Number,
 *     date: Date
 *   },
 *   array: {
 *     0: Number,
 *     1: Boolean
 *   },
 * }
 */
export function conveSomeDataType (params, defaultParams, types) {
  for (const key in params) {
    if (params.hasOwnProperty(key) &&
      params[key] !== null &&
      params[key] !== undefined &&
      defaultParams.hasOwnProperty(key)) {
      // 存在数据声明
      if (types && types.hasOwnProperty(key)) {
        params[key] = conveDataType(params[key], types[key])
      } else if (defaultParams[key] !== null && defaultParams[key] !== undefined) {
        // 不存在获取默认参数的数据原类型
        let paramType = defaultParams[key].constructor
        // 只对非对象数组的参数进行转换
        if (paramType !== Object) {
          params[key] = conveDataType(params[key], paramType)
        }
      }
    }
  }
  return params
}

