#### HTML属性换行设置
> 参考自 https://www.jetbrains.com/help/phpstorm/settings-code-style-html.html
```
Preferences | Editor | Code Style | HTML > Other  > Wrap attributes :  Wrap always
```



#### 配置 import/export 使用花括号{}时的空格

```
Preferences | Editor | Code Style | JavaScript | Spaces > ES6 import/export braces
```



#### 配置 Vue 使用 script、style 标签首层代码允许缩进

> 参考自 [Vue 设置 Script 标签首层不缩进](https://www.jianshu.com/p/622c463ff925)

```
Preferences | Editor | Code Style | HTML | Other > Do not indent children of: ……,script,style
```



#### 自动保存设置

```
Preferences | Appearance & Behavior | System Settings > Synchronization
```



#### 未保存标记

```
Preferences | Editor | General | Editor Tabs > Tab Appearance > Mark modified tabs with asterisk
```



#### 配置 JavaScript 语言版本

```
Preferences | Languages & Frameworks | JavaScript
```



#### 配置内存上限

```base
$ vim /Applications/PhpStorm.app/Contents/bin/phpstorm.vmoptions
# -Xms128m
# -Xmx768m
```



#### 使用宏录制开启保存并格式化
> https://stackoverflow.com/questions/12496669/code-reformatting-on-save-in-phpstorm