## request
* 处理响应内容
* 处理错误信息，并提示错误。
* 处理无权限访问或网络错误时跳转错误页面

#### 异步请求
```js
// 不含任何处理
request.dispatch('apiName'[, params])

// 仅对数据进行了处理
request('apiName'[, params])

// 遇到响应错误会自动弹框显示
request.alert('apiName'[, params])

// 响应期间显示加载画面
request.loading('apiName'[, params])

// 包含 alert 和 loading
request.common('apiName'[, params])
```

#### 异步并发请求
```js
let a = request('a')
let b = request('b')
request.all([a, b]).then(([a, b]) => {})
```

----

#### 页面异步请求
```js
request.page('apiName'[, params])
```

#### 页面异步并发请求
```js
let a = request('a')
let b = request('b')
request.all.page([a, b]).then(([a, b]) => {})
```
> page方法仅用于首次进入页面时加载必须API时使用
> API无法访问或无权限访问将跳转到404、403页面

----

#### 需要解构的请求
```js
const getUsers = (params) => request('getUsers', params)
getUsers({ name: '张三' })
```
