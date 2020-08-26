# 每周总结可以写在这里

1. 系统发布至publish-server时，需要鉴权；
2. 使用github OAuthAPP进行第三方健全操作；
3. 创建github APP, 参考https://justauth.wiki/#/quickstart/oauth
4. 从客户端(publish-tool)访问https://github.com/login/oauth/authorize... 获取code；
5. 使用上一步获取到的code，服务端发起获取access-token的请求获取token;
6. 获取到token后调用获取用户信息的接口获取用户信息；
7. 根据返回的用户信息进行鉴权操作；
8. 鉴权成功后，继续后续操作；
