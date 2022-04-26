import express from 'express';
import { validateUserData,hashPassword, ValidateUserUpdateData } from './user.middleware';
import{authGuard} from '../auth/auth.middleware'
import * as userController from './user.controller';
const router=express.Router();
router.post('/users', validateUserData, hashPassword ,userController.store);
/**
 * 定义获取用户数据接口
 */
router.get('/users/:userId', userController.show);
/**
 * 定义一个更新用户的接口
 */
router.patch('/users', authGuard, ValidateUserUpdateData, userController.update);
export default router;