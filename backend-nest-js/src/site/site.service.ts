import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Site } from './entities/site.entity';
import {
  DataSource,
  FindOptionsOrder,
  Like,
  Repository,
  UpdateResult,
} from 'typeorm';
import { URL } from 'url';
import { CustomUtils } from 'src/publicComponents/utils';
import { ServerCache } from 'src/publicComponents/memoryCache';
import { CategorySite } from './entities/categorySite.entity';
import { Category } from 'src/category/entities/category.entity';
import { Constraint } from 'src/publicComponents/constraint';
import { ApiClient } from 'src/publicComponents/apiClient';

@Injectable()
export class SiteService {
  constructor(
    @InjectRepository(Site) private sRepo: Repository<Site>,
    @InjectRepository(CategorySite) private csRepo: Repository<CategorySite>,
    @InjectRepository(Category) private cRepo: Repository<Category>,
    private readonly customUtils: CustomUtils,
    private readonly constraint: Constraint,
    private readonly apiClient: ApiClient,
    private dataSource: DataSource,
  ) {
    console.log('new SiteService()');
  }

  // 한번에 50개 정도
  readonly WEBPAGECNT = 50;

  async standard(site: Site): Promise<Site> {
    // 도메인 로직 호출만 진행
    const res = await this.sRepo.save(site);
    // 만약 여기서 여러 도메인이 변경이 필요하면 의존성 주입으로 하위계층에 얽메이지 않게 인터페이스로 구성이 가능할까...???
    // 제네릭타입을 쓰면 가능할거 같음
    // dto를 최소한의로 활용... 정말 상황마다 다 만들 순 없고... 최소한의 제약 조건으로 활용하자
    // 컨트롤러와 상관 없이 리턴값 생성

    // test("Sdsdsds", () => {
    //   expect(cEncrypt.encryptAes256("sssss")).toEqual("xxxxx");
    // });

    return res;
  }

  async create(site: Site): Promise<Site> {
    console.log('This action adds a new site');
    if (!site.URL) {
      throw new HttpException(
        {
          errCode: 23,
          error: 'url value is required',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    let urlObj: URL;
    try {
      urlObj = this.constraint.getUrlObj(site.URL);
    } catch {
      throw new HttpException(
        {
          errCode: 24,
          error: 'invalid URL',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const tartgetUrl = this.constraint.correctionUrl(urlObj);

    // 기존에 있는지 확인
    const previous = await this.findOneByUrlAdmin(tartgetUrl, false);
    if (previous) {
      throw new HttpException(
        {
          errCode: 22,
          error: 'the url is already exist',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    // url 유효한지 확인
    // 이외의 사이트 문제는 그냥 따로 프로그램 돌려서 정보 수집하자
    const siteModel = await this.apiClient.setSiteParse(tartgetUrl);
    if (!siteModel) {
      // 설계상 여기에 오기전에 에러가 발생함... 그래도 일단 만들어 놓음
      throw new HttpException(
        {
          errCode: 21,
          error: 'server Error, can not make site model',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.constraint.generateSite(siteModel, urlObj);
    // console.log(siteModel);
    //https 로 실패할 경우 http로 시도할 것인가 말것인가...........

    // 데이터 삽입
    const newSite = this.sRepo.create(siteModel);
    console.log(newSite);
    return await this.sRepo.save(newSite);
    // return null;
  }

  async createDaemon(site: Site): Promise<Site> {
    if (!site.URL) {
      throw new HttpException(
        {
          errCode: 23,
          error: 'url value is required',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    let urlObj: URL;
    try {
      urlObj = this.constraint.getUrlObj(site.URL);
    } catch {
      throw new HttpException(
        {
          errCode: 25,
          error: 'invalid URL',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const tartgetUrl = this.constraint.correctionUrl(urlObj);

    // 너무 잡다한게 많다 좀 거르자 => 여기서 하면 매번 바꿔야 하니까.. 데몬에게 좀 위임하자...
    // if ((tartgetUrl.split(".").length >=3 && !tartgetUrl.includes("//www.")) || tartgetUrl.includes("login") || tartgetUrl.includes("signup") || tartgetUrl.includes("test")){
    //   throw new HttpException({
    //     errCode : 24,
    //     error : "this url can not be created"
    //   }, HttpStatus.BAD_REQUEST);
    // }

    // 기존에 있는지 확인
    const previous = await this.findOneByUrlAdmin(tartgetUrl, false);
    if (previous) {
      throw new HttpException(
        {
          errCode: 22,
          error: 'the url is already exist',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    // 존재하는 사이트인지만 확인
    try {
      await this.apiClient.getSiteResponse(tartgetUrl);
    } catch (err) {
      // 404만 걸러내자
      if (
        err.code === 'ENOTFOUND' ||
        (err.response &&
          err.response.status &&
          err.response.status === HttpStatus.NOT_FOUND)
      ) {
        throw new HttpException(
          {
            errCode: 21,
            error: 'url is wrong, can not find the site',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    const siteModel: Site = new Site();
    // 데몬 등록 상태 구분
    siteModel.Status = 8;
    await this.constraint.generateSite(siteModel, urlObj);
    // console.log(siteModel);
    //https 로 실패할 경우 http로 시도할 것인가 말것인가...........

    // 데이터 삽입
    const newSite = this.sRepo.create(siteModel);
    return await this.sRepo.save(newSite);
  }

  async createCategorySite(
    siteId: string,
    categories: string[],
  ): Promise<number> {
    'insert into TA_ReCategorySite values (categories, siteId, ...)';
    const queryRun = this.csRepo.queryRunner;
    queryRun.startTransaction();

    let cnt = 0;
    try {
      // 기존 등록된거 삭제하고 새로 등록

      await queryRun.manager.delete(CategorySite, {
        SiteId: siteId,
      });

      // 부모 카테고리까지 자동 등록 기능 필요..........
      for (const categoryId of categories) {
        const one = new CategorySite();
        one.CategoryId = categoryId;
        one.SiteId = siteId;
        // 유니크라서 중복 떠도 걍 진행이 되니까 냅두자
        await queryRun.manager.save(one);
        cnt += 1;
      }

      await queryRun.commitTransaction();
    } catch (err) {
      // since we have errors let's rollback changes we made
      await queryRun.rollbackTransaction();
      throw new HttpException(
        {
          errCode: 22,
          error: 'An error occured during change',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      // you need to release query runner which is manually created:
      await queryRun.release();
    }

    return cnt;
  }

  async createTest(site: Site) {}

  async findAllAdmin(
    page?: number,
    orderBy?: string,
    orderDesc?: boolean,
  ): Promise<Site[]> {
    // 정렬 옵션
    let orderOption: FindOptionsOrder<Site> = {};
    orderDesc = orderDesc == null ? true : orderDesc;
    switch (orderBy) {
      case 'views':
        orderOption = {
          Views: orderDesc ? 'DESC' : 'ASC',
        };
        break;
      case 'good':
        orderOption = {
          Good: orderDesc ? 'DESC' : 'ASC',
        };
        break;
      case 'createDate':
        orderOption = {
          CreatedDate: orderDesc ? 'DESC' : 'ASC',
        };
        break;
      default:
        orderOption = {
          UpdatedDate: orderDesc ? 'DESC' : 'ASC',
        };
    }

    if (!page || page <= 0) {
      page = 1;
    }

    return await this.sRepo.find({
      where: {
        IsDeleted: 0,
      },
      relations: {
        Categories: true,
      },
      order: orderOption,
      // skip : this.WEBPAGECNT * (page - 1),
      // take : this.WEBPAGECNT *  page,
    });
  }

  private readonly PublicSelectOption = {
    SiteId: true,
    URL: true,
    Name: true,
    NameKR: true,
    Img: true,
    SiteDescription: true,
    Views: true,
    Good: true,
    Bad: true,
    CreatedDate: true,
  };

  async findAllPublic(page?: number): Promise<Site[]> {
    console.log('This action returns all site');
    if (!page) {
      page = 1;
    }
    return await this.sRepo.find({
      select: this.PublicSelectOption,
      where: {
        IsDeleted: 0,
        Status: 2,
      },
      order: {
        CreatedDate: 'DESC',
      },
      // skip : this.WEBPAGECNT * (page - 1),
      // take : this.WEBPAGECNT *  page,
    });
  }

  findAllBySearchPublic(word: string) {
    const data = this.sRepo.findAndCount({
      select: this.PublicSelectOption,
      where: [
        { IsDeleted: 0, Status: 2, URL: Like(`%${word}%`) },
        { IsDeleted: 0, Status: 2, Name: Like(`%${word}%`) },
        { IsDeleted: 0, Status: 2, NameKR: Like(`%${word}%`) },
        { IsDeleted: 0, Status: 2, SiteDescription: Like(`%${word}%`) },
        { IsDeleted: 0, Status: 2, Description: Like(`%${word}%`) },
        { IsDeleted: 0, Status: 2, Keywords: Like(`%${word}%`) },
        { IsDeleted: 0, Status: 2, OGDescription: Like(`%${word}%`) },
        {
          IsDeleted: 0,
          Status: 2,
          Categories: {
            IsDeleted: 0,
            Status: 2,
            Name: Like(`%${word}%`),
          },
        },
        {
          IsDeleted: 0,
          Status: 2,
          Categories: {
            IsDeleted: 0,
            Status: 2,
            NameKR: Like(`%${word}%`),
          },
        },
      ],
      order: {
        UpdatedDate: 'DESC',
      },
      // take : 1
    });
    return data;
  }

  async findByCategoryPublic(
    categoryId: string,
    page?: number,
    orderBy?: string,
    orderDesc?: boolean,
  ): Promise<[Site[], number]> {
    console.log(`This action returns site in ${categoryId} category`);
    console.log(`categoryId : ${categoryId}, page : ${page}`);
    page = page ? page : 1;
    if (!categoryId || categoryId.length !== 32 || page < 0) {
      throw new HttpException(
        {
          errCode: 21,
          error: 'query error, please check the value',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    `SELECT *
    FROM ta_site AS S
    JOIN TA_ReCategorySite AS R
    ON S.SiteId = R.SiteId WHERE R.CategoryId = ""`;

    // 정렬 옵션
    let orderOption: FindOptionsOrder<Site> = {};
    orderDesc = orderDesc ? orderDesc : true;
    switch (orderBy) {
      case 'views':
        orderOption = {
          Views: orderDesc ? 'DESC' : 'ASC',
        };
        break;
      case 'good':
        orderOption = {
          Good: orderDesc ? 'DESC' : 'ASC',
        };
        break;
      case 'createDate':
        orderOption = {
          CreatedDate: orderDesc ? 'DESC' : 'ASC',
        };
        break;
      default: //여기가 추천케이스 알고리즘 구현 필요
        orderOption = {
          UpdatedDate: orderDesc ? 'DESC' : 'ASC',
        };
    }

    //  여기에서 카테고리 조인 뺴고, inner 조인으로 만들기 => queryBuilder 사용
    // 근데 쿼리보면 left join인데 왜 값은 inner join 처럼 나오지,,,,,,,?????
    const temp = await this.sRepo.findAndCount({
      select: {
        Categories: {
          CategoryId: true,
        },
      },
      relations: {
        Categories: true,
      },
      where: {
        IsDeleted: 0,
        Status: 2,
        Categories: {
          CategoryId: categoryId,
        },
      },
      order: orderOption,
      // skip : this.WEBPAGECNT * (page - 1),
      // take : this.WEBPAGECNT *  page,
    });

    // 쿼리빌더 예시
    // await this.sRepo.createQueryBuilder("s")
    // .leftJoinAndSelect('s.Categories', 'c')
    // .where('s.IsDeleted = 0 and s.Status = 2 and c.CategoryId = :id', {id : categoryId})
    // .getMany();

    return temp;
  }

  async findRecommedSites(): Promise<Site[]> {
    console.log('This action findRecommedSites site');

    // 로그인하면 마지막 조회한 카테고리 여기에 추가해서 넣자

    // const res = this.getRecommendSite();
    let result = await ServerCache.getRecommendSites();
    if (!result || result.length == 0) {
      const reLoadSites: Site[] = await this.sRepo.query(
        `(select * from TA_Site where isDeleted = 0 and status = 2 order by Views DESC LIMIT 25)
        UNION
        (select * from TA_Site where isDeleted = 0 and status = 2 order by Good DESC LIMIT 25)
        UNION
        (select * from TA_Site where isDeleted = 0 and status = 2 order by Bad ASC LIMIT 25)
        UNION
        (select * from TA_Site where isDeleted = 0 and status = 2 order by createdDate DESC LIMIT 25)
        UNION
        (select * from TA_Site where isDeleted = 0 and status = 2 order by UpdatedDate DESC LIMIT 25)`,
      );
      await ServerCache.setRecommendSites(reLoadSites);
      result = await ServerCache.getRecommendSites();
    }
    return result;
  }

  findOnePublic(id: string): Promise<Site> {
    console.log(`This action returns a #${id} category`);
    return this.sRepo.findOne({
      select: {
        SiteId: true,
        URL: true,
        Name: true,
        NameKR: true,
        Img: true,
        SiteDescription: true,
        Views: true,
        Good: true,
        Bad: true,
      },
      where: {
        IsDeleted: 0,
        Status: 2,
        SiteId: id,
      },
    });
  }

  findOneByAdmin(id: string): Promise<Site> {
    // return null;
    return this.sRepo.findOne({
      where: {
        IsDeleted: 0,
        SiteId: id,
      },
      relations: {
        Categories: true,
      },
    });
  }

  // 외부용
  async findOneByUrlPublic(url: string): Promise<Site> {
    try {
      url = this.constraint.correctionUrl(this.constraint.getUrlObj(url));
    } catch {
      throw new HttpException(
        {
          errCode: 21,
          error: 'invalid URL',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    console.log(`This action returns a by #${url} site`);
    const res: Site = await this.sRepo.findOne({
      select: {
        SiteId: true,
        URL: true,
        Name: true,
        NameKR: true,
        Img: true,
        Views: true,
        Good: true,
        Bad: true,
        Categories: true,
      },
      where: {
        URL: url,
        Status: 2,
        IsDeleted: 1,
      },
    });
    return res;
  }

  async findOneByUrlAdmin(url: string, isDeleted?: boolean): Promise<Site> {
    try {
      url = this.constraint.correctionUrl(this.constraint.getUrlObj(url));
    } catch {
      throw new HttpException(
        {
          errCode: 21,
          error: 'invalid URL',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    console.log(`This action returns a by #${url} site`);
    const res: Site = await this.sRepo.findOne({
      where: {
        URL: url,
        IsDeleted: isDeleted ? 1 : 0,
      },
    });
    return res;
  }

  // 전체를 변경하는거라 사용할일은.....
  async updateAll(id: string, updateCategoryDto: Site): Promise<UpdateResult> {
    // console.log(await this.cRepo.update(id, updateCategoryDto));
    // 반환값이 뭐지...?? => UpdateResult { generatedMaps: [], raw: [], affected: 1 }
    updateCategoryDto.UpdatedDate = this.customUtils.getUTCDate();
    return await this.sRepo.update(id, updateCategoryDto);
  }

  async updateViews(id: string): Promise<UpdateResult> {
    return await this.sRepo
      .update(id, {
        Views: () => 'Views + 1',
      })
      .catch((res) => {
        throw new HttpException(
          {
            errCode: 21,
            error: res,
          },
          HttpStatus.BAD_REQUEST,
        );
      });
    // await this.commentRepository.update(comment.id, {
    //   likeCount: () => 'like_count + 1',
    // });
  }

  async updateByAdmin(updateSite: Site): Promise<UpdateResult> {
    console.log(`This action updates a #${updateSite.SiteId}`);
    console.log(updateSite);
    if (updateSite.Status && updateSite.Status > 4) {
      throw new HttpException(
        {
          errCode: 21,
          error: 'Status value is between 1 ~ 4',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.sRepo.update(
      {
        SiteId: updateSite.SiteId,
      },
      {
        Name: updateSite.Name,
        NameKR: updateSite.NameKR,
        IPAddress: updateSite.IPAddress,
        Img: updateSite.Img,
        SiteDescription: updateSite.SiteDescription,
        AppLinkAndroid: updateSite.AppLinkAndroid,
        AppLinkIOS: updateSite.AppLinkIOS,
        MemberId: updateSite.MemberId,
        Status: updateSite.Status,
        Title: updateSite.Title,
        FaviconImg: updateSite.FaviconImg,
        Description: updateSite.Description,
        Keywords: updateSite.Keywords,
        OGTitle: updateSite.OGTitle,
        OGSiteName: updateSite.OGSiteName,
        OGImg: updateSite.OGImg,
        OGDescription: updateSite.OGDescription,
        OGURL: updateSite.OGURL,
        UpdatedDate: this.customUtils.getUTCDate(),
      },
    );
  }

  // 실패도 받자....
  async updateDaemon(updateSite: Site): Promise<UpdateResult> {
    if (!updateSite.SiteId) {
      throw new HttpException(
        {
          errCode: 21,
          error: 'SiteId is required',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    // 상태는 2, 3, 4 가 아닌이상은 6으로 변경

    // let res = null;
    if (updateSite.Status == 5) {
      return await this.sRepo.update(
        {
          SiteId: updateSite.SiteId,
        },
        {
          Status: updateSite.Status,
          UpdatedDate: this.customUtils.getUTCDate(),
        },
      );
    }

    await this.constraint.correctionSite(updateSite);
    return await this.sRepo.update(
      {
        SiteId: updateSite.SiteId,
      },
      {
        Name: updateSite.Name,
        NameKR: updateSite.NameKR,
        IPAddress: updateSite.IPAddress,
        Img: updateSite.Img,
        SiteDescription: updateSite.SiteDescription,
        AppLinkAndroid: updateSite.AppLinkAndroid,
        AppLinkIOS: updateSite.AppLinkIOS,
        MemberId: updateSite.MemberId,
        Status: updateSite.Status,
        Title: updateSite.Title,
        FaviconImg: updateSite.FaviconImg,
        Description: updateSite.Description,
        Keywords: updateSite.Keywords,
        OGTitle: updateSite.OGTitle,
        OGSiteName: updateSite.OGSiteName,
        OGImg: updateSite.OGImg,
        OGDescription: updateSite.OGDescription,
        OGURL: updateSite.OGURL,
        UpdatedDate: this.customUtils.getUTCDate(),
      },
    );
  }

  async updateSiteAndCategorySiteAdmin(updateSite: Site): Promise<boolean> {
    console.log(`This action updates a #${updateSite.SiteId}`);
    console.log(updateSite);

    let res = false;

    if (updateSite.Status && updateSite.Status > 4) {
      throw new HttpException(
        {
          errCode: 21,
          error: 'Status value is between 1 ~ 4',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    // https 로 했을 때 실패하는 경우가 가끔 있어서 http로 자동 재 요청하는 로직을 넣을지 아니면 사람에게 맡길지.....
    if (updateSite.Img) {
      try {
        updateSite.Img = updateSite.Img.trim();
        updateSite.Img = await this.constraint.imageLinkToFileName(
          updateSite.SiteId,
          updateSite.Img,
        );
      } catch (err) {
        console.log(err);
        throw new HttpException(
          {
            errCode: 22,
            error:
              'The image file cannot be confirmed, please, check the img url again',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    // 트랜잭션으로 묶기
    const queryRunner = this.dataSource.createQueryRunner();

    updateSite = queryRunner.manager.create(Site, updateSite);
    console.log(updateSite);

    // establish real database connection using our new query runner
    // await queryRunner.connect();

    // lets now open a new transaction:
    await queryRunner.startTransaction();
    try {
      const linkCategories = new Set<string>();
      if (updateSite.Categories && updateSite.Categories.length > 0) {
        const categoryIds = [];

        for (const category of updateSite.Categories) {
          categoryIds.push(category.CategoryId);
        }
        // 카테고리마다 부모 카테고리 계속해서 찾고 다 연결해서 등록
        const allCtegories = await queryRunner.manager.find(Category);
        while (categoryIds.length > 0) {
          const oneCategoryId = categoryIds.pop();
          linkCategories.add(oneCategoryId);
          for (const category of allCtegories) {
            if (category.CategoryId === oneCategoryId && category.ParentId) {
              categoryIds.push(category.ParentId);
              break;
            }
          }
        }
      }

      // 사이트 업데이트 하고
      await queryRunner.manager.update(
        Site,
        {
          SiteId: updateSite.SiteId,
        },
        {
          Name: updateSite.Name,
          NameKR: updateSite.NameKR,
          IPAddress: updateSite.IPAddress,
          Img: updateSite.Img,
          SiteDescription: updateSite.SiteDescription,
          AppLinkAndroid: updateSite.AppLinkAndroid,
          AppLinkIOS: updateSite.AppLinkIOS,
          Status: updateSite.Status,
          // IsDeleted : updateCategoryDto.IsDeleted
          UpdatedDate: this.customUtils.getUTCDate(),
        },
      );

      //  카테고리 사이트 연결 리스트 삭제 후 다시 만들기
      await queryRunner.manager.delete(CategorySite, {
        SiteId: updateSite.SiteId,
      });

      // 부모 카테고리까지 자동 등록 기능 필요..........
      for (const categoryId of linkCategories) {
        const one = new CategorySite();
        one.CategoryId = categoryId;
        one.SiteId = updateSite.SiteId;
        await queryRunner.manager.save(one);
      }
      // execute some operations on this transaction:
      // await queryRunner.manager.save(user1)
      // await queryRunner.manager.save(user2)
      // await queryRunner.manager.save(photos)

      // commit transaction now:
      await queryRunner.commitTransaction();
      res = true;
    } catch (err) {
      // since we have errors let's rollback changes we made
      await queryRunner.rollbackTransaction();
      throw new HttpException(
        {
          errCode: 22,
          error: 'An error occured during change',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      // you need to release query runner which is manually created:
      await queryRunner.release();
    }
    return res;
  }

  async updateCategorySiteAdmin(
    siteId: string,
    categories: string[],
  ): Promise<number> {
    'insert into TA_ReCategorySite values (categories, siteId, ...)';

    const cnt = 0;
    // 기존 등록된거 삭제하고 새로 등록
    await this.csRepo.delete({
      SiteId: siteId,
    });

    // 부모 카테고리까지 자동 등록 기능 필요..........
    for (const categoryId of categories) {
      const one = new CategorySite();
      one.CategoryId = categoryId;
      one.SiteId = siteId;
      // 유니크라서 중복 떠도 걍 진행이 되니까 냅두자
      try {
        await this.csRepo.save(one);
      } catch {}
    }
    return cnt;
  }

  async removeAdmin(id: string) {
    console.log(`This action removes a #${id} category`);
    await this.sRepo.update(id, {
      IsDeleted: 1,
      UpdatedDate: this.customUtils.getUTCDate(),
    });
  }
}
