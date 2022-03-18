import jwt from 'jsonwebtoken';
import { PRIVATE_KEY } from '../app/app.config';
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