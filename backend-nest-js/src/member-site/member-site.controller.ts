import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MemberSiteService } from './member-site.service';
import { CreateMemberSiteDto } from './dto/create-member-site.dto';
import { UpdateMemberSiteDto } from './dto/update-member-site.dto';

@Controller('member-site')
export class MemberSiteController {
  constructor(private readonly memberSiteService: MemberSiteService) {}

  @Post()
  create(@Body() createMemberSiteDto: CreateMemberSiteDto) {
    return this.memberSiteService.create(createMemberSiteDto);
  }

  @Get()
  findAll() {
    return this.memberSiteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.memberSiteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMemberSiteDto: UpdateMemberSiteDto) {
    return this.memberSiteService.update(+id, updateMemberSiteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.memberSiteService.remove(+id);
  }
}
