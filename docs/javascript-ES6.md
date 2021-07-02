# [javascript ES6](http://es6.ruanyifeng.com/)

> ECMAScript 6.0（以下简称 ES6）是 JavaScript 语言的下一代标准，已经在 2015 年 6 月正式发布。



#### 语法提案的批准流程

* Stage 0 - Strawman（展示阶段）
* Stage 1 - Proposal（征求意见阶段）
* **Stage 2 - Draft（草案阶段）**
* Stage 3 - Candidate（候选人阶段）
* Stage 4 - Finished（定案阶段）



#### Babel 转码器

Babel 是一个广泛使用的 ES6 转码器，可以将 ES6 代码转为 ES5 代码，从而在现有环境执行。这意味着，你可以用 ES6 的方式编写程序，又不用担心现有环境是否支持。



#### babel-polyfill

* Babel 默认只转换新的 JavaScript 句法（syntax），而不转换新的 API，比如Iterator、Generator、Set、Map、Proxy、Reflect、Symbol、Promise等全局对象，以及一些定义在全局对象上的方法（比如Object.assign）都不会转码。
* 举例来说，ES6 在Array对象上新增了Array.from方法。Babel 就不会转码这个方法。如果想让这个方法运行，必须使用babel-polyfill，为当前环境提供一个垫片。



## 最常用的新特性

1. 默认参数
2. 模版字符串
3. 解构赋值
4. 属性的简洁表示法
5. 箭头函数 `=>`
6. Promise
7. 块级作用域的`let`和`const`
8. 类
9. 模块化



#### 模版字符串
大括号内部可以放入任意的 JavaScript 表达式，可以进行运算，以及引用对象属性。
```js
let x = 1;
let y = 2;
`${x} + ${y * 2} = ${x + y * 2}`
// "1 + 4 = 5"
let obj = {x: 1, y: 2};
`${obj.x + obj.y}`
// "3"
```
模板字符串之中还能调用函数。
```js
function fn() {
  return "Hello World";
}

`foo ${fn()} bar`
// foo Hello World bar
```
多行字符串
```js
`In JavaScript this is
 not legal.`

console.log(`string text line 1
string text line 2`);
```



#### 属性的简洁表示法
> ES6 允许直接写入变量和函数，作为对象的属性和方法。这样的书写更加简洁
```js
const foo = 'bar';
const baz = {foo};
baz // {foo: "bar"}

// 等同于
const baz = {foo: foo};
```



#### 变量的解构赋值

> 本质上，这种写法属于“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值。
```js
// 变量赋值
let [a, b, c] = [1, 2, 3];

// 使用嵌套数组进行解构
let [foo, [[bar], baz]] = [1, [[2], 3]];

// 不完全解构，即等号左边的模式，只匹配一部分的等号右边的数组。
let [a, [b], d] = [1, [2, 3], 4];

// 解构赋值允许指定默认值。ES6 内部使用严格相等运算符（===）
let [foo = true] = [];

// 对象的解构赋值
let { foo, bar } = { foo: "aaa", bar: "bbb" };

// 真正被赋值的是后者，而不是前者。(对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。)
let { foo: baz } = { foo: "aaa", bar: "bbb" };

// 字符串、数字、布尔值也可以解构赋值
```


#### 箭头函数(=>)

```js
// ES6 允许使用“箭头”（=>）定义函数。
var sum = (num1, num2) => num1 + num2;

// 等同于
var sum = function(num1, num2) {
  return num1 + num2;
};


// 函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。
function foo() {
  setTimeout(() => {
    console.log('id:', this.id);
  }, 100);
}
var id = 21;
foo.call({ id: 42 });
// id: 42
```


#### 扩展运算符 spread（...）

```js
// 将一个数组转为用逗号分隔的参数序列
[1].push(...[4, 38]); // [1, 4, 38]

let z = { a: 3, b: 4 };
// 用于取出参数对象的所有可遍历属性，拷贝到当前对象之中
let n = { ...z, c:1 }; // { a: 3, b: 4, c:1 }
// 与解构赋值结合
const [
  first, // 1
  ...rest // [2, 3, 4, 5]
  ] = [1, 2, 3, 4, 5];
const { 
  x, // 1
  y, // 2
  ...z // { a: 3, b: 4 }
} = { x: 1, y: 2, a: 3, b: 4 };
```



#### Promise 对象
> Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。它由社区最早提出和实现，ES6 将其写进了语言标准，统一了用法，原生提供了Promise对象。

```js
const promise = new Promise((resolve, reject) => {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});

// 使用 promise
promise.then(function(value) {
  // success
}, function(error) {
  // failure
}).catch(function(error) {
  // 处理 getJSON 和 前一个回调函数运行时发生的错误
  console.log('发生错误！', error);
}).finally(() => {
  // 不管 Promise 对象最后状态如何，都会执行的操作。
});
```

