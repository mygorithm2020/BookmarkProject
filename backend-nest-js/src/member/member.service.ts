import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { Repository } from 'typeorm';
import { CustomEncrypt, CustomUtils } from 'src/publicComponents/utils';
import * as bcrypt from 'bcrypt';
import { ServerCache } from 'src/publicComponents/memoryCache';

@Injectable()
export class MemberService {

  constructor(
    @InjectRepository(Member) private mRepo: Repository<Member>,
    private readonly customUtils : CustomUtils
  ) { }

  correctionMemObj(memObj : Member){
    // 비밀번호 암호화
    memObj.password = CustomEncrypt.getInstance().encryptHash(memObj.password);

    if (memObj.NickName == null){
      memObj.NickName = memObj.MemEmail.slice(0, memObj.MemEmail.indexOf("@"));      
    }

    memObj.Authorization = 0;
    // 인증되었는지 확인 필요
    if (true){
      memObj.Authorization = 1;
    }
  }

  async makeSessionId(memberId : string) : Promise<string> {
    // 값 여러개를 더해서 암호화하기
    let res = memberId +"|"+ new Date().toUTCString();
    console.log(res);
    console.log(Buffer.from(res, "utf-8").toString("base64"));
    return res;
  }

  decryptSessionId(memberId : string) : string {
    // 값 여러개를 더해서 암호화하기
    let res = memberId + new Date().toUTCString();
    return res;
  }

  async create(memObj: CreateMemberDto) : Promise<Member> {        
    console.log('This action adds a new member');
    // 기존에 있으면 리턴

    const member = await this.findOneByEmail(memObj.MemEmail);
    if (member || member.MemberId){
      throw new HttpException({
        errCode : 21,
        error : "same email already exist"
      }, HttpStatus.BAD_REQUEST);
    }
   
    
    // uuid 생성
    const newId = this.customUtils.get32UuId();
    memObj.MemberId = newId;
    this.correctionMemObj(memObj);

    console.log(memObj);
    const newMem = this.mRepo.create(memObj);
    console.log(newMem);
    let res = await this.mRepo.save(newMem);
    return res;
    
  }

  // 나중에 oauth 인증도 추가 구글이랑 네이버 정도...? 카카오까지?

  emailCheck(email : string) : boolean{
    let res = true;
    if (!email.includes("@")){
      res = false;
    }
    return res
  }

  passwordCheck(pw : string) : boolean{
    let res = true;
    if (pw.length < 6){
      res = false;
    }
    return res
  }

  async loginWithEmailPw(email : string, pw : string) : Promise<string> { 
    console.log('This action loginWithEmailPw');

    if (!email || !pw){
      throw new HttpException({
        errCode : 21,
        error : "email and pw are required"
      }, HttpStatus.BAD_REQUEST);
    }  
    if (!this.emailCheck(email)){
      throw new HttpException({
        errCode : 22,
        error : "input right email address"
      }, HttpStatus.BAD_REQUEST);
    }

    if (!this.passwordCheck(pw)){
      throw new HttpException({
        errCode : 23,
        error : "input right password, password must be at least 6 character"
      }, HttpStatus.BAD_REQUEST);
    }
    
    
    // 이메일과 비밀번호에 해당하는게 있는지 체크
    const member = await this.findOneByEmail(email);
    if (!member || !member.MemberId || !bcrypt.compareSync(pw, member.password)){
      throw new HttpException({
        errCode : 22,
        error : "There is no member corresponding email and pw"
      }, HttpStatus.BAD_REQUEST);
    } else if (member.Authentication == 0){ // 인증 상태 체크
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
    let sessionId : string = await this.makeSessionId(member.MemberId);
    ServerCache.setSession(sessionId);
    sessionId = await CustomEncrypt.getInstance().encryptAes256(sessionId);

    // 세션 키 리턴
    return sessionId;
    
  }

  sendAuthEmail(email : string){
    // 이메일 보내고 => 이건 안기다려도 될듯
    // 디비에 인증번호랑 등록
    // 결과 리턴
    
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

  async findOneByEmail(email: string) : Promise<Member> {
    console.log(`This action findOneByEmailPw`);
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
    return await this.mRepo.update(id, updatememberDto);
  }

  async remove(id: string) {
    console.log(`This action removes a #${id} member`);
    await this.mRepo.update(id, {
      IsDeleted : 1
    })
  }
}
