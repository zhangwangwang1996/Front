## Vue MVVM

下图不仅概括了MVVM模式（Model-View-ViewModel），还描述了在Vue.js中ViewModel是如何和View以及Model进行交互的。

* Model：模型层，主要负责业务数据相关

* View: 视图层，顾名思义，负责视图相关，细分下来就是html+css层

* ViewModel: View与Model沟通的桥梁，负责监听Model或者View的修改，是实现MVVM双向绑定的要点

![Model-View-ViewModel](./mvvm.png)

#### 双向绑定

脱离繁琐的DOM元素操作，专注于数据的状态得更新，完全基于数据驱动的编程。

 [JSRun 上的双向绑定例子](http://jsrun.net/eikKp/edit?utm_source=website)

```html
<div id="app-6">
  <p>{{ message }}</p>
  <input v-model="message">
</div>
```
```js
var app6 = new Vue({
  el: '#app-6',
  data: {
    message: 'Hello Vue!'
  }
})
```

#### 传统方式实现

绑定事件->触发input事件->获得input元素以及它的值->获得input的值->获得P元素->把input的值赋予P元素内

```html
<div>
  <p id="p"></p>
  <input id="input" type="text" oninput="onInput">
</div>
```
```js
function onInput (value) {
    var value = document.getElementById("input").value;
    document.getElementById("p").innerHTML = value;
}
```
