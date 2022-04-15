import express from 'express';
import postRouter from '../post/post.router';
import userRouter from '../user/user.router';
import loginRouter from '../auth/auth.router';
import fileRouter from '../file/file.router';
import tagRouter from '../tag/tag.router';
import Comment_Router from '../comment/comment.router';
import { defaultErrorHandler } from './app.middleware';
import avatarRouter from '../avatar/avatar.router'
const app = express();
app.use(express.json());
app.use(
    postRouter,
    userRouter,
    loginRouter,
    fileRouter,
    tagRouter,
    Comment_Router,
    avatarRouter
    );//这才是函数调用，只是导入并不行
app.use(defaultErrorHandler)
export default app;
