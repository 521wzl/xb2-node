import express from "express"
import { authGuard } from "../auth/auth.middleware";
import {fileIntercept} from "./file.middleware";
import * as fileController from "./file.controller";
const router = express.Router();
router.post('/files',authGuard,fileIntercept,fileController.store);
router.get('/files/:fileId/serve',fileController.serve);
export default router;