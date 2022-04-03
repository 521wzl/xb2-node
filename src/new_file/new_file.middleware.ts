import { Request, Response, NextFunction, response} from 'express';
import multer from 'multer';
import jimp from 'jimp';
import _ from 'lodash';
import path from 'path';
 import fs from 'fs';

import { get_file_by_id, image_resized } from './new_file.service';
import { rootCertificates } from 'tls';
const image_file = multer({
    dest: 'upload'
});
export const new_file_intercept = image_file.single('new_file');

/**
 * 读取文件信息
 */
export const new_file_processor = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    //request.file就存在一个属性path
    const { path } = request.file;
    let image_new_file: jimp;
    try{
        image_new_file = await jimp.read(path);
    }catch(error){
        return next(error);
    };
     
    const {imageSize,tags} = image_new_file['_exif'];
    request.new_file_meta ={
        width: imageSize.width,
        height: imageSize.height,
        metadata: JSON.stringify(tags)

    };
    image_resized(image_new_file, request.file);
    const {size} = request.query;
    console.log(size);
  
    next();
};
