## Vue mixin table

> 表格页面的通用混合方法

* 搜索参数与URL路由参数双向同步
* 根据UI和API设计的通用分页、翻页方法
* 重置搜索表单
* 刷新表格内容
* 搜索字段为字符串时，移除前后空格

### 参数
-----
##### search: {}
搜索表单字段



##### refSearchForm: 'searchForm'
搜索表单的`ref`属性值



##### lastSearchParams: {}
上一次搜索的参数



##### searchFieldType: {}
搜索字段类型申明
```json
{
  number: Number,
  object: {
    id: Number,
    date: Date
  },
  array: {
    0: Number,
    1: Boolean
  },
}
```


##### table: []
表格数据



##### pagination: {}
分页参数
```json
{
  current_page: 1,
  per_page: 20,
  total: 0
}
```



### 方法
-----
##### onSearch ([params])
搜索列表



##### resetSearch ()
重置搜索表单



##### onRefresh ()
刷新当前页的表格数据



##### getTableData (params)
获得表格数据
> 必须重写，返回 `Promise` 对象



##### setTableData (params)
设置表格数据

> 从 `getTableData()` 拿到的数据进行处理



##### setSearchParams ([params])
设置搜索参数



##### getSearchParams ()
获得搜索参数



##### getSearchFieldType ()
获得搜索参数的类型声明
> 从路由上同步参数时会造成获得全部都是字符串



##### getPagination ()
获取分页数据



##### setPagination (pagination)
设置分页数据



##### handleSizePageChange (val)
处理分页大小变化



##### handleCurrentPageChange (val)
处理页码变化



##### loadTableData ([params])
加载表格数据



##### getRouterQueryParams ([query])
获得路由查询参数
> 必须 `search` 中存在的字段，通过申明的类型转换(不声明则采用 `search` 中的字段类型，数组和对象类型的字段除外)



##### setRouterQueryParams ([query])
设置路由查询参数
