const http=require('http');
const data ={
        'id': 1,
        'title': 'music',
        'content': 'a-star'
    
    };
const jsondata=JSON.stringify(data);// 必须进行格式转换，将文本格式转换成json格式
const server=http.createServer((request,response)=>{
    response.writeHead(200,{
        'content-type': 'application/json; charset=utf-8'//声明类型为json，编码形式为utf-8
    });
    response.write(jsondata)
    response.end();

});
server.listen(3000);