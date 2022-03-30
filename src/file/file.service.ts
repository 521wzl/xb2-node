import {connection} from '../app/database/mysql';
import { FileModel } from './file.model';
import Jimp from 'jimp';
import path from 'path';
/**
 * 定义上传文件服务
 */
export const creatFile = async(
    file:FileModel
)=>{
const statement = `
INSERT INTO file
SET ?

`;
const [data] = await connection.promise().query(statement,file);
return data;
};

 /**
  * 定义文件服务功能
 */
export const findFileById = async(fileId: number)=>{
    
    const statement = `
   SELECT * FROM file
   WHERE id = ?
    `;
const [data] = await connection.promise().query(statement,fileId);
return data[0];
};
/**
 * 定义一个服务调整文件尺寸
 */
export const imageResizer = (image: Jimp, file: Express.Multer.File)=>{
    //找出尺寸属性
    const { imageSize } = image['_exif'];
    //组织路径
    const filePath = path.join( file.destination, 'resized', file.filename );
    //大尺寸
    if ( imageSize.width > 1280){
        image
        .resize( 1280, Jimp.AUTO )
        .quality(85)
        .write(`${ filePath }-large`)
    };
    // 中等尺寸
    if ( imageSize.width >640 ){
        image
        .resize( 640, Jimp.AUTO )
        .quality(85)
        .write(`${ filePath }-medium`)
    };
    // 缩略图
    if ( imageSize.width > 320 ){
        image
        .resize( 320, Jimp.AUTO )
        .quality(85)
        .write( `${ filePath }-thumbnail`)
    };

};