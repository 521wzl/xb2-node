import { Request, Response, NextFunction, } from "express";
import { validateUserData } from "../user/user.middleware";
import { validateLoginData } from "../auth/auth.middleware";

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
        console.log('error:', error.message)//在控制台输出一个错误信息
    };
let statusCode: number, message: string;

/**
 * 根据控制输出的错误信息定义客户端应该做出的响应
 */

switch(error.message){
    case "NAME_IS_REQUIRED":
        statusCode = 400;
        message = '用户名为空';
        break;

    case "PASSWORD_IS_REQUIRED":
        statusCode = 400;
        message = '用户密码为空';
        break;
    case "USER_DOSE_NOT_EXIST":
        statusCode = 400;
        message = '用户不存在';
        break;
    case "NAME_ALREADY_EXIST":
        statusCode = 400;
        message = '用户名已经被占用';
        break;
    case "USER_DOSE_NOT_OWN_RESOURCE":
        statusCode = 403;
        message = '对不起!您没有处理该内容的权限';
        break;
    case "FILE_NOT_EXIST":
        statusCode = 404;
        message = '文件不存在';
        break;

    case "UNABLE_REPLY_THIS_COMMENT":
        statusCode = 404;
        message = '您不能回复这条评论';
    case "TAG_EXIST_ALREADY":
        statusCode = 404;
        message = '标签已存在';
        break;
   
    case "POST_TAG_EXIST_ALREADY":
        statusCode = 404;
        message = '内容标签已存在';
        break;
    default:
        statusCode = 500;
        message='处理器错误!';
        break;
};
response.status(statusCode).send({message});//执行客户端响应输出一个状态码和一个响应信息

}