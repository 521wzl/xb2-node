import express from 'express';
import * as commentController from './comment.controller';
import { commentsFilter } from './comment.middleware';
import { accessControl, authGuard } from '../auth/auth.middleware';
const router = express.Router();
router.get('/comments', authGuard, commentsFilter ,commentController.index);
router.post('/comments', authGuard, commentController.store);
router.post('/comments/:commentId/reply',authGuard, commentController.Reply);
router.patch('/comments/:commentId',authGuard, accessControl({possession: true}), commentController.update);
router.delete('/comments/:commentId', authGuard, accessControl({possession: true}), commentController.Delete);

export default router;