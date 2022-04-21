import {Request, Response, NextFunction} from 'express';
import { cp } from 'fs';
/**
 * 定义一个过滤评论列表的中间件
 */
export const commentsFilter = async (
    request:Request,
    response:Response,
    next:NextFunction
) =>{
    const {post, user,action} =request.query;
     request.commentsFilter = {
         name:'default',
         sql: 'comment.parentId IS  NULL',
         
     };
     if(post && !user && !action ){
     request.commentsFilter = {
         name:'postComments',
         sql:'comment.parentId IS NULL AND comment.postId = ?' ,
         param: `${post}`


     };
    };
     if(user && action == 'published' && !post){
        request.commentsFilter={ 
            name:'userPublished',
            sql:'comment.parentId IS NULL AND comment.userId = ?',
            param: `${user}`

     };
};
    if(user && action == 'replied' && !post){
        request.commentsFilter={
            name:'userReplied',
            sql:'comment.parentId IS NOT NULL AND comment.userId = ?',
            param:`${user}`
        };
    }
next();
};