import express from 'express';
import {new_file_intercept,new_file_processor} from './new_file.middleware';
import { authGuard } from '../auth/auth.middleware';
import * as new_file_controller from './new_file.controller';
const router = express.Router();
router.post('/file', authGuard, new_file_intercept, new_file_processor, new_file_controller.store );
router.get('/file/:fileId/metadata', new_file_controller.metadata );
router.get('/file/:fileId/serve', new_file_controller.serve);
export default router;