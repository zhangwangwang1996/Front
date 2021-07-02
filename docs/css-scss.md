# [CSS扩展语言之sass与scss](https://www.sasscss.com/)


> SCSS 是 Sass 3 引入新的语法，其语法完全兼容 CSS3，并且继承了 Sass 的强大功能。也就是说，任何标准的 CSS3 样式表都是具有相同语义的有效的 SCSS 文件。

其区别在于语法书写方式不同，Sass 是以严格的缩进式语法规则来书写，不带大括号({})和分号(;)，而 SCSS 的语法书写和我们的 CSS 语法书写方式非常类似。

```scss
/* 引入文件 */
@import "themes/night-sky.scss";
/* 声明变量 */
$color: #333;
/* 嵌套CSS */
#content {
  article {
  	/* 引用变量 */
    h1 { color: $color }
    p { margin-bottom: 1.4em }
    /* 父选择器的标识符& */
    &.active { color: green }
  }
  aside { background-color: #EEE }
}

/* 编译后 */
#content article h1 { color: #333 }
#content article p { margin-bottom: 1.4em }
#content article.active { color: green }
#content aside { background-color: #EEE }
```
