# 重学HTML
## HTML定义：XML与SGML

## DTD与XML namespace
DTD站在SGML角度定义html, HTML5脱离SGML

## 语义

aside标识页面中非主体的内容，与main对应
hr标识故事走向或话题走向
abbr
section
samp
pre
figure
figcaption
<dfn>
dl
dd<!-- defination description -->
dt<!-- defination term -->
cite 引用文章名
quote 引用文章内容
time
adress

## 合法元素
Element: <tagname></tagname>
Text: text
Comment
DocumentType
ProcessingInstruction
CDATA

## 字符引用
&#161;
&amp;
&lt;
&quot;

## DOM
Node
    element
        HTMLElement
        SVGElement
    Document
    CharacterData
        text
        Comment
        ProcessingInstruction
    DocumentFragment
    DocumentType

## 导航类操作
parentNode
childNodes
firstChild
lastChild
nextSibling
nextSibling
previousSibling

## 修改操作
appendChild
insertBefore
removeChild
replaceChild
所有元素都不能被插入DOM树两次，一但二次插入，第一次插入的位置会自动移除
所有js操作会实时改变children、childrenNodes的值 [livingCollection]

## 高级操作
compareDocumentPosition
contains
isEqualNode
isSameNode
cloneNode

## Event
addEventListen


Browser API
    DOM
        DOM tree
        Events
        Range
    CSSOM
    BOM
    Web animation


元素曝光埋点
passive