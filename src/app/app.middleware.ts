import { Request, Response, NextFunction, } from "express";

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
    default:
        statusCode=500;
        message='处理器错误!';
        break;
};
response.status(statusCode).send({message});

}