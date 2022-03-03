// 用express创建一个应用接口

const express= require('express');
const port=3000;
const app=express();
app.get('/',(request,response)=>{// get()方法有两个参数，第一个参数是地址
    response.send('hello');
});
app.listen(port,()=>{// 只提供一个端口
    console.log('服务已启动');
});