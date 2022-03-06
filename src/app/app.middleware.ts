import { Request, Response, NextFunction, response} from "express";
import { request } from "http";
export const requesturl =(
    request: Request,
    response: Response,
    next: NextFunction
)=>{

    console.log(request.url)
    next();
};