import { Injectable } from '@nestjs/common';
import { CreateAuthenticationDto } from './dto/create-authentication.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';

@Injectable()
export class AuthenticationService {
  create(createAuthenticationDto: CreateAuthenticationDto) {
    return 'This action adds a new authentication';
  }

  sendAuthEmail(email : string){
    // 이메일 보내고 => 이건 안기다려도 될듯
    // 디비에 인증번호랑 등록
    // 결과 리턴
    
  }

  findAll() {
    return `This action returns all authentication`;
  }

  findOne(id: number) {
    return `This action returns a #${id} authentication`;
  }

  update(id: number, updateAuthenticationDto: UpdateAuthenticationDto) {
    return `This action updates a #${id} authentication`;
  }

  checkAuthEmail(email : string, authCode : string){
    // 해당 메일로 보낸 가장 최근 코드 와 비교해서 맞는지 확인
    // 해당 코드 인증처리하고, 마무리
    // 만료시간 설정할까...???

  }

  remove(id: number) {
    return `This action removes a #${id} authentication`;
  }
}
