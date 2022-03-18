import express from "express";
import * as loginController from './auth.controller';
import { authGuard, validateLoginData } from './auth.middleware';
const router = express.Router();
router.post("/login",validateLoginData,loginController.login);
router.post('/auth/validate',authGuard,loginController.validate);
export default router;