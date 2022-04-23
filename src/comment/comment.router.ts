import express from 'express';
import * as commentController from './comment.controller';
import { filter } from './comment.middleware';
import { accessControl, authGuard } from '../auth/auth.middleware';
import { paginate } from '../post/post.middleware';
import { COMMENTS_PER_PAGE } from '../app/app.config'
const router = express.Router();
/**
 * 获取评论列表分页显示
 */
router.get('/comments', authGuard, filter, paginate( parseInt(COMMENTS_PER_PAGE,10) ), commentController.index);
router.post('/comments', authGuard, commentController.store);
router.post('/comments/:commentId/reply',authGuard, commentController.Reply);
router.patch('/comments/:commentId',authGuard, accessControl({possession: true}), commentController.update);
router.delete('/comments/:commentId', authGuard, accessControl({possession: true}), commentController.Delete);

export default router;