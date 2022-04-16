import { connection } from '../app/database/mysql';
import {AvatarModel} from './avatar.model';

/**
 * 定义一个存储图像文件信息的功能
 */
export const creatAvatar = async (avatar:AvatarModel) => {

    const statement = `
    INSERT INTO avatar
    set ?
    `;
    const [data] = await connection.promise().query(statement, avatar)
    return data;

};


/**
 * 定义一个文件信息服务的功能
 */
export const getAvatarByUserId = async (userId:number

) =>{
    const statement = `
    SELECT * 
    FROM avatar
    WHERE userId = ?
    ORDER BY avatar.id desc
    limit 1

    `;

    const [data] = await connection.promise().query(statement,userId);
    return data[0];
};