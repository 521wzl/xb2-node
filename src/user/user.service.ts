import {connection} from '../app/database/mysql'
import { hashPassword } from './user.middleware';
import {UserModel} from './user.model'
/**
 * 创建用户
 */
export const creatUser = async(user:UserModel)=>{
    const statement =`
    INSERT INTO user 
    set?
    
    `;
    const [data] = await connection.promise().query(statement,user);
    return data;
};
/**
 * 用户名重复检查
 */
interface getUserOptions{
    hasPassword?: boolean;
}
export const getUserByName = async (
    name:string, 
    options: getUserOptions={}
    ) =>{
    const {hasPassword} = options
    const statement =`
    SELECT 
    id ,
    name 
    ${hashPassword? ',password' : ''}
    FROM user
    WHERE name = ?

    `;
    const [ data ] = await connection.promise().query( statement, name);
    return data [ 0 ] ;
};