/**
 * 端口配置
 */
import dotenv from 'dotenv';
dotenv.config();
/**
 * 配置应用
 */
export const {AIR_PORT} = process.env;
/**
 * 数据库环境变量配置
 */
export const{
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_DATABASE
}= process.env;
/**
 * 配置密钥
 */
export let {
    PRIVATE_KEY,
    PUBLIC_KEY

}=process.env;
/**
 * 再次将base64格式转换成原来的格式
 */
PRIVATE_KEY = Buffer.from(PRIVATE_KEY,'base64').toString();
PUBLIC_KEY = Buffer.from(PUBLIC_KEY,'base64').toString();