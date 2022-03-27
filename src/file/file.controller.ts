import { Request, Response, NextFunction } from "express";
import _ from 'lodash';
import { creatFile ,findFileById} from "./file.service";
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
     console.log(request.file);
    try{
         const data = await creatFile({
             ...info,
             postId:parseInt(`${postId}`,10),
             userId,
         });
         response.status(201).send(data);
         console.log(data);
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
   
    const {fileId} = request.params;
    try{
        const file = await findFileById(parseInt(fileId,10));
        response.sendFile(file.filename, {
            root: 'uploads',
        
            headers:{
                'Content-Type': file.mimetype,
            }
        });
    }catch(error){
        next(error);
    };

};