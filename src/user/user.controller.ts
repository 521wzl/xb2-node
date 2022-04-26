
/**
 * 定义一个用户注册的处理器
 */
import {Request, Response, NextFunction} from 'express';

import _ from 'lodash';

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
const {name, password} = request.body;
try{
    
    const data = await userService.creatUser({name,password});
    response.status(203).send(data)
}catch(error){
    next(error);
}
};
/**
 * 定义一个获取用户数据的接口
 */
export const show = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const {userId} = request.params;
    try{
    const user = await userService.getUserById(parseInt(userId,10));
    if(!user){return next(new Error('USER_DOES_NOT_EXIST'))};
    response.send(user);
    }catch(error){
          next(error)
    }

};
/**
 * 定义一个更新用户的接口处理器
 */
export const update = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    //const { name, password } = request.body.update;
    const userData = _.pick(request.body.update,["name", "password"])


    const {id:userId} = request.user;
    try{
        const data = await userService.updateUserData(userId, userData);
        response.send(data);

    }catch(error){
        next(error);
    }
};