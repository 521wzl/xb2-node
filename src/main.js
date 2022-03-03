const http=require('http');
const server=http.createServer((request,response)=>{
    response.writeHead(200,{
        'content-type': 'text/html',// 必须定义响应内容的类型为文本框形式
    });
    response.write(`<input />`);// 用的是字符模版
    response.end();

});
server.listen(3000,()=>{
    console.log('服务已启动')
})