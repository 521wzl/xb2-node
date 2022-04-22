import {Request, Response, NextFunction} from 'express';
import { nextTick } from 'process';

import { fileURLToPath } from 'url';
import {getPostsOptionsFilter} from './post.service'

/**
 * 定义一个内容列表排序的中间件
 */
export const sort = (
    request: Request,
    response:Response,
    next:NextFunction
)=>{
    //准备数据
    const {sort}= request.query;
    let sqlSort:string;
    switch(sort){
        case 'earliest':
            sqlSort = `post.id asc`;
            break;
        case `latest`:
            sqlSort = `post.id desc`;
            break;
        case `mostComments`:
            sqlSort = `totalComments desc, post.id desc`;
            break;


        default:
            sqlSort = `post.id desc`;
            break;
    };
    request.sort = sqlSort;
    next();
};


/**
 * 定义一个过滤内容列表的中间件
 * 
 */
 export const filter = (
    request: Request,
    response:Response,
    next:NextFunction
)=>{
    const {tag, user, action} = request.query;
   
   
        request.filter = {
           name: 'default',
           sql: 'post.id IS NOT NULL'
       };
       if(tag && !user && !action){
       request.filter = {
           name: 'tagName',
           sql: 'tag.name = ?',
           param: `${tag}`

       };

    };
       if(user && action=='published' && !tag){
      
           request.filter = {
               name: 'userPublished',
               sql: 'user.id = ?',
               param: `${user}`
           };
        
        };
        if(user && action == 'liked' && !tag){
            request.filter ={ 
                name: 'userLiked',
                sql: 'user_like_post.userId = ?',
                param: `${user}`

            };
        }

        next();
};
/**
 * 定义一个内容分页的中间件
 */
export const paginate = (itemsPerPage: number
    
)=>{return async (
    request: Request,
    response: Response,
    next: NextFunction
) =>{
    //默认当前页码为1
    const { page = 1 } = request.query;

    //如果设置了POSTS_PER_PAGE就将其转换为10进制并赋值给limit，如果没有设置，则 limit 为30
    const limit = itemsPerPage || 30;

    //计算偏移量
    const offset = limit * ( parseInt(`${page}`, 10 ) - 1 );

    request.pagination = { limit, offset };
   
    
    next();
};
};