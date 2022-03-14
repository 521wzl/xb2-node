import { Request, Response, NextFunction, } from "express";
import { validateUserData } from "../user/user.middleware";
import { validateLoginData } from "../auth/auth.middleware";
export const requestUrl =(
    request: Request,
    response: Response,
    next: NextFunction
)=>{
    /**
     * 中间件：控制台输出请求地址
     */

    console.log(request.url)
    next();
};
/**
 *中间件：异常信息处理
 */
export const defaultErrorHandler=(
    error: any,
    request: Request,
    response: Response,
    next: NextFunction,

)=>{
    if(error.message){
        console.log('error:',error.message)
    };
let statusCode: number,message: string;
switch(error.message){
    case "NAME_IS_REQUIRED":
        statusCode=400;
        message = '用户名为空';
        break;

    case "PASSWORD_IS_REQUIRED":
        statusCode=400;
        message = '用户密码为空';
        break;
    case "USER_DOSE_NOT_EXIST":
            statusCode=400;
            message = '用户不存在';
            break;
    case "NAME_ALREADY_EXIST":
        statusCode=400;
        message = '用户名已经被占用';
        break;
    case "PASSWORD_IS_WRONG":
        statusCode=400;
        message = '密码不对';
        break;
    default:
        statusCode=500;
        message='处理器错误!';
        break;
};
response.status(statusCode).send({message});

}