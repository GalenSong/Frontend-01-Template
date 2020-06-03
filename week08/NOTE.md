# 每周总结可以写在这里
选择器
## 选择器语法

### 简单选择器
*
div svg|a (namespace xml语法)
.cls
#id
[attr=value]
:hover
::before

### 选择器语法
复合选择器
<简单选择器><简单选择器><简单选择器>
* 或者div必须写在最前面

复杂选择器
<复合选择器><sp><复合选择器>
<复合选择器>">"<复合选择器>
<复合选择器>"~"<复合选择器>
<复合选择器>"+"<复合选择器>
<复合选择器>"||"<复合选择器>

选择器列表

## 选择器优先级
[行内, #id, .class|属性选择器, div]

div#a.b .c[id=x]    [0, 1, 3, 1]
#a:not(#b)  [0, 2, 0, 0]
*.a    [0, 0, 1, 0]
div.a   [0, 0, 1, 1]

## 伪类
### 链接/行为
:any-link
:link :visited
:hover
:active
:focus
:target

### 树结构
:empty
:nth-child()
:nth-last-child()
:first-child :last-child :only-child

### 逻辑型
:not伪类
:where :has

## 伪元素
::before
::after
::firstline {
    font
    color
    background
    word-spacing
    letter-spacing
    text-decoration
    text-transform
    line-height
}
::firstletter {
    font
    color
    background
    text-decoration
    text-transform
    letter-spacing
    word-spacing
    line-height
    float
    vertical-align
    margin,padding,border
}

作业：编写一个match函数
function match(selector, element) {
    return true
}

