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
TCP粘包？
Transfer-Encoding：Transfer-Encoding 消息首部指明了将 entity 安全传递给用户所采用的编码形式；(https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Transfer-Encoding)
Transfer-Encoding: chunked
数据以一系列分块的形式进行发送。 Content-Length 首部在这种情况下不被发送。。在每一个分块的开头需要添加当前分块的长度，以十六进制的形式表示，后面紧跟着 '\r\n' ，之后是分块本身，后面也是'\r\n' 。终止块是一个常规的分块，不同之处在于其长度为0。终止块后面是一个挂载（trailer），由一系列（或者为空）的实体消息首部构成。

状态机：
是有限状态自动机的简称，是现实事物运行规则抽象而成的一个数学模型。
状态机通常包含有限个状态，通过输入或事件（Event）执行某一动作（Action）实现状态切换（Transition）
注意：状态机的当前状态是其所包含的有限状态之一；一个动作执行会将当前状态转换为另一状态



