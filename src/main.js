// 定义一个创建内容资源的接口

const express= require('express');
const port=3000;
const app=express();
app.use(express.json());
app.post('/posts',(request,response)=>{
    const {content}=request.body;
    response.status(201);//可以自己创建一个响应状体码
    console.log(request.header('sing-along'));// 将在客户端设置的头部信息输出到控制台
    response.set('sing-along','what you want?');// 对请求里的头部信息在响应头部信息里作出响应
    response.send({
        'message': `成功创建内容:${content}`
    });
});
app.listen(port,()=>{// 只提供一个端口
    console.log('服务已启动');
});