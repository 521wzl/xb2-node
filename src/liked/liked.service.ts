import { strictEqual } from 'assert';
import {connection} from '../app/database/mysql';
/**
 * 定义保存点赞内容的功能
 */
export const creatLiked = async (
    userId:number,
    postId:number
) =>{
    const statement = `
    INSERT INTO user_like_post
    SET ?
    `;
    const [data] = await connection.promise().query(statement, {userId,postId});
    return data;
};
/**
 * 定义取消点赞内容的功能
 */
 export const deleteLikedBYId = async (
     userId:number,
     postId:number
 ) => {
    const statement = `
    DELETE  FROM user_like_post
    WHERE userId = ? AND postId = ?
    `;
    const [data] = await connection.promise().query(statement, [userId,postId]);
    return data;
 };