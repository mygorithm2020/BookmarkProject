import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import {v4 as uuidV4} from 'uuid'

@Injectable()
export class CategoryService {

  constructor(@InjectRepository(Category) private cRepo : Repository<Category>){}

  async create(category: Category) : Promise<Category> {
    // uuid 생성
    const newId = uuidV4().replaceAll("-", "");
    console.log(newId);
    category.CategoryId = newId;
    const newCategory = this.cRepo.create(category);
    console.log('This action adds a new category');
    return await this.cRepo.save(newCategory);
    
  }

  async findAll() : Promise<Category[]> {
    return await this.cRepo.find();
  }

  findOne(id: string) : Promise<Category> {
    console.log(`This action returns a #${id} category`);
    return this.cRepo.findOne({
      where : {
        CategoryId :  id
      }
    })
    
  }

  async update(id: string, updateCategoryDto: Category) {
    console.log(`This action updates a #${id} category`);
    // 반환값이 뭐지...??
    console.log(await this.cRepo.update(id, updateCategoryDto))
    // return await this.cRepo.update(id, updateCategoryDto);
  }

  async remove(id: string) {
    console.log(`This action removes a #${id} category`);
    await this.cRepo.update(id, {
      IsDeleted : 1
    })
  }
}
