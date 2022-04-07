import express from 'express';
import postRouter from '../post/post.router';
import userRouter from '../user/user.router';
import loginRouter from '../auth/auth.router';
import fileRouter from '../file/file.router';
<<<<<<< HEAD
import Comment_Router from '../comment/comment.router';
import { defaultErrorHandler } from './app.middleware';
const app = express();
app.use(express.json());
app.use(postRouter,userRouter,loginRouter,fileRouter,Comment_Router);//这才是函数调用，只是导入并不行
=======
import tagRouter from '../tag/tag.router';

import { defaultErrorHandler } from './app.middleware';
const app = express();
app.use(express.json());
app.use(postRouter,userRouter,loginRouter,fileRouter,tagRouter);//这才是函数调用，只是导入并不行
>>>>>>> tags
app.use(defaultErrorHandler)
export default app;
