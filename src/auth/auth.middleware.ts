import {Request, Response, NextFunction, response} from "express";
import bcrypt from 'bcrypt';
import * as userService from '../user/user.service';
import jwt from 'jsonwebtoken';
import { PUBLIC_KEY } from "../app/app.config";
import { TokenPayload } from "./auth.interface";
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
    const user = await userService.getUserByName(name, { hasPassword: true } );//此处的name从request.body解构出来(替换： ？ 赋值给 WHERE name = ?）


    /**
     * 验证用户名
     */
    if(!user) return next (new Error('USER_DOSE_NOT_EXIST'));
    /**
     * 为request 添加一个属性user
     */
    request.body.user = user;//此处会被调用至签发令牌的处理器
    /**
     * 验证对比密码
     */
    const match = await bcrypt.compare(password,user.password);//password是从request.body里解构出来，user.password是从数据库里拿出来的
    if (!match) return next(new Error('PASSWORD_IS_WRONG'));
   
        
    next();
    

};
/**
 * 验证用户身份
 */
export const authGuard =(
    request: Request,
    response: Response,
    next : NextFunction
)=>{
    console.log('验证用户身份')
    const authorization = request.header('Authorization');
    if(!authorization) throw new Error();
    const token = authorization.replace('Bearer ','');
    console.log(token);
    if(!token) throw new Error();
    try{
        /**
         * 验证令牌
         */
        const decoded = jwt.verify(token,PUBLIC_KEY,{algorithms:['RS256']});//与签发是有区别的
        request.user = decoded as TokenPayload;
        next();
    }catch(error){
        /**
         * 上面的俩个throw new Error 都会转到这里执行
         */
        next(new Error('UNAUTHORIZED'));
    }
};
