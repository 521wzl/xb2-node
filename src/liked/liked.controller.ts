import {Request, Response, NextFunction} from 'express';
import {creatLiked} from './liked.service';

/**
 * 定义一个点赞接口
 */
export const storeLiked = async (
    request: Request,
    response: Response,
    next: NextFunction

) =>{
    //准备数据
    const { id: userId } = request.user;
    const { postId } = request.params;
    //存入数据
    const data = await creatLiked(userId,parseInt(postId,10));
    response.status(201).send(data);

};