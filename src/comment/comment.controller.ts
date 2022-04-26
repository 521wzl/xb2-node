import {Request, Response, NextFunction} from 'express';
import { nextTick } from 'process';
import { filter } from './comment.middleware';
import {getPostsOptionsFilter} from '../post/post.service';

import { Creat_comment, 
    deleteComment, 
    getComments, 
    getCommentsReplies,  
    getCommentsTotalCounts, 
    Is_reply_comment, 
    updateComment
    
 } from './comment.service';

/**
 * 定义一个发表评论数据用的接口（处理器）
 */
export const store = async(
    request: Request,
    response: Response,
    next: NextFunction
)=>{
    
    const {id:userId} = request.user;
    const {content,postId} = request.body;
   
    try{
        
        const data = await Creat_comment({content,postId, userId});
        response.status(201).send(data);
    }catch(error){
        next(error);
    };
};
/**
 * 定义一个回复评论的的接口（处理器）
 */
 export const Reply = async(
    request: Request,
    response: Response,
    next: NextFunction
)=>{
    //准备数据
    const {id:userId} = request.user;
    const {content, postId} = request.body;
    const { commentId } = request.params;
    const parentId = parseInt(commentId,10);
    try{
        const reply = await Is_reply_comment( parseInt(commentId,10) );
        console.log(reply);
        if(reply){
            throw Error('UNABLE_REPLY_THIS_COMMENT');
        };
    }catch(error){
            next (error)
        };
    try{
            const data = await Creat_comment({
                content,
                postId,
                userId,
                parentId

            });
            response.status(201).send(data);
        
    }catch(error){
        next(error);
    


    };
};

/**
 * 定义一个修改用户修改自己的评论的接口（处理器）
 */

 export const update = async(
    request: Request,
    response: Response,
    next: NextFunction
)=>{
//准备数据
const {commentId} = request.params;

const {content} = request.body;


try{
    const data = await updateComment( {content,id:parseInt(commentId,10)});
    response.send(data);
}catch(error){
    next(error);
};


};

/**
 * 定义一个删除评论的接口（处理器）
 */
 export const Delete = async(
    request: Request,
    response: Response,
    next: NextFunction
)=>{
    try{
    const {commentId} = request.params
    const data = await deleteComment(parseInt(commentId,10));
    response.send(data);
    }catch(error){
        next(error);
    }
};

/**
 * 定义一个获取评论列表的接口
 */
export const index = async (
    request: Request,
    response: Response,
    next: NextFunction

) =>{ 
    try{
        const total = await getCommentsTotalCounts({filter: request.filter});
        response.header('X-Total-Count', total);
    }catch(error){
        next(error);
    };
   
    try{
        const comments =  await getComments({ filter:request.filter, pagination:request.pagination });
        response.send(comments);
    }catch(error){
        next(error);
    };
    
};
/**
 * 定义一个获取评论回复列表的接口
 */
export const reply = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const {commentId} = request.params;
    try{
    const replies = await getCommentsReplies({commentId: parseInt(commentId,10)});
    response.send(replies);
    }catch(error){
        next(error);
    };
};