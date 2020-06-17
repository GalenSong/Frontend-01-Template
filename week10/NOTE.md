# 每周总结可以写在这里
## Range API
var range = new Range()
range.setStart(element, 9)
range.setEnd(element, 4)
var range = document.getSelection().getRangeAt(0)

range.setStartBefore
range.setEndBefore
range.setStartAfter
range.setEndAfter
range.selectNode
range.selectNodeContents

var fragment = range.extractContents()
range.insertNode(document.createTextNode("aaaa"))


# CSSOM
## document.styleSheets
data uri

## Rules
document.styleSheets[0].cssRules
document.styleSheets[0].insertRule("p{color:pink;}", 0)
document.styleSheets[0].removeRule(0)

## Rule
CSSStyleRule
    selectorText
    style

CSSCharsetRule
CSSImportRule

## getComputedStyle
window.getComputedStyle(elt, pseudoElt)

## window API

## 滚动API
window.scrollY
window.scroll()
window.scrollBy()

scrollTo()
scrollTop
scrollLeft
scrollHeight

getClientRects()
getBoundingClientRect()

innerHeight
innerWidth

devicePixelRatio

document.documentElement.getBoundingClientRect()

window.onerror

IDE

shader

three.js
webp