import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MemberCategoryService } from './member-category.service';
import { CreateMemberCategoryDto } from './dto/create-member-category.dto';
import { UpdateMemberCategoryDto } from './dto/update-member-category.dto';

@Controller('member-category')
export class MemberCategoryController {
  constructor(private readonly memberCategoryService: MemberCategoryService) {}

  @Post()
  create(@Body() createMemberCategoryDto: CreateMemberCategoryDto) {
    return this.memberCategoryService.create(createMemberCategoryDto);
  }

  @Get()
  findAllByMember(@Query('memberId') memberId: string) {
    return this.memberCategoryService.findAll(memberId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.memberCategoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Body() updateMemberCategoryDto: UpdateMemberCategoryDto) {
    return this.memberCategoryService.update(updateMemberCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.memberCategoryService.remove(+id);
  }
}
