import { HttpException, HttpStatus } from "@nestjs/common";

export class CustomExceptionHandler {
    
}

export class MysqlException {
    constructor(errCode : string, status? : HttpStatus){
        if (errCode === "ER_DUP_ENTRY"){
            throw new HttpException("unique key duplicate", status || HttpStatus.BAD_REQUEST);
            throw new HttpException({
                errCode : 21,
                error : "server Error, can not make site model"
        
            }, HttpStatus.BAD_REQUEST);
        }else {
            throw new HttpException("errrrrorrrr!", status || HttpStatus.BAD_REQUEST);
        }
    }

    static throwHttpException(errCode : string, status? : HttpStatus){
        if (errCode === "ER_DUP_ENTRY"){
            throw new HttpException("unique key duplicate", status || HttpStatus.BAD_REQUEST);
        }else {
            throw new HttpException("errrrrorrrr!", status || HttpStatus.BAD_REQUEST);
        }
    }
}


