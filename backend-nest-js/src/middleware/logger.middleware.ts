import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';
import { CustomUtils, FileAdapter } from "src/publicComponents/utils";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    constructor(private readonly cUtil : CustomUtils, private readonly fAdapter : FileAdapter){

    }

    use(req: Request, res: Response, next: NextFunction) {
        console.log(req.body);
        // console.log(req.bodyUsed);
        // console.log(req.cache);
        // console.log(req.credentials);
        // console.log(req.destination);
        // console.log(req.headers);
        // console.log(req.integrity);
        // console.log(req.method);
        // console.log(req.mode);
        // console.log(req.referrer);
        // console.log(req.referrerPolicy);
        // console.log(req.signal);
        // console.log(req.url);
        console.log(req.ip);
        
        
        
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
            host : req.headers["host"],
            method : req.method,
            url: req.url,
            orgin : req.headers["origin"],
            res: res["status"]
        };
        // const logData = log.timeStamp.toISOString() + ", " + log.method + ", " + log.url;
        const logData = JSON.stringify(log);
        console.log(logData);
        const logDate = log.timeStamp.getUTCFullYear() + 
        (log.timeStamp.getMonth() +1).toString().padStart(2, "0") + log.timeStamp.getUTCDate().toString().padStart(2, "0") + ".log";
        this.fAdapter.writeLog(logData, logDate, "log", "middleware");

        const permittedOrigin = new Set([
            "http://127.0.0.1:5500",
            "http://localhost:5500",
            "http://dothomeftp.dothome.co.kr",
            "https://mygorithm2020.mycafe24.com",
        ]);
        if (!req.headers["origin"] || !permittedOrigin.has(req.headers["origin"])){
            // throw new HttpException({
            //     code : 2,
            //     message : "check your request env"
        
            // }, HttpStatus.FORBIDDEN);
        }

        next();
        // console.log(res.statusCode);
    }
}

export function midLogger(req: Request, res: Response, next : NextFunction){
    console.log("midLogger func");
    next();
}
