import express from 'express';
import * as Comment_Controller from './comment.controller';
import { accessControl, authGuard } from '../auth/auth.middleware';
const router = express.Router();
router.post('/comments', authGuard, Comment_Controller.store);
router.post('/comments/:commentId/reply',authGuard, Comment_Controller.Reply);
router.patch('/comments/:commentId',authGuard, accessControl({possession: true}), Comment_Controller.update);
router.delete('/comments/:commentId', authGuard, accessControl({possession: true}), Comment_Controller.Delete);
export default router;