import { Request, Response, NextFunction } from 'express';
import {getposts} from './post.service';
export const index=(
    request: Request,
    response: Response,
    next: NextFunction
)=>{
    const posts=getposts();
    response.send(posts);
};
