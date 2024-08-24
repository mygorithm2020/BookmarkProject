import { HttpException, HttpStatus } from "@nestjs/common";

export class CHttpException {
    static set(status :HttpStatus, code: string | number, msg? : string){
        throw new HttpException({
            code,
            message : msg
    
        }, status);

    }
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

    static throwHttpException(sqlErrorCode : string, errCode : number, msg? : string, status? : HttpStatus){
        if (sqlErrorCode === "ER_DUP_ENTRY"){
            throw new HttpException({
                errCode : errCode,
                error : "unique key duplicate"
        
            }, HttpStatus.BAD_REQUEST);
        }else {
            throw new HttpException({
                errCode : errCode,
                error : "mysql db error"
        
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}


