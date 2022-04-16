import express from 'express';
import { authGuard } from '../auth/auth.middleware';
import * as likedController from './liked.controller';
const router = express.Router();
router.post('/posts/:postId/liked', authGuard,likedController.storeLiked);
export default router;