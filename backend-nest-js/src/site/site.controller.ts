import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Res, Ip, Req, Query } from '@nestjs/common';
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

  //  단순히 db에 등록하는과정에 가까움
  // 결국 다시 누군가 수작업으로 확인 필요
  @Post()
  create(@Body() createSiteDto: Site, @Ip() reqIp: string) {
    console.log(reqIp);   
        
    // 권한 체크
    // 관리자면 통과, 로그인 했으면 통과

    let res = this.siteService.create(createSiteDto);
    console.log(res);
    
    return res;
  }

  @Post("/test")
  createTest(@Body() createSiteDto: Site, @Ip() reqIp: string) {
    console.log(reqIp);   
        
    // 권한 체크
    // 관리자면 통과, 로그인 했으면 통과

    let res = this.siteService.createTest(createSiteDto);
    
    return res;
  }

  @Post("/category-site")
  createCategorySite(@Body() site: Site, @Ip() reqIp: string) {
    console.log(reqIp);   
        
    // 권한 체크
    // 관리자면 통과, 로그인 했으면 통과
    let categoryIds = [];
    for (const categoryId of site.Categories){
      categoryIds.push(categoryId);
    }

    let res = this.siteService.createCategorySite(site.SiteId, categoryIds);
    
    return res;
  }

  // body가 필요해서 post로
  @Post("/url")
  findOneByUrl(@Body() site: Site) {
    console.log(site);
    return this.siteService.findOneByUrl(site.URL);
  }

  // 실제 다 부르는건 말이 안되니까..... 페이징 느낌처럼 개수를 나누는 처리 필요
  // 숫자 1당 20개씩하고 없으면 리턴 없고...
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

  // 숫자 1당 20개씩하고 없으면 리턴 없고...
  @Get("/category")
  findSitesByCategory(@Query("id") categoryId : string, @Query("page") page: number){
    console.log(`categoryId : ${categoryId}`);
    let result = this.siteService.findOnlyByCategory(categoryId, page);
    return result;
  }

  

  @Get(':id')
  findOne(@Param('id') siteId: string) {
    return this.siteService.findOne(siteId);
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

  // @Delete(':id')
  remove(@Param('id') id: string) {
    return this.siteService.remove(id);
  }
}
