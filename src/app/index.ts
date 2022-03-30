import express from 'express';
import postRouter from '../post/post.router';
import userRouter from '../user/user.router';
import loginRouter from '../auth/auth.router';
import fileRouter from '../file/file.router';

import { defaultErrorHandler } from './app.middleware';
const app = express();
app.use(express.json());
app.use(postRouter,userRouter,loginRouter,fileRouter);//这才是函数调用，只是导入并不行
app.use(defaultErrorHandler)
export default app;
