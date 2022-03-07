import app from './app';
import {AIR_PORT} from './app/app.config';

app.listen(AIR_PORT, () => {
  console.log('服务已启动');
});
 