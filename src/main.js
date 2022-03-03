// 定义带参数应用接口
const express= require('express');
const port=3000;
const app=express();
data = [
    {
        'id': 1,
        'title': '关山月',
        'content': '明月出天山,苍茫云海间'

    },
    {
        'id': 2,
        'title': '望岳',
        'content': '会当凌绝顶,一览众山小'

    },
    {
        'id': 3,
        'title': '忆江南',
        'content': '日出江花红似火,春来江水绿如蓝'

    }

];

app.get('/host/:postID',(request,response)=>{
    console.log(request.params);
    const {postID}=request.params;
    const posts=data.filter(item=>item.id==postID);
    response.send(posts[0]);


});
app.listen(port,()=>{
    console.log('服务已启动');
})

