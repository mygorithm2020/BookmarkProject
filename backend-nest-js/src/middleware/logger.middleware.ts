import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";
import { CustomUtils } from "src/publicComponents/utils";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    constructor(private readonly cUtil : CustomUtils){

    }

    use(req: Request, res: Response, next: NextFunction) {
        console.log(req.body);
        // console.log(req.bodyUsed);
        // console.log(req.cache);
        // console.log(req.credentials);
        // console.log(req.destination);
        console.log(req.headers);
        // console.log(req.integrity);
        // console.log(req.method);
        // console.log(req.mode);
        // console.log(req.referrer);
        // console.log(req.referrerPolicy);
        // console.log(req.signal);
        // console.log(req.url);
        
        next();
        // console.log(res.body);
        // console.log(res.headers);
        // console.log(res.ok);
        // console.log(res.redirected);
        // console.log(res.status);
        // console.log(res.statusText);
        // console.log(res.type);
        // console.log(res.url);

        // 바디도 넣고 싶은데... 흠 일단 보류
        // 응답이 왜이러지..
        const log = {
            timeStamp: this.cUtil.getUTCDate(),
            url: req.url,
            res: res.status
        };

        console.log(log);
    }
}

export function midLogger(req: Request, res: Response, next : NextFunction){
    console.log("midLogger func");
    next();
}
