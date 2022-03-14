import {Request, Response, NextFunction} from "express";
import bcrypt from 'bcrypt';
import * as userService from '../user/user.service';
export const validateLoginData = async (
    request: Request,
    response: Response,
    next: NextFunction
)=>{
    /**
     * 准备数据
     */
    const {name,password} = request.body;
    /**
     * 用户/密码为空
     */
    if(!name) return next (new Error('NAME_IS_REQUIRED'));
    if (!password) return next (new Error('PASSWORD_IS_REQUIRED'))
   /**
    *执行service,提取数据库的name 和password
    */
    const user = await userService.getUserByName(name,{ hasPassword: true } );
    /**
     * 验证用户名
     */
    if(!user) return next (new Error('USER_DOSE_NOT_EXIST'));
    /**
     * 验证对比密码
     */
    const match = await bcrypt.compare(password,user.password);
    if (!match) return next(new Error('PASSWORD_IS_WRONG'));
    next();
    

};