import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();

    // 요청 로그 넣고
    console.log('Before...' + req.ip);
    

    const now = Date.now();
    // 응답 결과 넣고
    return next
      .handle()
      .pipe(
        tap(() => {            
            const res = context.switchToHttp().getResponse();
            console.log(`After... ${Date.now() - now}ms   ${res.statusCode}`);
        }),
      );
  }
}