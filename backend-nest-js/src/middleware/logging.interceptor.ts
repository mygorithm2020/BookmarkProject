import { CallHandler, ExecutionContext, HttpException, HttpStatus, Injectable, NestInterceptor } from "@nestjs/common";
import { catchError, Observable, tap } from "rxjs";
import { CustomUtils, FileAdapter } from "src/publicComponents/utils";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {

  constructor(private readonly cUtil : CustomUtils, private readonly fAdapter : FileAdapter){
  }
  
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    console.log("interceptor");
    console.log(req.body);
    console.log(req.cookie);
    console.log(req.cookies);
    console.log(req.headers);

    const key = this.cUtil.getUuId(10);

    // 요청 로그 넣고
    // 바디도 넣고 싶은데... 흠 일단 보류
    const log = {
      timeStamp: this.cUtil.getUTCDate(),
      logKey : key,
      method : req.method,
      host : req.headers["host"],      
      url: req.url,
      reqIP : req.ip,
      orgin : req.headers["origin"],
      userAgent : req.headers["user-agent"],

    };
    const logData = JSON.stringify(log);
    console.log(logData);
    const logDate = log.timeStamp.getUTCFullYear() + 
    (log.timeStamp.getMonth() +1).toString().padStart(2, "0") + log.timeStamp.getUTCDate().toString().padStart(2, "0") + ".log";
    this.fAdapter.writeLog(logData, logDate, "log", "interceptor", "req");


    const now = Date.now();
    // 응답 결과 넣고
    return next
      .handle()
      .pipe(
        tap(() => {            
            const res = context.switchToHttp().getResponse();
            // console.log(`After... ${Date.now() - now}ms`);
            const resLog = {
              timeStamp: this.cUtil.getUTCDate(),
              logKey : key,
              status : res.statusCode,              
            };
            const resLogData = JSON.stringify(resLog);
            console.log(resLogData);
            this.fAdapter.writeLog(resLogData, logDate, "log", "interceptor", "res");
        }),
      );
  }
}