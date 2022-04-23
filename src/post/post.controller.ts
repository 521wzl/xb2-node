import { Request, Response, NextFunction, response } from 'express';
import { Tag_Model } from '../tag/tag.model'
import _, { filter } from 'lodash';
import {creatPost, 
    deletePost,
    getPosts,
    updatePost,
    creat_post_tag, 
    post_has_tag,  
    Delete_post_tag,
    getPostsTotalCounts,
    getOnePostById
    } from './post.service';
import {
    creat_tag, 
    get_tag_by_name,
   
} from '../tag/tag.service'




export const index = async(
    request: Request,
    response: Response,
    next: NextFunction
)=>{
    try {
        const totalCount = await getPostsTotalCounts({filter:request.filter});
        response.header('X-Total-Content',totalCount);
       

    }catch(error){
        next(error);
    };
    
   try{
    const posts = await getPosts({sort: request.sort, filter: request.filter, pagination:request.pagination});
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
    const{title,content,}=request.body;
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
       
        const data = await updatePost(parseInt(postId,10),post);
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

/**
 * 为内容添加标签
 */
 export const store_post_tag = async(
     request: Request,
     response: Response,
     next: NextFunction

 )=>{
    const { postId } = request.params;  
    const { name } =request.body;
     // 定义变量tag 为Tag_Model 类型
     let tag :Tag_Model;
     try{
     tag = await get_tag_by_name(name);
     
          if(tag){
         const post_tag = await post_has_tag(parseInt(postId,10), tag.id);
         console.log(tag);
         console.log(post_tag);
         if (post_tag){
             throw new Error('POST_TAG_EXIST_ALREADY');
         };
     };
     if(!tag){
         const data = await creat_tag({name});
         console.log(data);
         tag = {id: data.insertId};
     };
    try{
         const post_tag_data = await creat_post_tag(parseInt(postId,10),tag.id);
         response.status(201).send('内容标签创建成功');
     }catch(error){
         return next(error);
     };
    }catch(error){
             return next (error)     }
 };

 /**
 * 定义一个删除内容标签的处理器
 */
 
export const Delete = async(
    request: Request,
    response: Response,
    next: NextFunction

)=>{
    const {postId} = request.params;
    const { tagId } = request.body;
    try{
       const post_tag = await Delete_post_tag(parseInt(postId,10), tagId);
       response.status(201).send(post_tag);

    }catch(error){
        return next(error);
    };
    

};
/**
 * 定义单个内容接口
 */
export const singlePost = async (
    request:Request,
    response: Response,
    next: NextFunction
) =>{
    const {postId} = request.params;
    try{
    const post = await getOnePostById(parseInt(postId,10));
    response.send(post)
    }catch(error){
    next(error)
    };
};
