import {connection} from '../app/database/mysql'
import { hashPassword } from './user.middleware';
import {UserModel} from './user.model'
/**
 * 定义用户注册
 */
export const creatUser = async(user:UserModel)=>{
    const statement =`
    INSERT INTO user 
    set?
    
    `;
    const [data] = await connection.promise().query(statement,user);//此处的user 在处理器里被{name,password}赋实参了
    return data;
};
/**
 * 定义用户登陆验证
 */
interface getUserOptions{
    hasPassword?: boolean;
}
export const getUserByName = async (
    name: string, 
    options: getUserOptions = {}
    ) =>{
    const {hasPassword} = options;
    const statement = `
    SELECT 
    id,
    name 
    ${hashPassword? ',password' : ''} 
    FROM user
    WHERE name = ?

    `;//上面name后面不能有逗号，因为他后面要添加,password
    const [data] = await connection.promise().query( statement, name);
    return data[0] ;
};