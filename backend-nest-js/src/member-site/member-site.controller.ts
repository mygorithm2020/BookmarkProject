import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, UseGuards, Put } from '@nestjs/common';
import { MemberSiteService } from './member-site.service';
import { CreateMemberSiteDto } from './dto/create-member-site.dto';
import { UpdateMemberSiteDto } from './dto/update-member-site.dto';
import { CustomAuthGuard } from 'src/middleware/auth.guard';


@Controller('member-site')
@UseGuards(CustomAuthGuard)
export class MemberSiteController {
  constructor(private readonly memberSiteService: MemberSiteService) {}

  @Post()
  create(@Req() req: Request, @Body() createMemberSiteDto: CreateMemberSiteDto) {
    return this.memberSiteService.create(JSON.parse(req["user"]).I, createMemberSiteDto);
  }

  @Get()
  findAllByMember(@Req() req: Request) {
    return this.memberSiteService.findAll(JSON.parse(req["user"]).I);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.memberSiteService.findOne(+id);
  }

  @Patch()
  async update(@Body() updateMemberSiteDto: UpdateMemberSiteDto) {
    if ((await this.memberSiteService.update(updateMemberSiteDto)).affected > 0){
      return updateMemberSiteDto.MemberSiteId;
    }
    return null;
  }

  @Put("/category")
  async updateReCategory(@Body() updateMemberSiteDto: UpdateMemberSiteDto) {
    if (await this.memberSiteService.updateMemberCategorySite(updateMemberSiteDto)){
      return updateMemberSiteDto.MemberSiteId;
    }
    return null;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    if ((await this.memberSiteService.remove(id)).affected > 0){
      return id;
    }
    return null;
  }
}
