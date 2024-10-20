import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Res,
  Ip,
  Req,
  Query,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { SiteService } from './site.service';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
import { Site } from './entities/site.entity';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ApiResult, ApiResultExpand } from 'src/publicComponents/apiResult';
import { Response, Request } from 'express';
import { CategoryService } from 'src/category/category.service';
import { ServerCache } from 'src/publicComponents/memoryCache';
import { LoggingInterceptor } from 'src/middleware/logging.interceptor';
import { AdminAuthGuard, CustomAuthGuard } from 'src/middleware/auth.guard';

@ApiTags('site')
@Controller('site')
export class SiteController {
  constructor(
    private readonly siteService: SiteService,
    private readonly categoryService: CategoryService,
  ) {}

  stancdard(@Body() createSiteDto: Site) {
    // 서비스 호출 등의 기능만 수행
    const res = this.siteService.standard(createSiteDto);
    // 리턴 형태 만들기 json으로
    return res;
  }

  //  단순히 db에 등록하는과정에 가까움
  // 결국 다시 누군가 수작업으로 확인 필요
  @UseGuards(CustomAuthGuard)
  @Post()
  create(@Body() createSiteDto: Site, @Ip() reqIp: string) {
    // 권한 체크
    // 관리자면 통과, 로그인 했으면 통과

    const res = this.siteService.create(createSiteDto);
    console.log(res);
    return res;
  }

  @Post('/daemon')
  // @UseGuards(AdminAuthGuard)
  createDaemon(@Body() createSiteDto: Site) {
    const res = this.siteService.createDaemon(createSiteDto);
    console.log(res);
    return res;
  }

  @Post('/test')
  createTest(@Body() createSiteDto: Site, @Ip() reqIp: string) {
    console.log(reqIp);

    // 권한 체크
    // 관리자면 통과, 로그인 했으면 통과

    const res = this.siteService.createTest(createSiteDto);

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
    const q = await this.siteService.findAllPublic();
    let res: ApiResultExpand<Site[]>;
    if (q.length > 0) {
      res.ResCode = 200;
      res.Body = q;
    }
    return q;
  }

  // 나중에 로그인했으면 로그인 정보 받아서 로직에 관여
  @Get('/recommend')
  findRecommended(@Ip() reqIp: string) {
    const result = this.siteService.findRecommedSites();
    return result;
  }

  // 숫자 1당 20개씩하고 없으면 리턴 없고...
  @Get('/category')
  findSitesByCategory(
    @Query('id') categoryId: string,
    @Query('page') page: number,
    @Query('sort') sort: string,
    @Query('sortdir') sortdir: number,
  ) {
    const isDesc: boolean = sortdir == 0 ? false : true;
    const result = this.siteService.findByCategoryPublic(
      categoryId,
      page,
      sort,
      isDesc,
    );
    return result;
  }

  @Get('/search')
  findSitesByWord(@Query('key') word: string) {
    // 서비스 호출 등의 기능만 수행
    console.log(word);
    word = decodeURIComponent(word);
    const res = this.siteService.findAllBySearchPublic(word);
    // 리턴 형태 만들기 json으로
    return res;
  }

  // url base64인코딩해서 보내기
  @Get('/url/:base64url')
  findOneByUrl(@Param('base64url') url: string) {
    console.log(url);
    url = atob(url);
    return this.siteService.findOneByUrlPublic(url);
  }

  @Get('/admin/all')
  @UseGuards(AdminAuthGuard)
  findAllAdmin() {
    return this.siteService.findAllAdmin();
  }

  @Get('/admin')
  @UseGuards(AdminAuthGuard)
  findOneByAdmin(@Query('id') siteId: string) {
    console.log(siteId);
    return this.siteService.findOneByAdmin(siteId);
  }

  @Get('/daemon')
  // @UseGuards(AdminAuthGuard)
  findAllDaemon(
    @Query('page') page: number,
    @Query('order') order: string,
    @Query('sort') orderDesc: boolean,
  ) {
    return this.siteService.findAllAdmin(page, null, false);
  }

  @Get(':id')
  findOne(@Param('id') siteId: string) {
    return this.siteService.findOnePublic(siteId);
  }

  // 없으면 만들고 기존거 삭제하면서 새로운거만 받을 예정이라 put으로
  @Put('/category-site')
  async createCategorySite(@Body() site: Site, @Ip() reqIp: string) {
    // 권한 체크
    // 관리자면 통과, 로그인 했으면 통과
    const categoryIds = [];

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
  @Put('/admin')
  @UseGuards(AdminAuthGuard)
  async updateSite(@Body() site: Site, @Ip() reqIp: string) {
    let result = {};
    const updateRes =
      await this.siteService.updateSiteAndCategorySiteAdmin(site);
    if (updateRes) {
      result = {
        SiteId: site.SiteId,
      };
    }
    return result;
  }

  @Patch('/views')
  async updateViews(@Req() req: Request, @Body() updateSiteDto: Site) {
    // 조회수 필터링 조건
    if (
      await ServerCache.checkRestrictedViews(
        req.headers['user-agent'],
        req.ip,
        updateSiteDto.SiteId,
      )
    ) {
      return;
    }
    // 멤버별로 조회수 기록 로그형태

    const res = await this.siteService.updateViews(updateSiteDto.SiteId);
    if (res.affected > 0) {
      return {
        SiteId: updateSiteDto.SiteId,
      };
    }
    return {};
  }

  // 좋아요 => 기존에 없으면 좋아요 추가 있으면 좋아요 삭제
  @Patch('/good')
  @UseGuards(CustomAuthGuard)
  async updateGood(@Req() req: Request, @Body() updateSiteDto: Site) {
    const res = await this.siteService.updateViews(updateSiteDto.SiteId);
    if (res.affected > 0) {
      return {
        SiteId: updateSiteDto.SiteId,
      };
    }
    return {};
  }

  // 싫어요 => 기존에 없으면 좋아요 추가 있으면 좋아요 삭제
  @Patch('/bad')
  @UseGuards(CustomAuthGuard)
  async updateBad(@Req() req: Request, @Body() updateSiteDto: Site) {
    const res = await this.siteService.updateViews(updateSiteDto.SiteId);
    if (res.affected > 0) {
      return {
        SiteId: updateSiteDto.SiteId,
      };
    }
    return {};
  }

  // put은 자원에 대한 정보 전체를 전달해줘야하고, 없으면 생성하는 의미를 갖고있음
  // 고로 일부만 수정하는 patch가 좀 더 맞는듯 함
  @Patch('/admin')
  @UseGuards(AdminAuthGuard)
  async update(@Body() updateSiteDto: Site) {
    const res = await this.siteService.updateByAdmin(updateSiteDto);
    if (res.affected > 0) {
      return {
        SiteId: updateSiteDto.SiteId,
      };
    }
    return {};
  }

  @Patch('/daemon')
  // @UseGuards(AdminAuthGuard)
  async updateDaemon(@Body() updateSiteDto: Site) {
    console.log(updateSiteDto);
    const res = await this.siteService.updateDaemon(updateSiteDto);
    if (res.affected > 0) {
      return {
        SiteId: updateSiteDto.SiteId,
      };
    }
    return {};
  }

  @Delete('/admin/:id')
  @UseGuards(AdminAuthGuard)
  remove(@Param('id') id: string) {
    return this.siteService.removeAdmin(id);
  }
}
