import { Request, Response, NextFunction} from 'express';
import { creatAvatar, getAvatarByUserId } from './avatar.service';
import _ from 'lodash';
import fs from 'fs';
import path from 'path';
/**
 * 创建一个存储头像文件信息的接口（处理器）
 */
export const store = async(
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const { id:userId } = request.user;
    const {file} = request;
    const avatarInfo = _.pick(file,['mimetype', 'filename', 'size', ])
    const avatar = {
        ...avatarInfo,
        userId
    };
    try{
        const data = await creatAvatar(avatar)
        response.status(200).send(data);
    }catch(error){
        next(error)}
 };

 /**
  * 定义一个响应不同尺寸文件的服务
  */
 export const serve = async(
    request: Request,
    response: Response,
    next: NextFunction

 ) =>{
     const {id:userId} = request.user;
     
     const {size} = request.query;
     const avatar = await getAvatarByUserId(userId);
     let root:string;
     if(size){
        let  avatarSize = ['large', 'medium', 'small'];
        let image = avatarSize.some(item => item == size);
        
        if(image){try{
            let filePath = path.join('uploads/avatar', 'resized',`${avatar.filename}-${size}`);
           
            if(fs.existsSync(filePath)){
                let filename = `${avatar.filename}-${size}`;
               
                response.sendFile(filename, {
                    root:'uploads/avatar/resized', 
                    headers:{'Content-Type':avatar.mimetype}
                })
                    
                
            };
        }catch(error){
            next(error)
        };
    };
     }else{throw new Error('AVATAR_DOSE_NOT_EXIST')};
     
 };