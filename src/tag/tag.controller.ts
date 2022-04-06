import {Request, Response, NextFunction} from 'express';
import { isGeneratorFunction } from 'util/types';
import { Tag_Model } from './tag.model';
import { creat_tag, get_tag_by_name, } from './tag.service';
/**
 * 定义一个存储标签的处理器
 */
export const store_tag = async (
    request: Request,
    response: Response,
    next: NextFunction

)=>{
    const { name } = request.body;
    try{
        // 判断标签是否存在
        const tag = await get_tag_by_name(name);
        
        if(tag){
            throw new Error('TAG_EXIST_ALREADY');
        };
        const data = await creat_tag({name});
       
        response.status(201).send(data);
    }catch(error){
        next (error)
    };
    
   

};


/**
 * 为内容添加标签
 */
//   export const store_post_tag = async(
//       request: Request,
//       response: Response,
//       next: NextFunction
    
//      )=>{
//          const { postId } = request.params;
//          const { name } =request.body;
//          // 定义变量tag 为Tag_Model 类型
//         let tag : Tag_Model;
//         try{
//             tag = await get_tag_by_name(name);
//         }catch(error){
//             return next(error);
//         };
//         if (tag){
//             try{
//             const post_tag = await post_has_tag(parseInt(postId,10),tag.id)
//             if(post_tag){
//                 throw new Error('POST_TAG_EXIST_ALREADY')
//             };
//               }catch(error){
//                 return next(error);
//             };
//         };

//         if(!tag){
//             try{
//             const data = await creat_tag({name});
//             tag = {id: data.insertId};
//             }catch(error){return next(error)};
//         };
//         try{
//            await creat_post_tag(parseInt(postId,10), tag.id);
//            response.status(201).send('内容标签创建成功');
//         }catch(error){
//             return next(error);
//         };
//      };

// /**
//  * 定义一个删除内容标签的处理器
//  */
 
// export const Delete = async(
//     request: Request,
//     response: Response,
//     next: NextFunction

// )=>{
//     const {postId} = request.params;
//     const { tagId } = request.body;
//     try{
//        const post_tag = await Delete_post_tag(parseInt(postId,10),tagId)
//        response.status(201).send(post_tag);

//     }catch(error){
//         return next(error);
//     };
    

// };
