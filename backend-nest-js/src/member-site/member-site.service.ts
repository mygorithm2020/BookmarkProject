import { Injectable } from '@nestjs/common';
import { CreateMemberSiteDto } from './dto/create-member-site.dto';
import { UpdateMemberSiteDto } from './dto/update-member-site.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberCategory } from 'src/member-category/entities/member-category.entity';
import { MemberCategorySite } from './entities/member-category-member-site';
import { DataSource, DeleteResult, Repository } from 'typeorm';
import { CustomUtils } from 'src/publicComponents/utils';
import { Constraint } from 'src/publicComponents/constraint';
import { MemberSite } from './entities/member-site.entity';

@Injectable()
export class MemberSiteService {
  constructor(
    @InjectRepository(MemberSite) private msRepo: Repository<MemberSite>,
    @InjectRepository(MemberCategory) private mcRepo: Repository<MemberCategory>,
    @InjectRepository(MemberCategorySite) private mcsRepo: Repository<MemberCategorySite>,
    private readonly customUtils: CustomUtils,
    private readonly constraint: Constraint,
    private dataSource: DataSource,
  ) {}
  
  create(createMemberSiteDto: CreateMemberSiteDto) {
    return 'This action adds a new memberSite';
  }

  async findAll(memberId : string) {
    const categories = await this.msRepo.find({
      select: {
        MemberSiteId : true,
        MemberId : true,
        Img : true,
        Name: true,
        URL : true
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
    return `This action returns a #${id} memberSite`;
  }

  update(id: number, updateMemberSiteDto: UpdateMemberSiteDto) {
    return `This action updates a #${id} memberSite`;
  }

  remove(id: string) : Promise<DeleteResult> {
    const res = this.msRepo.delete(
      {
        MemberSiteId : id
      }
    );
    return res;
  }
}
