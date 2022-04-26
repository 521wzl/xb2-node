import { NextFunction } from 'express';
import { connection } from '../app/database/mysql';
import { Comment_Model } from './comment.model';
import {sqlFragment} from './comment.provides';
import { getPostsOptionsFilter ,GetPostsOptionsPagination} from '../post/post.service';



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


interface getCommentsOptions{
    filter?: getPostsOptionsFilter;
    pagination?: GetPostsOptionsPagination
};

export const getComments = async ( options: getCommentsOptions

  )=> {
      const { filter, pagination } = options;
      const { limit, offset } = pagination;
        
    
     let params: Array<any> = [ limit, offset ];
     if(filter.param) {
     params = [ filter.param, ...params ];
   
     console.log(params);
    }
     const statement = `
     SELECT 
     comment.id,
     comment.content,
     ${ sqlFragment.user },
     ${ sqlFragment.post }
     ${
         filter.name == 'userReplied' ? `,${ sqlFragment.replied }` : ''
         
     }
     ${filter.name !== 'userReplied' ? `,${ sqlFragment.totalReplies }` : '' }

     FROM comment 
     ${ sqlFragment.leftJoinUser }
     ${ sqlFragment.leftJoinPost }
     WHERE ${filter.sql}
     GROUP BY comment.id
     ORDER BY comment.id desc
     LIMIT ?
     OFFSET ?
     `;
     
     const [data] = await connection.promise().query( statement, params );
     return data;

  };
  /**
   * 定义获取评论总数的功能
   */
  export const getCommentsTotalCounts = async (options: getCommentsOptions) => {
      const { filter } = options;
      let params : Array<any> = [];
      
      params = [ filter.param ];
      const statement = `
      SELECT 
      COUNT(DISTINCT comment.id) AS commentTotals
      FROM comment
      ${sqlFragment.leftJoinUser}
      ${sqlFragment.leftJoinPost}
      WHERE ${filter.sql}
   
    
      
      `;
   
      const [data] = await connection.promise().query(statement, params);
      return data[0].commentTotals;
  };
  /**
   * 定义获取评论回复列表功能
   */
  interface getCommentsRepliesOptions{
      commentId?: number 
  }

  export const getCommentsReplies = async (options: getCommentsRepliesOptions) =>{
      const { commentId } = options;
      const statement = `
    SELECT 
        comment.id,
        comment.content,
    FROM comment
        ${sqlFragment.leftJoinUser}
    WHERE parentId = ?
    GROUP BY comment.id
      `;
      console.log(statement);
      const [data] = await connection.promise().query(statement, commentId);
      return data;
  };
  