import { Request, Response, NextFunction, response } from 'express';
import { request } from 'http';
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
    const{title}=request.body;
    try{
        const data= await creatPost({title})
        response.status(201).send(data)
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
    const post =_.pick(request.body,['title','content']);
    try{
       
        const data=await updatePost(parseInt(postId,10),post)
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