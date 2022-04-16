import {connection} from '../app/database/mysql';
/**
 * 定义一个用户点赞的服务
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