import { Request, Response, NextFunction } from "express";
import { creat_new_file, get_file_by_id } from "./new_file.service";
import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import { ServerResponse } from "http";

/**
 * 为指定内容添加文件
 */
export const store =async (
    request: Request,
    response: Response,
    next: NextFunction
)=>{
    //准备数据
const { id: userId } = request.user;
const { post: postId } = request.query;


//文件相关信息，在multer函数之后就被添加到了request属性里
const new_file_info = _.pick(request.file,
    [ 
    'originalname',
     'mimetype', 
     'filename',
     'size'
    ]);
console.log(new_file_info);
console.log(request.file);
try{
    const data = await creat_new_file({
        ...new_file_info,
        postId: parseInt(`${postId}`,10),
        userId,
        ...request.new_file_meta
    
    })
    
    response.status(201).send(data);
        
}catch(error){
next(error);
}};
/**
 * 文件服务
 */
export const metadata = async (
    request: Request,
    response: Response,
    next: NextFunction

)=>{
    const { fileId } = request.params;
    try{
        const file = await get_file_by_id(parseInt(fileId,10));

        
        const data = _.pick(file,['id', 'size', 'width', 'height', 'metadata'])
        response.status(201).send(data);
    }catch(error){
        next(error);
    }
};
/**
 * 响应不同尺寸文件
 */

 export const serve = async (
    request: Request,
    response: Response,
    next: NextFunction

) =>{
    const { fileId } = request.params;
    try{
        const file = await get_file_by_id(parseInt(fileId,10));
        const {size} = request.query;
        if(size){
        const image_size = ['large', 'medium', 'thumbnail'];
        if(!image_size.some( item=>item == size)){
            throw new Error('FILE_NOT_FOUND');
        };
        const file_path = path.join(
        'upload', 'resized',  `${file.filename}-${size}`);
        const file_exists = fs.existsSync(file_path);
        if(file_exists){
            let root = path.join('upload','resized');
            let file_name = `${file.filename}-${size}`;
        
        
            response.sendFile(file_name, {
                 root,
                 headers:{
                     'Content-Type': file.mimetype
                 }
             })
             

         

            };

        };
        

    }catch(error){
    next(error)
};
}