import app from './app';
app.get('/', (request, response) =>
  response.send('Hello world!  you are great .Love you!'),
);

app.listen(3000, () => {
  console.log('服务已启动');
});
