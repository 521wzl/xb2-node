import express from 'express';
import * as postController from './post.controller';
import { authGuard } from '../auth/auth.middleware';
import { accessControl } from '../auth/auth.middleware';
import {sort,filter,paginate} from './post.middleware';

const router=express.Router();
router.get('/posts', sort, filter, paginate, postController.index);
router.get('/posts/:postId',sort, filter, paginate,postController.singlePost);
router.post('/posts',authGuard, postController.store);
router.patch('/posts/:postId', authGuard ,accessControl({ possession:true }), postController.update);
router.delete('/posts/:postId', authGuard ,accessControl({ possession:true }), postController.DELETE);
router.post('/posts/:postId/tag', authGuard , accessControl({ possession:true }), postController.store_post_tag);
router.delete('/posts/:postId/tag', authGuard , accessControl({ possession:true }), postController.Delete);
export default router;