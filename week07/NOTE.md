# 每周总结可以写在这里
## 浏览器工作原理
### 排版

第一代：normal flow
display inline-block  float

第二代：flex

第三代：grid

第四代：

flex简介：
Main Axis：元素排布方向

Cross Axis：与主轴垂直交叉方向

flex-direction: row
Main: width x left right

2. 收集行元素
分行：根据mainSize（主轴尺寸）分行，若设置了no-wrap，则强行分到第一行

3. 计算主轴
找出所有Flex元素
把主轴方向的剩余尺寸按比例分配给这些元素
若剩余空间为负数，所有flex元素为0，等比压缩剩余元素

4. 计算交叉轴
根据每一行中最大元素尺寸计算行高
根据行高flex-align和元素高度item-align确定元素位置


### 绘制

render

compsite

draw
viewPort

1. 绘制单个元素
依赖一个图形环境
npm包images
shader

2. 绘制dom