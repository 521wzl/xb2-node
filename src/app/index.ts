import express from 'express';
import router from '../post/post.router'
import { defaultErrorHandler } from './app.middleware';
const app = express();
app.use(express.json());
app.use(router);
app.use(defaultErrorHandler)
export default app;
