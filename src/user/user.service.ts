import {connection} from '../app/database/mysql'
import { hashPassword } from './user.middleware';
import {UserModel} from './user.model'
/**
 * 定义用户注册
 */
export const creatUser = async (user: UserModel)=>{
    const statement = `
    INSERT INTO user 
    set?
    
    `;
    const [data] = await connection.promise().query(statement, user);//此处的user 在处理器里被{name,password}赋实参了
    return data;
};

/**
 * 定义一个获取用户数据的功能
 */
interface getUserOptions{
    password?: boolean,
   
}

  const getUser = (condition:string) =>{
    return async (
        param: string | number,
        options: getUserOptions = {}

    ) =>{
        const { password } = options;
       
        const statement = `
        SELECT
            user.id,
            user.name
            ${password ? `,password` : ''},
        IF(COUNT(avatar.id), 1, NULL) AS avatar
        FROM user
        LEFT JOIN avatar
        ON user.id = avatar.userId
        WHERE ${condition} = ?
        `;
        
        const [data] = await connection.promise().query(statement, param);
        
        return data[0].id ? data[0] : null;
    };
};
export const getUserByName =  getUser('user.name');
export const getUserById =   getUser('user.id');

/**
 * 定义一个更新用户数据的功能
 */
export const updateUserData = async (userId:number,userData:UserModel) => {

    
    let params = [userData, userId]
    const statement = `
    update user
    set ?
    WHERE user.id = ?
    `;
    const [data] = await connection.promise().query(statement, params);
    return data;
};