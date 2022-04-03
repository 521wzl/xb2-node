import { New_FileModel } from "./new_file.model";
import {connection} from '../app/database/mysql'
import jimp from "jimp";
import path from 'path';

export const creat_new_file = async(new_file: New_FileModel)=>{
    const statement = `
    INSERT INTO new_file
    SET ?
    `;
    const [data] = await connection.promise().query(statement,new_file);
    return data;
};
/**
 * 定义一个文件服务
 */
export const get_file_by_id = async (fileId:number) => {
    const statement = `
    SELECT * FROM new_file
    WHERE id = ?
    `;
    const [data] = await connection.promise().query(statement,fileId);
    return data[0];
};
/**
 * 定义一个调整文件尺寸的功能
 */
export const image_resized = (image_new_file: jimp, new_file: Express.Multer.File)=>{//对参数的理解，及参数类型的定义

    const file_path = path.join(new_file.destination, 'resized', new_file.filename);
    const { imageSize } = image_new_file['_exif'];
    if(imageSize.width > 1280){
        image_new_file
        .resize(1280, jimp.AUTO)
        .quality(85)
        .write(`${file_path}-large`)
    };
    if(imageSize.width > 640){
        image_new_file
        .resize(640, jimp.AUTO)
        .quality(85)
        .write(`${file_path}-medium`)
    };
    if(imageSize.width > 320){
        image_new_file
        .resize(320, jimp.AUTO)
        .quality(85)
        .write(`${file_path}-thumbnail`)
    };
   
};