import express from 'express';
import router from '../post/post.router'
const app = express();
app.use(express.json());
app.use(router);
export default app;
