import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMemberSiteDto } from './dto/create-member-site.dto';
import { UpdateMemberSiteDto } from './dto/update-member-site.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberCategory } from 'src/member-category/entities/member-category.entity';
import { MemberCategorySite } from './entities/member-category-member-site';
import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';
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
  
  create(memberId : string, createMemberSiteDto: CreateMemberSiteDto) : Promise<MemberSite> {
    if (!memberId || !createMemberSiteDto.URL){
      throw new HttpException(
        {
          errCode: 21,
          error: "Missing required value",
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (createMemberSiteDto.Name && createMemberSiteDto.Name.length > 250){
      throw new HttpException(
        {
          errCode: 22,
          error: "too long name",
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    // 개수 제한 무료버전은 최대 100개
    const newCategory = this.msRepo.create(createMemberSiteDto);
    newCategory.MemberSiteId = this.customUtils.get32UuId();
    newCategory.MemberId = memberId;

    let res = null;
    res = this.msRepo.save(newCategory);
    return res;
  }

  async findAll(memberId : string) : Promise<MemberSite[]> {
    const sites = await this.msRepo.find({
      select: {
        MemberSiteId : true,
        Img : true,
        Name: true,
        URL : true
      },
      where: {
        MemberId : memberId
      },
      order: {
        CreateDate : 'DESC'
      },
    });

    // let data = await this.cRepo.find()
    return sites;
  }

  findOne(id: number) {
    return `This action returns a #${id} memberSite`;
  }

  // 이름만 바꾸자....
  async update(updateMemberSiteDto: UpdateMemberSiteDto) : Promise<UpdateResult> {
    if (!updateMemberSiteDto.MemberSiteId){
      throw new HttpException(
        {
          errCode: 21,
          error: "Missing required value",
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (updateMemberSiteDto.Name && updateMemberSiteDto.Name.length > 250){
      throw new HttpException(
        {
          errCode: 22,
          error: "too long name",
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const res = this.msRepo.update(
      {MemberSiteId : updateMemberSiteDto.MemberSiteId},
      {Name : updateMemberSiteDto.Name}
    )
    return res;
  }

  async updateMemberCategorySite(updateMemberSiteDto: UpdateMemberSiteDto){

    if (!updateMemberSiteDto.MemberSiteId){
      throw new HttpException(
        {
          errCode: 21,
          error: "Missing required value",
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!updateMemberSiteDto.Categories){
      throw new HttpException(
        {
          errCode: 21,
          error: "Missing required value",
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    let res = false;

    // 트랜잭션으로 묶기
    const queryRunner = this.dataSource.createQueryRunner();

    // // lets now open a new transaction:
    await queryRunner.startTransaction();
    try {
      //  카테고리 사이트 연결 리스트 삭제 후 다시 만들기
      await queryRunner.manager.delete(MemberCategorySite, {
        MemberSiteId : updateMemberSiteDto.MemberSiteId
      });

      let tempMemCategorySites = [];
      for(const one of updateMemberSiteDto.Categories){
        tempMemCategorySites.push({
          MemberCategoryId : one.MemberCategoryId,
          MemberSiteId : updateMemberSiteDto.MemberSiteId
        })
      }
      
      queryRunner.manager.insert(MemberCategorySite, this.mcsRepo.create(tempMemCategorySites));

      // commit transaction now:
      await queryRunner.commitTransaction();
      res = true;
    } catch (err) {
      // since we have errors let's rollback changes we made
      await queryRunner.rollbackTransaction();
      throw new HttpException(
        {
          errCode: 22,
          error: 'An error occured during change',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      // you need to release query runner which is manually created:
      await queryRunner.release();
    }
    return res;

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
