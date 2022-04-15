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