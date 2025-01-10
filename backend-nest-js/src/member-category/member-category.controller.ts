import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req, Put } from '@nestjs/common';
import { MemberCategoryService } from './member-category.service';
import { CreateMemberCategoryDto } from './dto/create-member-category.dto';
import { UpdateMemberCategoryDto } from './dto/update-member-category.dto';
import { CustomAuthGuard } from 'src/middleware/auth.guard';

@UseGuards(CustomAuthGuard)
@Controller('member-category')
export class MemberCategoryController {
  constructor(private readonly memberCategoryService: MemberCategoryService) {}

  @Post()
  create(@Req() req: Request, @Body() createMemberCategoryDto: CreateMemberCategoryDto) {
    return this.memberCategoryService.create(JSON.parse(req["user"]).I, createMemberCategoryDto);
  }

  @Get()
  findAllByMember(@Req() req: Request) {
    return this.memberCategoryService.findAll(JSON.parse(req["user"]).I);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.memberCategoryService.findOne(+id);
  }

  @Patch()
  async update(@Body() updateMemberCategoryDto: UpdateMemberCategoryDto) {
    if ((await this.memberCategoryService.update(updateMemberCategoryDto)).affected > 0){
      return updateMemberCategoryDto.MemberCategoryId;
    }
    return null;
  }

  @Put("/site")
  async updateReCategory(@Body() updateMemberCategoryDto: UpdateMemberCategoryDto) {
    if(await this.memberCategoryService.updateMemberCategorySite(updateMemberCategoryDto)){
      return updateMemberCategoryDto.MemberCategoryId;
    }    
    return null;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    if ((await this.memberCategoryService.remove(id)).affected > 0){
      return id;
    }
    return null;
  }
}
