import { Request, Response, NextFunction } from "express";
import _ from 'lodash';
import { creatFile ,findFileById} from "./file.service";
import path from 'path';
import fs from "fs";
/**
 * 定义存储文件的处理器
*/
 export const store = async (
     request: Request,
     response : Response,
     next: NextFunction

 )=>{
     const {id: userId} = request.user;
     const {post: postId} = request.query;
     const info = _.pick(request.file,[
        'originalname',
        'mimetype',
        'filename',
        'size'
  
     ]);
     //console.log(request.file);
    try{
         const data = await creatFile({
             ...info,
             postId:parseInt(`${postId}`,10),
             userId,
             ...request.fileMetaData
         });
         response.status(201).send(data);
         //console.log(data);
     }catch(error){
         next(error);
     };



 };
/** 
 * 定义文件服务的处理器
 */
export const serve = async (
    request: Request,
    response: Response,
    next: NextFunction

)=>{
   
    const { fileId } = request.params;
    try{
        const file = await findFileById(parseInt(fileId,10));
        const { size } = request.query;
        if ( size ){
            const imageSize = ['large', 'medium', 'thumbnail' ];
            if(!imageSize.some(item =>item == size)){
                throw new Error('FILE_NOT_EXIST');
            };
            let filename = file.filename;
            let root = 'uploads';
            let resized = 'resized';

            const fileExist = fs.existsSync(
                path.join( root, resized, `${file.filename}-${size}`));
               
            if (fileExist){
                filename = `${filename}-${size}`;
                root = path.join(root, resized)
            };
            console.log('why');

        response.sendFile(filename, {
            root,
        
            headers:{
                'Content-Type': file.mimetype,
            },
           
        });
        console.log('奇怪');
    }}catch(error){
        next(error);
    };

};

/**
 * 从服务端调取文件信息
 */
export const metadata = async (
    request: Request,
    response: Response,
    next: NextFunction

)=>{
    const { fileId } = request.params;
    try{
        const file = await findFileById(parseInt(fileId,10));
        console.log(file)
        const data = _.pick(file,['id', 'size', 'width', 'height', 'metadata']);
        response.send(data);
    }catch(error){
        next(error); 
    };
    next();

};