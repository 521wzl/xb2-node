import { Request, Response, NextFunction } from "express";
import multer from "multer";

const fileUpload = multer({

    dest: 'uploads/'

});
export const fileIntercept = fileUpload.single('file');

/**
 * 读取文件头部信息
 */
