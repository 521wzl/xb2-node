import { Request, Response, NextFunction } from "express";
import multer from "multer";
import Jimp from "jimp";
import { json } from "stream/consumers";
import { imageResizer } from "./file.service";

const fileUpload = multer({

    dest: 'uploads/'

});
export const fileIntercept = fileUpload.single('file');

/**
 * 读取文件头部信息,该动作发生在multer之后
 */
export const fileProcessor = async(
    request: Request,
    response: Response,
    next: NextFunction

)=>{
    const { path } = request.file;
    let image: Jimp;
   
    try{
        image = await Jimp.read( path ); // ？？？ 缺少await就会报错
       
        console.log(image);
        
    }catch(error){
        return next(error);
    };
    const { imageSize, tags } = image['_exif'];
    request.fileMetaData = { 
        width: imageSize.width,
        height: imageSize.height,
        metadata: JSON.stringify(tags)
    }
    imageResizer( image, request.file );
    next();
    
};