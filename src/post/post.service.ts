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
 * 定义更新内容用的服务
 */
export const updatePost= async(postId:number,post:PostModel)=>{
    const statement=`
    UPDATE post
    SET?
    WHERE id=?
    `;
    const[data]= await connection .promise().query(statement,[post,postId]);// 此处是数组类型
    return data;
    
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

/**
 * 为post_tag 添加字段
 */
 export const creat_post_tag = async(
    postId:number,
    tagId: number

)=>{
    const statement = `
    INSERT INTO post_tag
    VALUES(?, ?)
    `;
    const [data] = await connection.promise().query(statement,[postId,tagId]);
    return data[0];
};
/**
 * 验证post_tag
 */
export const post_has_tag = async(
    postId:number, 
    tagId:number
)=>{
    const statement = `
    SELECT * FROM post_tag
    WHERE postId= ? AND tagId = ?
    `;
    const [data] = await connection.promise().query(statement,[postId,tagId])
    return data[0] ? true : false;
    };
/**
 * 定义一个删除内容标签的服务
 */
export const Delete_post_tag= async (postId: number, tagId: number

)=>{
    const statement = `
    DELETE FROM post_tag
    WHERE postId =? AND tagId =?
    `;
    const [data] = await connection.promise().query(statement,[postId,tagId]);
    return data;
};