## 排版
## 盒（box）
源代码 标签（tag）
语义 元素（element）
表现 盒（Box）

node包含element等

DOM树中存储的是元素和其他类型的节点（Node）
CSS选择器选中的是元素
排版和渲染的基本单位是盒

## 盒模型
https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Box_Model/Introduction_to_the_CSS_box_model

content     content-box
padding
border      border-box
margin

box-sizing: content-box border-box

## 正常流
### 正常流排版
收集盒进行
计算盒在行中的排布
计算行的排布

inline-box inline-box (inline formatting context)

line-box (block formatting context)
block-box

### 正常流行模型
$0.getClientRects()

### float与clear
float设计初衷是实现文字元素混排
会导致重排
display: inline-block 空隙 \n

### margin折叠
只会发生在bfc中 bfc方向

## flex
### flex排版
