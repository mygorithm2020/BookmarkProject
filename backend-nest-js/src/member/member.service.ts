import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { Repository } from 'typeorm';
import { CustomUtils } from 'src/publicComponents/utils';

@Injectable()
export class MemberService {

  constructor(@InjectRepository(Member)
  private mRepo: Repository<Member>) { }

  encryptPassword(passwordStr : string) : string{

    // 해시 암호 SHA256으로 구현 필요 결과 64자
    let res = "90579d3f6e254858ac9e01c50a069a5f9b38f902589b40e2b8ced84ffc15fec7";

    return res;
  }

  correctionMemObj(memObj : Member){
    // 비밀번호 암호화
    memObj.password = this.encryptPassword(memObj.password);

    if (memObj.NickName === null){
      memObj.NickName = memObj.MemEmail.slice(0, memObj.MemEmail.indexOf("@"));      
    }

    memObj.Authorization = 1;
    
  }

  async create(memObj: Member) : Promise<Member> {    
    
    console.log('This action adds a new member');
    // uuid 생성
    const newId = CustomUtils.get32UuId();
    memObj.MemberId = newId;
    this.correctionMemObj(memObj);

    console.log(memObj);
    const newMem = this.mRepo.create(memObj);
    console.log(newMem);    
    return await this.mRepo.save(newMem);
    
  }

  // 나중에 oauth 인증도 추가 구글이랑 네이버 정도...? 카카오까지?

  async loginWithEmailPw(email : string, pw : string) : Promise<string> { 

    if (!email || !pw){
      throw new HttpException({
        errCode : 21,
        error : "email and pw are required"
      }, HttpStatus.BAD_REQUEST);
    }  
    
    console.log('This action loginWithEmailPw');

    // 비밀번호 암호화
    pw = this.encryptPassword(pw);
    // 이메일과 비밀번호에 해당하는게 있는지 체크
    const member = await this.findOneByEmailPw(email, pw);
    if (!member || !member.MemberId){
      throw new HttpException({
        errCode : 22,
        error : "There is no member corresponding email and pw"
      }, HttpStatus.BAD_REQUEST);
    }

    // 인증 상태 체크
    if (member.Authentication == 0){
      throw new HttpException({
        errCode : 23,
        error : "need to auth"
      }, HttpStatus.BAD_REQUEST);

    } else if (member.Authentication == 2){
      throw new HttpException({
        errCode : 24,
        error : "forbidden member"
      }, HttpStatus.BAD_REQUEST);
    }

    // 세션에 등록
    let sessionId : string = "";

    // 세션 키 리턴
    return sessionId;
    
  }

  async findAll() : Promise<Member[]> {
    console.log(`This action returns all member`);
    
    return await this.mRepo.find();
  }

  findOne(id: string) : Promise<Member> {
    console.log(`This action returns a #${id} member`);
    return this.mRepo.findOne({
      where : {
        MemberId :  id
      }
    })    
  }

  async findOneByEmailPw(email: string, pw : string) : Promise<Member> {
    console.log(`This action findOneByEmailPw`);
    let res : Member = await this.mRepo.findOne({
      where : {
        MemEmail : email,
        password : pw,
        IsDeleted : 0
      },
    })
    return res;    
  }

  async update(id: string, updatememberDto: Member) {
    console.log(`This action updates a #${id} member`);    
    // console.log(await this.cRepo.update(id, updatememberDto));
    // 반환값이 뭐지...?? => UpdateResult { generatedMaps: [], raw: [], affected: 1 }
    return await this.mRepo.update(id, updatememberDto);
  }

  async remove(id: string) {
    console.log(`This action removes a #${id} member`);
    await this.mRepo.update(id, {
      IsDeleted : 1
    })
  }
}
