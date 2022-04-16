import {Request, Response, NextFunction} from 'express';
import {creatLiked, deleteLikedBYId} from './liked.service';

/**
 * 定义点赞内容接口
 */
export const store = async (
    request: Request,
    response: Response,
    next: NextFunction

) =>{
    //准备数据
    const { id: userId } = request.user;
    const { postId } = request.params;
    //存入数据
    try{
    const data = await creatLiked(userId,parseInt(postId,10));
    response.status(201).send(data);
    }catch(error){
        next(error);
    };
};

/**
 * 定义取消点赞内容接口
 */
 export const destroy = async (
     request: Request,
     response: Response,
     next: NextFunction

 )=>{
     //准备数据
     const {id:userId} = request.user;
     const {postId} = request.params;
     //删除数据
     try{
     const data = await deleteLikedBYId(userId, parseInt(postId,10))
     response.status(200).send(data);
     }catch(error){
         next(error);
     };
 };