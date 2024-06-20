import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Res, HttpStatus, Ip, HttpException } from '@nestjs/common';
import { SiteService } from './site.service';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
import { Site } from './entities/site.entity';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ApiResult } from 'src/publicComponents/apiResult';

@ApiTags("site")
@Controller('site')
export class SiteController {
  constructor(private readonly siteService: SiteService) {}

  
  @Post()
  create(@Body() createSiteDto: Site, @Ip() reqIp: string) {
    console.log(reqIp);   
    
    // 기존에 있는지 확인

    // if (true){
    //   throw new HttpException("mssssessage", HttpStatus.BAD_REQUEST);
    // }
    // 없으면 새로 넣기
    let res;

    //왜 에러를 못잡는거야!!!!...............
    try{
      res = this.siteService.create(createSiteDto);      
    } catch (err){
      throw new HttpException("please check the url", HttpStatus.BAD_REQUEST);
    }
    
    return res;
  }

  @Get()
  async findAll() : Promise<ApiResult<Site[]>> {
    let q = await this.siteService.findAll();
    let res = new ApiResult<Site[]>();
    if (q.length > 0){
      res.Code = 200;
      res.Body = q;
    }
    return res;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.siteService.findOne(id);
  }

  @Get("url/:url")
  findOneByUrl(@Param('url') url: string) {
    console.log(url);
    return this.siteService.findOneByUrl(url);
  }

  // put은 자원에 대한 정보 전체를 전달해줘야하고, 없으면 생성하는 의미를 갖고있음
  // 고로 일부만 수정하는 patch가 좀 더 맞는듯 함
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSiteDto: Site) {
    let res = await this.siteService.update(id, updateSiteDto);
    if (res.affected > 0){
      return "success";
    }
    return 
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.siteService.remove(id);
  }
}
