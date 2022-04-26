import {Request,Response,NextFunction} from 'express';
import * as userService from './user.service'
import bcrypt from 'bcrypt';
import _, { truncate } from 'lodash';

export const validateUserData = async (
    request: Request,
    response: Response,
    next: NextFunction
)=>{
    console.log('验证用户数据');
    const {name, password} = request.body;//客户端输入的数据
    if (!name)
    return next(new Error ('NAME_IS_REQUIRED'));
    
    if (!password)
    return next(new Error ("PASSWORD_IS_REQUIRED"));

    /**
     * 用户名重复判断
     */
    const user = await userService.getUserByName (name);// user不能写成name，就少写了个await，程序就卡在那儿，不往下走了，此处的user是一个数组，里面包含id,name
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
request.body.password = await bcrypt.hash(password, 10)

next();

};

 /**
  * 定义一个更新用户账户的中间件,结果会得到一个被hash 过的密码
  */
 export const  ValidateUserUpdateData = async (
     request:Request,
     response:Response,
     next:NextFunction
 ) =>{
     //准备数据
     const { validate, update } = request.body;
     const { id: userId } = request.user;
     try{
     //判断客户端是否提供原始密码
     if(!_.has(validate,'password')){
         return next(new Error('PASSWORD_IS_REQUIRED'));
     };
     //从客户端数据库获取密码数据
     const user = await userService.getUserById(userId, {password: true});
 
     //验证密码
     const matched = await bcrypt.compare(validate.password, user.password);
    
     //对结果进行判断
     if(!matched){
         return next (new Error('PASSWORD_DOES_NOT_MATCH'));
     };
    //验证用户名是否被占用
   
    if(update.name){
        const user = await userService.getUserByName(update.name);
        console.log(user);
        if(user){
            return next(new Error('NAME_ALREADY_EXIST'));
        };
    };
    
    //检查新旧密码是否一致
    if(update.password){
        const matched = await bcrypt.compare(update.password, user.password);
        if(matched){
            return next(new Error('PASSWORD IS THE SAME'));
        };
         //对新密码进hash 处理
   
         request.body.update.password = await bcrypt.hash(update.password, 10);
         console.log(request.body.validate.password)
    };
   
    }catch(error){
       return next(error);

    };


    next();

 };