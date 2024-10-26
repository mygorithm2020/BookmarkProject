import { HttpException, HttpStatus } from '@nestjs/common';

// @Injectable()
export class CHttpException extends HttpException {
  // 표준 규칙화
  constructor(code: number, msg: string, status: number) {
    super(
      {
        ResCode: code,
        ResMsg: msg,
      },
      status,
    );
  }
}

export class MysqlException {
  constructor(errCode: string, status?: HttpStatus) {
    if (errCode === 'ER_DUP_ENTRY') {
      throw new HttpException(
        'unique key duplicate',
        status || HttpStatus.BAD_REQUEST,
      );
      throw new HttpException(
        {
          errCode: 21,
          error: 'server Error, can not make site model',
        },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      throw new HttpException('errrrrorrrr!', status || HttpStatus.BAD_REQUEST);
    }
  }

  static throwHttpException(
    sqlErrorCode: string,
    errCode: number,
    msg?: string,
    status?: HttpStatus,
  ) {
    if (sqlErrorCode === 'ER_DUP_ENTRY') {
      throw new HttpException(
        {
          errCode: errCode,
          error: 'unique key duplicate',
        },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      throw new HttpException(
        {
          errCode: errCode,
          error: 'mysql db error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

// 에러코드는 한 라우터 내에서 여러번 사용 불가능
// 1~ 10 전반적인 에러 2번이상 사용 불가능
// 11~ 19 : controller 내
// 21 ~ 29 : service 내
// 51 ~ 59 :
export enum HttpErrorCode {
  Unknown = 1,
  MiddleAuth = 3,
  AuthOne = 6,
  AuthTwo = 7,
  Controller1 = 11,
  Controller2 = 12,
  Controller3 = 13,
  Controller4 = 14,
  Controller5 = 15,
  Controller6 = 16,
  Controller7 = 17,
  Service1 = 21,
  Service2 = 22,
  Service3 = 23,
  Service4 = 24,
  Service5 = 25,
  Service6 = 26,
  Service7 = 27,
  Service8 = 28,
}
