import { Injectable } from '@nestjs/common';
import { CreateMemberCategoryDto } from './dto/create-member-category.dto';
import { UpdateMemberCategoryDto } from './dto/update-member-category.dto';

@Injectable()
export class MemberCategoryService {
  create(createMemberCategoryDto: CreateMemberCategoryDto) {
    return 'This action adds a new memberCategory';
  }

  findAll() {
    return `This action returns all memberCategory`;
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
