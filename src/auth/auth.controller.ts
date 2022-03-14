import {Request,Response,NextFunction, response} from 'express';
export const login = async (
    request: Request,
    response: Response,
    next: NextFunction

)=>{
    console.log('用户登陆')
    const {name,password} = request.body;
    response.send({message:`欢迎回来,${name}`});

};
