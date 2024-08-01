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

@Injectable()
export class CategoryService {

  constructor(@InjectRepository(Category) private cRepo : Repository<Category>,
  private readonly customUtils : CustomUtils){

  }

  async create(category: Category) : Promise<Category> {
    // uuid 생성
    const newId = uuidV4().replaceAll("-", "");
    category.CategoryId = newId;
    const newCategory = this.cRepo.create(category);
    
    console.log('This action adds a new category');
    try{
      let res = await this.cRepo.save(newCategory);
      return res;
    } catch (err) {
      console.log(err);
      MysqlException.throwHttpException(err.code, 21);      
    }
    
    
    // return await this.cRepo.save(newCategory);
    
  }

  async findAll() : Promise<Category[]> {
    
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

  async findAllPublic() : Promise<Category[]> {
    let result  = ServerCache.getCategorys();
    console.log(`result ${result}`);
    
    if (!result || result.length === 0){
      console.log("읎다");
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
      console.log(`result22 ${result}`);
    }

    // let data = await this.cRepo.find()
    return result;
  }

  findOne(id: string) : Promise<Category> {
    console.log(`This action returns a #${id} category`);
    return this.cRepo.findOne({
      where : {
        CategoryId :  id,
        IsDeleted : 0
      }
    })    
  }

  async update(id: string, updateCategoryDto: Category) {
    console.log(`This action updates a #${id} category`);
    // 반환값이 뭐지...??
    // console.log(await this.cRepo.update(id, updateCategoryDto))
    
    return await this.cRepo.update(id, {...updateCategoryDto, UpdatedDate : this.customUtils.getUTCDate()});
  }

  async remove(id: string) {
    console.log(`This action removes a #${id} category`);
    await this.cRepo.update(id, {
      IsDeleted : 1
    })
  }
}
