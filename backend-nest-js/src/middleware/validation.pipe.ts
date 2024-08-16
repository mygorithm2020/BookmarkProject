import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';


// 어딘가에서 xxs(스크립트 삽입)이랑 sqlinjection(쿼리 삽입) 공격 방지 데이터 처리 필요
@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log("pipe");
    return value;
  }
}