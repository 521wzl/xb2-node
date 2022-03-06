import express from 'express';
import * as postcontroller from './post.controller';
import {requesturl} from '../app/app.middleware'
const router=express.Router();
router.get('/posts',requesturl,postcontroller.index);
export default router;