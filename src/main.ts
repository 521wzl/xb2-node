import app from './app';
import {AIR_PORT} from './app/app.config';
import {connection} from './app/database/mysql';
app.listen(AIR_PORT, () => {
  console.log('服务已启动');
});

  /* 测试使用数据服务连接
  */
 connection.connect(error=>{
   if (error){
     console.log('数据连接服务失败:',error.message);
     return;
   }
   console.log('成功连接服务!')

 });
 