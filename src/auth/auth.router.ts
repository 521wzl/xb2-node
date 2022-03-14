import express from "express";
import * as loginController from './auth.controller';
import { validateLoginData } from './auth.middleware';
const router = express.Router()
router.post("/login",validateLoginData,loginController.login)
export default router;