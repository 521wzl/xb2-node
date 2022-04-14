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
           }
        }
        next();
};
