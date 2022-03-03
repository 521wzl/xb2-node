const http=require('http');

const server=http.createServer((request,response)=>{
    switch(request.url){// switch循环必须带{}
        case '/':// 一种情况胡必须带‘：’
        response.write('hello');
        break;// 一种情况结束，必须用break终止本次循环.否则会一直输出下面内容
        case '/hosts':
        response.write('welcome');
        break;
        case '/posts':
        response.write('love');
        break;
        default:
        response.writeHead(404);
        response.write('404');// 404作为响应内容，只能是字符串形式，终端会报错，出现无法连接页面
        break;
    }
    response.end();// 这个很重要，没有这句客户端就会卡住不动

});
server.listen(3000);// 必须监听端口，否则request.url就不知道父亲是谁,出现无法连接页面
