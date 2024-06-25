import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Res, Ip, Req } from '@nestjs/common';
import { SiteService } from './site.service';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
import { Site } from './entities/site.entity';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ApiResult } from 'src/publicComponents/apiResult';
import { Response, Request } from 'express';

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
    // let res;

    //왜 에러를 못잡는거야!!!!...............
    // try{
    //   res = this.siteService.create(createSiteDto);      
    // } catch (err){
    //   throw new HttpException("please check the url", HttpStatus.BAD_REQUEST);
    // }

    let res = this.siteService.create(createSiteDto);
    
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

  // 나중에 로그인했으면 로그인 정보 받아서 로직에 관여
  @Get("/recommend")
  findRecommended(@Ip() reqIp: string) {
    console.log(reqIp);
    return this.siteService.findRecommedSites();
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

  @Patch('/views')
  async updateViews(@Req() req: Request, @Body() updateSiteDto: Site) {
    // 조회수 필터링 조건
    // 같은 헤더 같은 ip 같은 사이트를 특정 시간내에 또 누르면 패스
    console.log(req.headers);
    console.log(req.ip);   
    console.log(req.body);  
    const newStr : string = new Date().getUTCMinutes() + req.headers["user-agent"] + req.ip + updateSiteDto.SiteId;
    console.log(newStr);
    if (SiteService.checkRestrictedViews(newStr)){
       return 
    }

    let res = await this.siteService.updateViews(updateSiteDto.SiteId);
    if (res.affected > 0){
      return "success";
    }
    return 
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
