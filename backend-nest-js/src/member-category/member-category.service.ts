import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMemberCategoryDto } from './dto/create-member-category.dto';
import { UpdateMemberCategoryDto } from './dto/update-member-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberCategory } from './entities/member-category.entity';
import { Repository } from 'typeorm';
import { CustomUtils } from 'src/publicComponents/utils';
import { Constraint } from 'src/publicComponents/constraint';

@Injectable()
export class MemberCategoryService {
  constructor(
    @InjectRepository(MemberCategory) private mcRepo: Repository<MemberCategory>,
    private readonly customUtils: CustomUtils,
    private readonly constraint: Constraint,
  ) {}
  
  async create(memCate: CreateMemberCategoryDto) {
    // 개수 제한 무료버전은 최대 5개
    const newCategory = this.mcRepo.create(memCate);
    newCategory.MemberCategoryId = this.customUtils.get32UuId();

    let res = null;
    res = await this.mcRepo.save(newCategory);

    try {
            
    } catch (err) {
      console.log(err);
      throw new HttpException(
        {
          errCode: 21,
          error: err.sqlMessage,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return res;
  }

  async findAll(memberId : string) : Promise<MemberCategory[]> {
    const categories = await this.mcRepo.find({
      select: {
        MemberCategoryId : true,
        MemberId : true,
        Name: true,
        Sequence: true,
      },
      where: {
        MemberId : memberId
      },
      order: {
        CreatedDate : 'ASC'
      },
    });

    // let data = await this.cRepo.find()
    return categories;
  }

  findOne(id: number) {
    return `This action returns a #${id} memberCategory`;
  }

  update(id: number, updateMemberCategoryDto: UpdateMemberCategoryDto) {
    return `This action updates a #${id} memberCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} memberCategory`;
  }
}
