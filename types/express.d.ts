import { TokenPayload } from "../src/auth/auth.interface";
declare global{
    namespace Express{//第一个字母要大写
        export interface Request{//修改的Request 的类型而不是request 类型
            user: TokenPayload;

        }
    }
}