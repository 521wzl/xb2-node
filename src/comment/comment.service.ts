import { NextFunction } from 'express';
import { connection } from '../app/database/mysql';
import { Comment_Model } from './comment.model';
import {sqlFragment} from './comment.provides';


/**
 *定义一个存储评论数据的功能
 */
export const Creat_comment = async (
    comment: Comment_Model
)=>{
 const statement = `
 INSERT INTO comment
 SET ?
 `;
 const [data] = await connection.promise().query(statement, comment);
 return data;
};

/**
 * 定义一个检查是评论否为回复评论的功能
 */
export const Is_reply_comment = async(
    commentId: number

)=>{
    const statement = `
    SELECT parentId FROM comment
    WHERE id =?
    `;
    const [data] = await connection.promise().query(statement, commentId);
    return data[0].parentId ? true : false ;
};

/**
 * 定义一个修改评论的功能
 */

export const updateComment = async (comment: Comment_Model)=>{
    const{id,content} = comment;
    const statement = `
    UPDATE comment
    SET content = ?
    WHERE id = ?
    
    `;
    const [data] = await connection.promise().query(statement,[content, id]);
    return data;
};
/**
 * 定义一个删除评论的功能
 */
export const deleteComment = async (commentId:number)=>{
    const statement = `
    DELETE FROM comment
    WHERE id = ?

    `;
    const [data] = await connection.promise().query(statement,commentId)
    return data;
};


/**
 * 定义获取评论列表的功能
 */
export interface getCommentsOptionsFilter{
    name?:string,
    sql?:string,
    param?:string
};
interface getCommentsOptions{
    commentsFilter?:getCommentsOptionsFilter
};

export const getComments = async (options:getCommentsOptions

  )=> {
      const {commentsFilter} = options;
        
        
     let params: Array<any>=[];
     params = [commentsFilter.param, ...params];
     const statement = `
     SELECT 
     comment.id,
     comment.content,
     ${sqlFragment.user},
     ${sqlFragment.post}
     ${
         commentsFilter.name == 'userReplied' ? `,${sqlFragment.replied}` : ''
         
     }
     ${commentsFilter.name !== 'userReplied'? `,${sqlFragment.totalReplies}` : '' }

     FROM comment 
     ${sqlFragment.leftJoinUser}
     ${sqlFragment.leftJoinPost}
     WHERE  ${commentsFilter.sql}
     GROUP BY comment.id
     ORDER BY comment.id desc

      
     `;
     console.log(statement);
     const [data] = await connection.promise().query(statement, params);
      return data;

  };