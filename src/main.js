const http=require('http')
const server=http.createServer((request,response)=>{
    console.log(request);
    response.write('hello world');
    response.end();
});
server.listen(3000,()=>{
    console.log('服务已启动');
});
