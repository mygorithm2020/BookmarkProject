import { Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { Repository } from 'typeorm';
import { Uuid } from 'src/publicComponents/utils';

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
    const newId = Uuid.get32Id();
    memObj.MemberId = newId;
    this.correctionMemObj(memObj);

    console.log(memObj);
    const newMem = this.mRepo.create(memObj);
    console.log(newMem);    
    return await this.mRepo.save(newMem);
    
  }

  async findAll() : Promise<Member[]> {
    console.log(`This action returns all member`);
    // 시간 이상하게 조회되는 문제 해결해야 함....
    // 왜 mysql에 들어있는 시간에서 자동으로 -9시간을 해오는거지.... 개 답답하네...
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
