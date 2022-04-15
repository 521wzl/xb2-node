import { Request, Response, NextFunction } from 'express';
import multer, { FileFilterCallback }from 'multer';

import Jimp from 'jimp';
import path from 'path';



/**
 * 定义一个文件过滤器
 */
export const fileFilter = (fileTypes: Array<string>) => {
    return (
        request: Request,
        file: Express.Multer.File,
        callback: FileFilterCallback

    ) => {
        const allowed = fileTypes.some(item => item == file.mimetype);
        if (allowed){
            callback(null, true);
        }else{
            callback( new Error('FILE_DOSE_NOT_ALLOWED'));
        };
    };
};
const fileFilterUpload = fileFilter(['image/png', 'image/jpg', 'image/jpeg']);
/**
 * 定义一个文件拦截器
 */

 const avatarUpload = multer(
    {dest: 'uploads/avatar',
    fileFilter: fileFilterUpload
    
    });
export const avatarIntercept = avatarUpload.single('avatar');

/**
 * 定义一个调整图像尺寸的功能
 */
export const avatarProcess = async (
    request: Request,
    response: Response,
    next: NextFunction

) => {
   const {file} = request;
   const  filePath = path.join(file.destination, 'resized', file.filename)
   try{
   const image = await Jimp.read(file.path);
  
   image
   .cover(256,256)
   .quality(85)
   .write(`${filePath}-large`);
   image
   .cover(128,128)
   .quality(85)
   .write(`${filePath}-medium`);
   image
   .cover(64,64)
   .quality(85)
   .write(`${filePath}-small`);
}catch(error){
    next(error)
};
next();
   
};