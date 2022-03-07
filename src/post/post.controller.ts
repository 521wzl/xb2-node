import { Request, Response, NextFunction } from 'express';
import {getPosts} from './post.service';
export const index=(
    request: Request,
    response: Response,
    next: NextFunction
)=>{
    console.log(request.headers);
    if (request.headers.authorization !== 'SECRET') {
     return next(new Error());
};
    const posts=getPosts();
    response.send(posts);
};
