import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { BaseExceptionFilter, HttpAdapterHost } from '@nestjs/core';
import { Request, Response } from 'express';
import { HttpErrorCode } from 'src/publicComponents/ExceptionHandler';
import { CustomUtils, FileAdapter } from 'src/publicComponents/utils';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    console.log(exception);

    //에러 로그 남기기
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly cUtil: CustomUtils,
    private readonly fAdapter: FileAdapter,
  ) {}
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    console.log('exception');

    // console.log(exception);
    // 로그는 실제 에러를 작성
    const log = {
      timeStamp: this.cUtil.getUTCDate(),
      method: req.method,
      url: req.url,
      exception,
    };

    try {
      // 파일에 기록하는 부분 추가
      const logData = JSON.stringify(log);
      console.log(logData);
      const logDate =
        log.timeStamp.getUTCFullYear() +
        (log.timeStamp.getMonth() + 1).toString().padStart(2, '0') +
        log.timeStamp.getUTCDate().toString().padStart(2, '0') +
        '.log';
      this.fAdapter.writeLog(logData, logDate, 'log', 'exceptionFilter');
    } catch {}

    let resException: HttpException;

    // 프론트에는 미리 설정 못했다는 의미로 서버에러 리턴
    if (!(exception instanceof HttpException)) {
      exception = new HttpException(
        {
          errCode: HttpErrorCode.Unknown,
          error: 'Internal Server Error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // resException = exception as HttpException;

    const response = (exception as HttpException).getResponse();
    res.status((exception as HttpException).getStatus()).json(response);
  }
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    console.log(exception);
    console.log(this.httpAdapterHost);

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}

@Catch()
export class AllExceptionsFilterSimple extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    super.catch(exception, host);
  }
}
