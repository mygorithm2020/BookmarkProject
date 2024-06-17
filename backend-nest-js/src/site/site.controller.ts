import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Res, HttpStatus } from '@nestjs/common';
import { SiteService } from './site.service';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
import { Site } from './entities/site.entity';
import { ApiBody } from '@nestjs/swagger';

@Controller('site')
export class SiteController {
  constructor(private readonly siteService: SiteService) {}

  
  @Post()
  create(@Body() createSiteDto: Site) {
    let res = this.siteService.create(createSiteDto);
    
    return res;
  }

  @Get()
  findAll() {
    let q = this.siteService.findAll();
    return q;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.siteService.findOne(id);
  }

  // put은 자원에 대한 정보 전체를 전달해줘야하고, 없으면 생성하는 의미를 갖고있음
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSiteDto: Site) {
    return this.siteService.update(id, updateSiteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.siteService.remove(id);
  }
}
