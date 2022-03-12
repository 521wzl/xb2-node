import {Request,Response,NextFunction} from 'express';
import * as userService from './user.service'
import bcrypt from 'bcrypt';
export const validateUserData = async (
    request: Request,
    response: Response,
    next: NextFunction
)=>{
    console.log('验证用户数据');
    const {name, password} = request.body;
    if (!name)
    return next(new Error ('NAME_IS_REQUIRED'));
    
    if (!password)
    return next(new Error ("PASSWORD_IS_REQUIRED"));

    /**
     * 用户名重复判断
     */
    const user = await userService.getUserByName (name);// user不能写成name，就少写了个await，程序就卡在那儿，不往下走了
    if (user)   
    return next (new Error ('NAME_ALREADY_EXIST'))
    next();


};


/**
 * hash密码
 */
export const hashPassword = async (
    request: Request,
    response: Response,
    next: NextFunction
)=>{
    console.log('hash密码')
const {password} = request.body;
request.body.password = await bcrypt.hash (password, 10)

next();

};