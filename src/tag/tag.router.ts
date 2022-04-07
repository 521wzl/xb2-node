import express from 'express';
import { accessControl, authGuard } from '../auth/auth.middleware';
import * as tag_controller from './tag.controller';
const router = express.Router();
router.post('/tags',authGuard, tag_controller.store_tag);
//router.post('/posts/:postId/tag', authGuard, accessControl( {possession: true} ), tag_controller.store_post_tag);
//router.delete('/posts/:postId/tag', authGuard, accessControl({possession: true}), tag_controller.Delete);
export default router;