import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';
import { CustomUtils, FileAdapter } from "src/publicComponents/utils";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    constructor(private readonly cUtil : CustomUtils, private readonly fAdapter : FileAdapter){

    }

    use(req: Request, res: Response, next: NextFunction) {
        console.log("middleware");
        // console.log(req.body);
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
        // console.log(req.ip);
        
        
        
        // console.log(res.body);
        // console.log(res.headers);
        // console.log(res.ok);
        // console.log(res.redirected);
        // console.log(res.status);
        // console.log(res.statusText);
        // console.log(res.type);
        // console.log(res.url);

        // // 바디도 넣고 싶은데... 흠 일단 보류
        // // 응답이 왜이러지..        
        // const log = {
        //     timeStamp: this.cUtil.getUTCDate(),
        //     host : req.headers["host"],
        //     method : req.method,
        //     url: req.url,
        //     orgin : req.headers["origin"],
        //     res: res["status"]
        // };
        // // const logData = log.timeStamp.toISOString() + ", " + log.method + ", " + log.url;
        // const logData = JSON.stringify(log);
        // console.log(logData);
        // const logDate = log.timeStamp.getUTCFullYear() + 
        // (log.timeStamp.getMonth() +1).toString().padStart(2, "0") + log.timeStamp.getUTCDate().toString().padStart(2, "0") + ".log";
        // this.fAdapter.writeLog(logData, logDate, "log", "middleware");
        next();
    }
}

@Injectable()
export class FirewallMiddleware implements NestMiddleware {
    private readonly permittedOrigin = new Set([
        "http://127.0.0.1:5500",
        "http://localhost:5500",
        "http://dothomeftp.dothome.co.kr",
        "https://mygorithm2020.mycafe24.com",
        "https://browseys.site",
    ]);

    private readonly permittedIP = new Set([
        "::1",
        "127.0.0.1",
        "localhost",
    ]);
    constructor(private readonly cUtil : CustomUtils, private readonly fAdapter : FileAdapter){

    }

    use(req: Request, res: Response, next: NextFunction) {
        console.log("FirewallMiddleware");

        // // 바디도 넣고 싶은데... 흠 일단 보류
        // // 응답이 왜이러지..        
        // const log = {
        //     timeStamp: this.cUtil.getUTCDate(),
        //     host : req.headers["host"],
        //     method : req.method,
        //     url: req.url,
        //     orgin : req.headers["origin"],
        //     res: res["status"]
        // };
        // // const logData = log.timeStamp.toISOString() + ", " + log.method + ", " + log.url;
        // const logData = JSON.stringify(log);
        // console.log(logData);
        // const logDate = log.timeStamp.getUTCFullYear() + 
        // (log.timeStamp.getMonth() +1).toString().padStart(2, "0") + log.timeStamp.getUTCDate().toString().padStart(2, "0") + ".log";
        // this.fAdapter.writeLog(logData, logDate, "log", "middleware");

        // 허용되지 않은 접근은 여기서 리턴
        // 허용 조건 : ip가 로컬이거나, origin이 맞아야 함
        if (this.permittedIP.has(req.ip) || (req.headers["origin"] && this.permittedOrigin.has(req.headers["origin"]))){
            next();
        } else {
            throw new HttpException({
                code : 3,
                message : "wrong approach",
            }, HttpStatus.UNAUTHORIZED);
        }
        
        // console.log(res.statusCode);
    }
}

export function midLogger(req: Request, res: Response, next : NextFunction){
    console.log("midLogger func");
    next();
}
