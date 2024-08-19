import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import {v4 as uuidV4} from 'uuid'
import { MysqlException } from 'src/publicComponents/ExceptionHandler';
import { ServerCache } from 'src/publicComponents/memoryCache';
import { CustomUtils } from 'src/publicComponents/utils';
import { Constraint } from 'src/publicComponents/constraint';

@Injectable()
export class CategoryService {

  constructor(@InjectRepository(Category) private cRepo : Repository<Category>,
  private readonly customUtils : CustomUtils,
  private readonly constraint : Constraint,){

  }

  async create(category: Category) : Promise<Category> {    
    this.constraint.generateCategory(category);
    const newCategory = this.cRepo.create(category);
    
    try{
      let res = await this.cRepo.save(newCategory);
      return res;
    } catch (err) {
      throw new HttpException({
        errCode : 21,
        error : err.errCode
      }, HttpStatus.BAD_REQUEST);   
    }
  }

  async findAllAdmin() : Promise<Category[]> {
    
    let categories = await this.cRepo.find({
      where : {
        IsDeleted : 0,
      },
      order : {
        CreatedDate : "DESC"
      }
    });
    return categories;
  }

  // 자주 요청되며, 바뀌지 않으니 캐시해서 이용
  async findAllPublic() : Promise<Category[]> {
    let result  = ServerCache.getCategorys();
    
    if (!result || result.length === 0){
      
      let newCategorys = await this.cRepo.find({
        select : {
          CategoryId : true,          
          Name : true,
          NameKR : true,
          Layer : true,
          Sequence : true,
        },
        where : {
          IsDeleted : 0,
          Status : 2
        }
      });
      ServerCache.setCategorys(newCategorys);
      result = ServerCache.getCategorys();
    }

    // let data = await this.cRepo.find()
    return result;
  }

  findOnePublic(id: string) : Promise<Category> {
    console.log(`This action returns a #${id} category`);
    return this.cRepo.findOne({
      select : {
        CategoryId : true,          
        Name : true,
        NameKR : true,
        Layer : true,
        Sequence : true,
      },
      where : {
        CategoryId :  id,
        Status : 2,
        IsDeleted : 0
      }
    })    
  }

  findOneAdmin(id: string) : Promise<Category> {
    console.log(`This action returns a #${id} category`);
    return this.cRepo.findOne({
      where : {
        CategoryId :  id,
        IsDeleted : 0
      }
    })    
  }

  async updateAdmin(id: string, updateCategoryDto: Category) {
    console.log(`This action updates a #${id} category`);
    // 반환값이 뭐지...??
    // console.log(await this.cRepo.update(id, updateCategoryDto))
    
    return await this.cRepo.update(id, {...updateCategoryDto, UpdatedDate : this.customUtils.getUTCDate()});
  }

  async remove(id: string) {
    console.log(`This action removes a #${id} category`);
    await this.cRepo.update(id, {
      IsDeleted : 1,
      UpdatedDate : this.customUtils.getUTCDate()
    })
  }
}
