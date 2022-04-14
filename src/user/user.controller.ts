/**
 * 定义一个用户注册的处理器
 */
import {Request,Response,NextFunction} from 'express';
import {UserModel} from './user.model';

import * as userService  from './user.service';//存在疑问
import bcrypt from 'bcrypt'
export const store = async (
    request: Request,
    response: Response,
    next: NextFunction
)=>{
/**
 * 准备数据
 */
const {name,password} = request.body;
try{
    
    const data = await userService.creatUser({name,password});
    response.status(203).send(data)
}catch(error){
    next(error);
}
};