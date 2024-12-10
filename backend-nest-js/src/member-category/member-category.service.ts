import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMemberCategoryDto } from './dto/create-member-category.dto';
import { UpdateMemberCategoryDto } from './dto/update-member-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberCategory } from './entities/member-category.entity';
import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CustomUtils } from 'src/publicComponents/utils';
import { Constraint } from 'src/publicComponents/constraint';
import { MemberCategorySite } from 'src/member-site/entities/member-category-member-site';
import { MemberSite } from 'src/member-site/entities/member-site.entity';

@Injectable()
export class MemberCategoryService {
  constructor(
    @InjectRepository(MemberSite) private msRepo: Repository<MemberSite>,
    @InjectRepository(MemberCategory) private mcRepo: Repository<MemberCategory>,
    @InjectRepository(MemberCategorySite) private mcsRepo: Repository<MemberCategorySite>,
    private readonly customUtils: CustomUtils,
    private readonly constraint: Constraint,
    private dataSource: DataSource,
  ) {}
  
  async create(memberId, memCate: CreateMemberCategoryDto) {
    if (!memberId || !memCate.Name){
      throw new HttpException(
        {
          errCode: 21,
          error: "Missing required value",
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (memCate.Name.length > 31){
      throw new HttpException(
        {
          errCode: 22,
          error: "too long category name",
        },
        HttpStatus.BAD_REQUEST,
      );
    }

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

    if(!memberId){
      throw new HttpException(
        {
          errCode: 21,
          error: "Missing required value",
        },
        HttpStatus.BAD_REQUEST,
      );

    }

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
        Sequence : 'ASC',
        CreatedDate : 'ASC'
      },
    });

    // let data = await this.cRepo.find()
    return categories;
  }

  findOne(id: number) {
    return `This action returns a #${id} memberCategory`;
  }

  async update(updateMemberCategoryDto: UpdateMemberCategoryDto) : Promise<UpdateResult> {
    if (!updateMemberCategoryDto.MemberCategoryId){
      throw new HttpException(
        {
          errCode: 21,
          error: "Missing required value",
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (updateMemberCategoryDto.Name && updateMemberCategoryDto.Name.length > 30){
      throw new HttpException(
        {
          errCode: 22,
          error: "too long name",
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const res = this.mcRepo.update(
      {MemberCategoryId : updateMemberCategoryDto.MemberCategoryId},
      {Name : updateMemberCategoryDto.Name}
    )
    return res;
  }

  async updateMemberCategorySite(updateMemberCategoryDto: UpdateMemberCategoryDto) : Promise<boolean>{

    if (!updateMemberCategoryDto.MemberCategoryId){
      throw new HttpException(
        {
          errCode: 21,
          error: "Missing required value",
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!updateMemberCategoryDto.Sites){
      throw new HttpException(
        {
          errCode: 22,
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
        MemberCategoryId : updateMemberCategoryDto.MemberCategoryId
      });

      let tempMemCategorySites = [];
      for(const one of updateMemberCategoryDto.Sites){
        tempMemCategorySites.push({
          MemberCategoryId : updateMemberCategoryDto.MemberCategoryId,
          MemberSiteId : one.MemberSiteId
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
          errCode: 23,
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
    const res = this.mcRepo.delete(
      {
        MemberCategoryId : id
      }
    );

    // 릴레이션도 삭제
    
    return res;
  }
}
