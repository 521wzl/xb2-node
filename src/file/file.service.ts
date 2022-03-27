import {connection} from '../app/database/mysql';
import { FileModel } from './file.model';
/**
 * 定义上传文件服务
 */
export const creatFile = async(
    file:FileModel
)=>{
const statement = `
INSERT INTO file
SET ?

`;
const [data] = await connection.promise().query(statement,file);
return data;
};

 /**
  * 定义文件服务功能
 */
export const findFileById = async(fileId:number)=>{
    
    const statement = `
   SELECT * FROM file
   WHERE id = ?
    `;
const [data] = await connection.promise().query(statement,fileId);
return data[0];
};
/**
 * 
 */