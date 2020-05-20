# 每周总结可以写在这里

## 浏览器工作原理

### 浏览器工作流程：
URL ===HTTP===> HTML ===parse===> DOM ===CSS computing===> DOM with CSS ===layout ===> DOM with position ===render===> Bitmap

### ISO-OSI七层网络结构
|应用|     
表示       |HTTP|
会话       
传输        TCP
网络        Internet
数据链路     4G/5G/WIFI
物理层

### TCP与IP

### HTTP
Request
Response

### 实现httpClient
主要通过net包的net.createConnection方法实现HTTPClient
包含request和response两部分；
request中主要封装了连接服务器并发送请求的逻辑；
request向外暴露send方法供调用者发送请求；

当与服务器连接成功并发送请求后，服务器响应客户端请求；
客户端监听socket对象的"data"事件可以获取服务器返回的数据；
根据Transfer-Encoding编码形式不同，服务器以不同形式返回数据；
客户端需要对服务器返回的数据进行解析；
Transfer-Encoding: chunked编码会使服务器以分块的形式返回数据；
由于分块发送，必须使用 状态机 依次对每个块中的数据进行处理；
使用状态机依次处理状态行、header及body中的数据；
最终将数据返回给用户；

> keyWords:
Transfer-Encoding：Transfer-Encoding 消息首部指明了将 entity 安全传递给用户所采用的编码形式；(https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Transfer-Encoding)
Transfer-Encoding: chunked
数据以一系列分块的形式进行发送。 Content-Length 首部在这种情况下不被发送。。在每一个分块的开头需要添加当前分块的长度，以十六进制的形式表示，后面紧跟着 '\r\n' ，之后是分块本身，后面也是'\r\n' 。终止块是一个常规的分块，不同之处在于其长度为0。终止块后面是一个挂载（trailer），由一系列（或者为空）的实体消息首部构成。

状态机：
是有限状态自动机的简称，是现实事物运行规则抽象而成的一个数学模型。
状态机通常包含有限个状态，通过输入或事件（Event）执行某一动作（Action）实现状态切换（Transition）
注意：状态机的当前状态是其所包含的有限状态之一；一个动作执行会将当前状态转换为另一状态

## HTML ---> DOM
### 文件拆分
parser接受HTML文本作为参数，返回DOM树

### 创建状态机
//EOF：End Of File 匹配文件结尾，防止文本结束，分析器仍然等待下一状态

https://html.spec.whatwg.org/#overview-of-the-parsing-model
### 解析标签
data tagOpen endTagOpen tagName beforeAttributeName selfClosingTag

### 创建元素
emitToken
状态机中，出了状态迁移，还会加入业务逻辑

### 处理属性
属性值分为单引号、双引号、无引号三种

### 构件DOM树——栈
所有元素存入顶层元素document的children中；

tag element
遇见开始标签时创建元素入栈，遇到结束标签出栈；
自封闭标签立即入栈，立即出栈；

### 文本节点
多个文本节点需要合并；文本节点不会入栈

问答：
EOF
JSX解析不是用状态机
为什么浏览器要限制http并发个数
LL LR算法   编译原理
html js css解析，词法使用状态机，语法部分使用LL、LR算法实现
状态机一般适合做词法分析，更复杂的处理逻辑不适合
龙书

html语法分析parse



