import { connection } from "../app/database/mysql";
import { PostModel } from "./post.model";


export const  getPosts =async()=>{
    const statement=`
    SELECT 
        post.id,
        post.title,
        post.content,
        JSON_OBJECT(
        'id',user.id,
        'name',user.name

        )as user
    FROM post
    LEFT JOIN user 
        ON user.id = post.userId
     `;
    const [data]=await connection.promise().query(statement)
    return data;
}
/**
 * 创建内容写入数据库
 */
export const creatPost=async(post:PostModel)=>{
    const statement=`
    INSERT INTO post
    set?
    `;
    const [data]= await connection.promise().query(statement,post);
    return data;
};
/**
 * 更新数据数据
 */
export const updatePost= async(postId:number,post:PostModel)=>{
    const statement=`
    UPDATE post
    SET?
    WHERE id=?
    `;
    const[data]= await connection .promise().query(statement,[post,postId]);// 此处是数组类型
    return(data);
    
}
/**
 * 从数据库删除数据
 */
export const deletePost = async (postId:number)=>{
const statement = `
DELETE FROM post
WHERE id = ?
`;
const [data] = await connection.promise().query(statement,postId)
};

