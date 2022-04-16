import express from 'express';
import { authGuard } from '../auth/auth.middleware';
import * as avatarController from './avatar.controller';
import { avatarIntercept, avatarProcess } from './avatar.middleware';

const router = express.Router();
router.post('/avatars',authGuard, avatarIntercept, avatarProcess, avatarController.store);
router.get('/avatars',authGuard, avatarController.serve);
export default router;