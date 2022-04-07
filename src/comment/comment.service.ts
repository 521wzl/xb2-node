import { connection } from '../app/database/mysql';
import { Comment_Model } from './comment.model'
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