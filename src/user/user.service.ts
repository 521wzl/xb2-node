import {connection} from '../app/database/mysql'
import {UserModel} from './user.model'
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
export const getUserByName = async (name:string) =>{
    const statement =`
    SELECT id name 
    FROM user
    
    WHERE name = ?
    `;
    const [data] = await connection.promise().query(statement,name);
    return data[0];
};