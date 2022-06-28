import {Request,Response,NextFunction} from 'express';
import {signToken} from './auth.service';
import {validateLoginData} from './auth.middleware'
import { identity } from 'lodash';
export const login = async (
    request: Request,
    response: Response,
    next: NextFunction

)=>{
    /**
     * 签发令牌
     */
    console.log('签发令牌')
    const{user:{id,name}} = request.body;//此处的user，来自auth.middleware   中的   request.body.user = user
    const payload = {id,name};
    try{
    
        const token  = signToken({payload});//签发令牌
        response.send({id,name,token})

    }catch(error){
        next(error);
    };
    
    

};
/**
 * 验证用户登陆身份
 */
export const validate =(
    request: Request,
    response: Response,
    next: NextFunction
)=>{
    response.sendStatus(201);
    console.log(request.user)

};