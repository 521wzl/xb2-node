import { Request, Response, NextFunction, response } from 'express';

import _ from 'lodash';
import {creatPost, deletePost, getPosts, updatePost} from './post.service';
export const index=async(
    request: Request,
    response: Response,
    next: NextFunction
)=>{
   try{
    const posts= await getPosts();
    response.send(posts);
}catch(error){
    next(error);
}
};
/**
 * 定义存储内容接口处理器
 */
export const store=async (
    request:Request,
    response:Response,
    next:NextFunction
)=>{
    /**
     * 准备数据
     */
    const{title,content}=request.body;
    const {id:userId} = request.user;
    try{
        const data= await creatPost({title,content,userId});
        response.status(201).send(data);
    }catch(error){
        next(error)};
};
/**
 * 定义更新内容处理器
 */
export const update= async (
    request: Request,
    response: Response,
    next: NextFunction
)=>{
    /**
     * 准备数据
     */
    const{postId} = request.params;
    //console.log(request.params);
    //const{title,content} = request.body;
    const post =_.pick(request.body,['title','content']);//可以更改content里的一条内容，
    try{
       
        const data=await updatePost(parseInt(postId,10),post);
        response.status(201).send(data);
    }catch(error){
        next(error);
    }
};
/**
 * 定义删除内容的处理器
 */
export const DELETE = async (
    request:Request,
    response: Response,
    next: NextFunction
)=>{
const {postId} = request.params;
try{
    const data = deletePost(parseInt(postId,10));
    response.send(data);
}catch(error){
    next(error);
};
};