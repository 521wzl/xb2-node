import { Request, Response, NextFunction} from 'express';
import { creatAvatar } from './avatar.service';
import _ from 'lodash';
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