## Vue 入门

> 完整内容请参阅：https://cn.vuejs.org/
>
> 假设你已了解关于 HTML、CSS 和 JavaScript 的中级知识。如果你刚开始学习前端开发，将框架作为你的第一步可能不是最好的主意——掌握好基础知识再来吧！之前有其它框架的使用经验会有帮助，但这不是必需的。

Vue.js是一款轻量级的以**数据驱动**的前端JS框架，是一个通过简洁的API提供高效的**数据绑定**和灵活的组件系统。

使用Vue的项目：天猫、饿了么、小米商城、途牛、苏宁易购、微博头条等



#### 安装 vue.js

1.CDN

<script src="https://cdn.jsdelivr.net/npm/vue@2.6.6/dist/vue.js"></script>

2.NPM
在用 Vue 构建大型应用时推荐使用 NPM 安装
https://cn.vuejs.org/v2/guide/installation.html#NPM



#### Hello World

尝试 Vue.js 最简单的方法是使用 [JSRun 上的 Hello World 例子](http://jsrun.net/3ikKp/edit?utm_source=website)。

```html
<div id="app">
  {{ message }}
</div>
```

```js
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})
```

完整代码
```html
<!DOCTYPE HTML>
<html>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.6/dist/vue.js"></script>
    <body>
        <div id="app">
            {{ message }}
        </div>
        <script>
            var app = new Vue({
                el: '#app',
                data: {
                    message: 'Hello Vue!',
                },
            })
        </script>
    </body>
</html>
```

传统代码
```html
<!DOCTYPE HTML>
<html>
    <body>
        <div id="app"></div>
        <script>
            document.getElementById('app').innerText = 'Hello World!'
        </script>
    </body>
</html>
```

