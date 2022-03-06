import app from './app';
import {AIR_PORT} from './app/app.config';
app.get('/', (request, response) =>
  response.send('Hello world!  you are great .Love you!'),
);

app.listen(AIR_PORT, () => {
  console.log('服务已启动');
});
 