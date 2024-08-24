import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Res, Ip, Req, Query, UseInterceptors } from '@nestjs/common';
import { SiteService } from './site.service';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
import { Site } from './entities/site.entity';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ApiResult } from 'src/publicComponents/apiResult';
import { Response, Request } from 'express';
import { CategoryService } from 'src/category/category.service';
import { ServerCache } from 'src/publicComponents/memoryCache';
import { LoggingInterceptor } from 'src/middleware/logging.interceptor';

@ApiTags("site")
@Controller('site')
export class SiteController {
  constructor(private readonly siteService: SiteService,
    private readonly categoryService: CategoryService
  ) {}

  stancdard(@Body() createSiteDto: Site){
    // 서비스 호출 등의 기능만 수행
    let res = this.siteService.standard(createSiteDto);
    // 리턴 형태 만들기 json으로
    return res;
  }

  //  단순히 db에 등록하는과정에 가까움
  // 결국 다시 누군가 수작업으로 확인 필요
  @Post()
  create(@Body() createSiteDto: Site, @Ip() reqIp: string) {
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

  

  // body가 필요해서 post로
  // @Post("/url")
  // findOneByUrl(@Body() site: Site) {
  //   console.log(site);
  //   return this.siteService.findOneByUrl(site.URL);
  // }

  // 실제 다 부르는건 말이 안되니까..... 페이징 느낌처럼 개수를 나누는 처리 필요
  // 숫자 1당 20개씩하고 없으면 리턴 없고...
  @Get()
  async findAllPublic() {
    let q = await this.siteService.findAllPublic();
    let res = new ApiResult<Site[]>();
    if (q.length > 0){
      res.Code = 200;
      res.Body = q;
    }
    return q;
  }

  // 나중에 로그인했으면 로그인 정보 받아서 로직에 관여
  @Get("/recommend")
  findRecommended(@Ip() reqIp: string) {
    const result = this.siteService.findRecommedSites();
    return result;
  }

  // 숫자 1당 20개씩하고 없으면 리턴 없고...
  @Get("/category")
  findSitesByCategory(
    @Query("id") categoryId : string, 
    @Query("page") page: number, 
    @Query("sort") sort: string, 
    @Query("sortdir") sortdir: number){
    let isDesc : boolean = sortdir == 0 ? false : true;
    let result = this.siteService.findByCategoryPublic(categoryId, page, sort, isDesc);
    return result;
  }

  // body가 필요해서 post로
  @Get("/url/:base64url")
  findOneByUrl(@Param('base64url') url : string) {
    console.log(url);
    url = atob(url);
    return this.siteService.findOneByUrlPublic(url);
  }

  @Get('/admin/all')
  findAllAdmin() {
    return this.siteService.findAllAdmin();
  }

  @Get('/admin')
  findOneByAdmin(@Query('id') siteId: string) {
    console.log(siteId);
    return this.siteService.findOneByAdmin(siteId);
  }

  @Get(':id')
  findOne(@Param('id') siteId: string) {
    return this.siteService.findOnePublic(siteId);
  }
  
  // 없으면 만들고 기존거 삭제하면서 새로운거만 받을 예정이라 put으로
  @Put("/category-site")
  async createCategorySite(@Body() site: Site, @Ip() reqIp: string) {        
    // 권한 체크
    // 관리자면 통과, 로그인 했으면 통과
    let categoryIds = [];
    
    // for (const category of site.Categories){
    //   categoryIds.push(category.CategoryId);
    // }

    // // 카테고리마다 부모 카테고리 계속해서 찾고 다 연결해서 등록
    // let linkCategories :string[] = [];
    // let allCtegories = await this.categoryService.findAll();    
    // while (categoryIds){
    //   const oneCategoryId = categoryIds.pop();
    //   linkCategories.push(oneCategoryId);
    //   for (const category of allCtegories){
    //     if (category.CategoryId === oneCategoryId && category.ParentId){
    //       categoryIds.push(category.ParentId);
    //       break;
    //     }
    //   }
    // }

    // let res = this.siteService.createCategorySite(site.SiteId, linkCategories);
    
    // return res;
  }

  // 전달받은 정보(칼럼)만 수정
  @Put("/admin")
  async updateSite(@Body() site: Site, @Ip() reqIp: string) {
    let result = {};
    let updateRes = await this.siteService.updateSiteAndCategorySiteAdmin(site);
    if (updateRes){
      result = {
        SiteId : site.SiteId
      }
    }
    return result;
  }

  @Patch('/views')
  async updateViews(@Req() req: Request, @Body() updateSiteDto: Site) {
    // 조회수 필터링 조건
    if (ServerCache.checkRestrictedViews(req.headers["user-agent"], req.ip, updateSiteDto.SiteId)){
       return 
    }
    let res = await this.siteService.updateViews(updateSiteDto.SiteId);
    if (res.affected > 0){
      return {
        SiteId : updateSiteDto.SiteId
      };
    }
    return {};
  }

  // put은 자원에 대한 정보 전체를 전달해줘야하고, 없으면 생성하는 의미를 갖고있음
  // 고로 일부만 수정하는 patch가 좀 더 맞는듯 함
  @Patch('/admin')
  async update(@Body() updateSiteDto: Site) {
    let res = await this.siteService.updateByAdmin(updateSiteDto);
    if (res.affected > 0){
      return {
        SiteId : updateSiteDto.SiteId
      };
    }
    return {};
  }

  @Delete('/admin/:id')
  remove(@Param('id') id: string) {
    return this.siteService.removeAdmin(id);
  }
}
