
### 更新路由name为title
##### 正则替换 `./src` 目录
```
(   name: ')(.+)(',)
   meta: \{
          title: '$2',
        \},
```
##### 文本替换 `./src` 目录
```
v-title="$route.name"
v-title="$route.meta.title"
```
