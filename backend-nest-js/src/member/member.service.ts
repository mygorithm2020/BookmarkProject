import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { Repository } from 'typeorm';
import { CustomEncrypt, CustomUtils } from 'src/publicComponents/utils';
import * as bcrypt from 'bcrypt';
import { ServerCache } from 'src/publicComponents/memoryCache';
import { Constraint } from 'src/publicComponents/constraint';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class MemberService {

  constructor(
    @InjectRepository(Member) private mRepo: Repository<Member>,
    private readonly customUtils : CustomUtils,
    private readonly constraint : Constraint,
    private jwtService: JwtService,
  ) { }

  async createPublic(memObj: CreateMemberDto) : Promise<Member> {        
    // 기존에 있으면 리턴
    const member = await this.findOneByEmailPublic(memObj.MemEmail);
    if (member || member.MemberId){
      throw new HttpException({
        errCode : 21,
        error : "same email already exist"
      }, HttpStatus.BAD_REQUEST);
    }   
    
    this.constraint.generateMemObj(memObj);
    const newMem = this.mRepo.create(memObj);
    let res = await this.mRepo.save(newMem);
    return res;    
  }

  // 나중에 oauth 인증도 추가 구글이랑 네이버 정도...? 카카오까지?

  

  async signInWithEmailPw(email : string, pw : string) : Promise<{ access_token: string }> { 
    console.log('This action loginWithEmailPw');
    
    // 이메일과 비밀번호에 해당하는게 있는지 체크
    const member = await this.findOneByEmailAdmin(email);
    // if (!member || !member.MemberId || !bcrypt.compareSync(pw, member.password)){
    //   throw new HttpException({
    //     errCode : 24,
    //     error : "There is no member corresponding email and pw"
    //   }, HttpStatus.BAD_REQUEST);
    // } else if (member.Authentication == 1){ // 인증 상태 체크
    //   throw new HttpException({
    //     errCode : 25,
    //     error : "need to auth"
    //   }, HttpStatus.BAD_REQUEST);

    // } else if (member.Authentication == 3){
    //   throw new HttpException({
    //     errCode : 26,
    //     error : "forbidden member"
    //   }, HttpStatus.BAD_REQUEST);
    // }

    // 세션에 등록
    let sessionId : string = await this.constraint.makeSessionId(member.MemberId);
    ServerCache.setSession(sessionId);
    sessionId = CustomEncrypt.getInstance().encryptAes256(sessionId);
    // 세션 키 리턴
    // return sessionId;

    let temp = {MemberEmail : member.MemEmail, Con : member.Authentication, Status : member.Authorization};
    console.log(temp);

    // 여기서 페이로드 값을 암호화 하고 다시 체크할 때 복호화해서 쓰자
    const payload = {MemberEmail : member.MemEmail, Con : member.Authentication, Status : member.Authorization};
    const refreshPayoad = {}
    return {
      access_token : await this.jwtService.signAsync(payload)
    }    
    
  }

  async findAllAdmin() : Promise<Member[]> {
    console.log(`This action returns all member`);
    
    return await this.mRepo.find({
      where : {
        IsDeleted : 0
      }
    });
  }

  findOnePublic(id: string) : Promise<Member> {
    console.log(`This action returns a #${id} member`);
    return this.mRepo.findOne({
      select : {
        MemberId : true,
        MemEmail : true,
        NickName : true,
        Birth : true,
        Gender : true,
      },
      where : {
        MemberId :  id,
        Authentication : 2,
        IsDeleted : 0
      }
    })    
  }

  async findOneByEmailPublic(email: string) : Promise<Member> {
    console.log(`This action findOneByEmailPw`);
    let res : Member = await this.mRepo.findOne({
      select : {
        MemberId : true,
        MemEmail : true,
        NickName : true,
        Birth : true,
        Gender : true,
        CreateDate : true
      },
      where : {
        MemEmail : email,
        IsDeleted : 0
      },
    })
    return res;    
  }

  async findOneByEmailAdmin(email: string) : Promise<Member> {
    let res : Member = await this.mRepo.findOne({
      where : {
        MemEmail : email,
        IsDeleted : 0
      },
    })
    return res;    
  }
  

  // 암호화 할때마다 비밀번호가 바뀌여서 비교를 서버에서 할 수 밖에 없음....
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
    // return await this.mRepo.update(id, updatememberDto);
  }

  async updatePublic(id: string, updatememberDto: Member) : Promise<number> {
    console.log(`This action updates a #${id} member`);    
    let res = await this.mRepo.update(id, {
      ...updatememberDto, UpdateDate : this.customUtils.getUTCDate()
    });
    return res.affected;
  }

  async remove(id: string) {
    console.log(`This action removes a #${id} member`);
    await this.mRepo.update(id, {
      IsDeleted : 1,
      UpdateDate : this.customUtils.getUTCDate()
    })
  }
}
