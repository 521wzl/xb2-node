import jwt from 'jsonwebtoken';
import { PRIVATE_KEY } from '../app/app.config';
import {connection} from '../app/database/mysql'
/**
 * 定义一个interface 数据类型
 */
interface SignTokenOptions{
    payload: any;
};
/**
 * 定义一个签发令牌的方法
 */
export const signToken = (options: SignTokenOptions)=>{
    const {payload} = options;
    /**
     * 制造token
     */
    const token =jwt.sign(payload,PRIVATE_KEY,{algorithm:'RS256'});
    return token;



}
/**
 * 定义检查用户是否拥有制定资源的功能
 */
interface possessControlOptions{
    resourceId: number,
    resourceType: string,
    userId: number
};
export const possess = async (options: possessControlOptions)=>{
    const {resourceType,resourceId,userId} = options;
    const statement = `
    SELECT COUNT(${resourceType}.id) as count
    FROM ${resourceType}
    WHERE ${resourceType}.id = ? AND userId = ?
    
    `;
    const [data] = await connection.promise().query(statement,[resourceId,userId]);
    return data[0].count ? true : false; // 对count进行判断，是1就返回true,是0就返回false
}