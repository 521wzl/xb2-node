import { connection } from '../app/database/mysql';
import { Tag_Model } from './tag.model';
/**
 *为tag表 添加name 字段内容
 */
export const creat_tag = async(tag_name: Tag_Model)=>{
    const statement = `
    INSERT INTO tag
    SET ?
    `;
    const [data] = await connection.promise().query(statement,tag_name);
    return data as any ;
   

};
/**
 * 检查tag表中的标签
 */
export const get_tag_by_name = async(tag_name:string)=>{
    const statement = `
    SELECT id, name FROM tag
    WHERE name = ?
    
    `;
    const [data] = await connection.promise().query(statement,tag_name);
    return data[0] ;
  

};
