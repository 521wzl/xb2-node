import {Request, Response, NextFunction} from 'express';
import { cp } from 'fs';
/**
 * 定义一个过滤评论列表的中间件
 */
export const filter = async (
    request:Request,
    response:Response,
    next:NextFunction
) =>{
    const {post, user,action} =request.query;
     request.filter = {
         name:'default',
         sql: 'comment.parentId IS NULL'
         
     };
     if(post && !user && !action ){
     request.filter = {
         name:'postComments',
         sql:'comment.parentId IS NULL AND comment.postId = ?' ,
         param: `${post}`


     };
    };
     if(user && action == 'published' && !post){
        request.filter={ 
            name:'userPublished',
            sql:'comment.parentId IS NULL AND comment.userId = ?',
            param: `${user}`

     };
};
    if(user && action == 'replied' && !post){
        request.filter={
            name:'userReplied',
            sql:'comment.parentId IS NOT NULL AND comment.userId = ?',
            param:`${user}`
        };
    }
next();
};

