import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Site } from './entities/site.entity';
import { FindOptionsOrder, Repository, UpdateResult } from 'typeorm';
import {v4 as uuidV4} from 'uuid'
import { URL } from 'url';
import { EMPTY, catchError, firstValueFrom, lastValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import axios, { AxiosError, AxiosResponse, HttpStatusCode } from 'axios';
import { JSDOM } from 'jsdom'
import { parse as Parse } from 'node-html-parser';
import { CustomUtils } from 'src/publicComponents/utils';
import { url } from 'inspector';
import { ServerCache } from 'src/publicComponents/memoryCache';
import { CategorySite } from './entities/categorySite.entity';
import * as iconv from "iconv-lite";
import { Category } from 'src/category/entities/category.entity';

@Injectable()
export class SiteService {

  constructor(
    @InjectRepository(Site) private sRepo : Repository<Site>,
    @InjectRepository(CategorySite) private csRepo : Repository<CategorySite>,
    @InjectRepository(Category) private cRepo : Repository<Category>,
    private readonly httpService: HttpService,
    private readonly customUtils : CustomUtils
  ){}

  
  getUrlObj(url : string): URL{

    if (url == null){
      throw "no url";
    }

    // url 체크(프로토콜 없이 입력했다면)
    if (!url.startsWith("http")){
      url = "https://" + url;
    }
    // url 파싱해서 정리
    let res = new URL(url);
    return res;
  }

  correctionUrl(urlObj : URL) : string{

    // protocol을 넣을지 고민헀는데, 브라우저가 아니면 에러남 넣는게 맞음, 근데 내가 브라우저처럼 자동으로 넣어도 되는거 아님?
    // 빼고가자
    // 아니면 따로 칼럼 파서 넣든가..... 후.....
    // https 가 아니어도 받아줄것인가....................ㅇㅇ 받자.. 받는게 맞음.
    let res = urlObj.origin;

    return res;
  }



  readonly WEBPAGECNT = 21;
  

  async create(site: Site) : Promise<Site> {
    console.log('This action adds a new site');
        
    let urlObj = this.getUrlObj(site.URL);    
    console.log(urlObj);

    // origin 값으로 저장
    const targetUrl = urlObj.origin;

    // 기존에 있는지 확인
    let previous = await this.findOneByUrl(this.correctionUrl(urlObj), false);
    if (previous){
      throw new HttpException({
        errCode : 22,
        error : "the url is already exist"
      }, HttpStatus.BAD_REQUEST);
    } 
    
    // url 유효한지 확인
    // 여기가 문제구만.......
    // 이외의 사이트 문제는 그냥 따로 프로그램 돌려서 정보 수집하자
    let siteModel = await this.setSiteParse(this.correctionUrl(urlObj));
    if (!siteModel){
      // 설계상 여기에 오기전에 에러가 발생함... 그래도 일단 만들어 놓음
      throw new HttpException({
        errCode : 21,
        error : "server Error, can not make site model"

      }, HttpStatus.BAD_REQUEST);

    }
    console.log(siteModel);
    await this.generateSite(siteModel, urlObj);      
    console.log(siteModel);
    //https 로 실패할 경우 http로 시도할 것인가 말것인가...........

    // 데이터 삽입
     

    const newSite = this.sRepo.create(siteModel);
    console.log(newSite);
    return await this.sRepo.save(newSite);
    
  }

  async createCategorySite(siteId : string, categories : string[]) : Promise<number>{
    "insert into TA_ReCategorySite values (categories, siteId, ...)";
    let cnt = 0;
    // 기존 등록된거 삭제하고 새로 등록
    await this.csRepo.delete({
      SiteId : siteId
    });    

    // 부모 카테고리까지 자동 등록 기능 필요..........
    for (const categoryId of categories){
      const one = new CategorySite();
      one.CategoryId = categoryId;
      one.SiteId = siteId
      // 유니크라서 중복 떠도 걍 진행이 되니까 냅두자
      try{
        await this.csRepo.save(one);
      } catch {

      }
      
    }
    return cnt;
  }

  async createTest(site: Site) {
    console.log('This action adds a new site');
        
    let urlObj = this.getUrlObj(site.URL);    
    console.log(urlObj);
    
    // url 유효한지 확인
    // 여기가 문제구만.......
    let SiteModel = await this.setSiteParse(urlObj.origin);         
    if (SiteModel){
      this.generateSite(SiteModel, urlObj);      
      console.log(SiteModel);
    }
    //https 로 실패할 경우 http로 시도할 것인가 말것인가...........
    console.log("===========================");

    let ss = await this.setSiteJSDOM(urlObj.origin);
    console.log(ss);

    console.log("===========================");

    let ww = await this.setSiteAxios(urlObj.origin);
    console.log(ww);
    
  }

  async setSiteAxios(reqUrl : string) : Promise<Site> {
    let result : Site;
    const res = await axios.get(reqUrl, {
      timeout : 2000
    });
    console.log(res);

    return result;
  }

  async setSiteJSDOM(reqUrl: string): Promise<Site> {
    let res: Site
    let s = await JSDOM.fromURL(reqUrl); //timeout 설정이 불가능...
    // console.log(s.window.document.textContent);
    console.log(s.window);
    // let sss = s.window.document.querySelectorAll("meta");
    // for (let qdx = 0; qdx < sss.length; qdx++){
    //   console.log(`name : ${sss[qdx].getAttribute("name")}`);
    //   console.log(`property : ${sss[qdx].getAttribute("property")}`);
    //   console.log(`content : ${sss[qdx].getAttribute("content")}`);
    //   console.log("------------------------");
    // }
    
    return res;    
  }

  async setSiteJSDOMByHtml(htmlStr : string): Promise<Site> {
    
    const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
    console.log(dom.window.document.querySelector("p").textContent);


    const { window } = new JSDOM(htmlStr);
    console.log("============");
    return new Site();    
  }

  async setSiteParse(reqUrl): Promise<Site> {
    let res : Site = new Site();;
    console.log("setSite"); 
    // 정확한 url을 입력해도 안될 수가 있음.... 수작업이 필요함..... 
    let response : AxiosResponse;
    try {
      response = await this.getSiteResponse(reqUrl);
      // console.log(response.data.substring(0, 100));      
      console.log("============");  

    } catch (err) {
      //  문제 있는 사이트는 숨기기....
      res.Status = 5;
      
      // 404만 걸러내자
      console.log("getSiteResponseErr : " + err);
      if((err.code === "ENOTFOUND") || (err.response && err.response.status && err.response.status === HttpStatus.NOT_FOUND)) {
        throw new HttpException({
          errCode : 31,
          error : "url is wrong, can not find the site"

        }, HttpStatus.BAD_REQUEST);
      }

      // 타임아웃시 나중에 다시 시도 체크
      if((err.code === "ECONNABORTED")) {
        throw new HttpException({
          errCode : 32,
          error : "URL verification takes too long, please try again later"

        }, HttpStatus.BAD_REQUEST);
      }
    }

    if (response){
      res.Status = 6;
      try{

        // 한글 인코딩 방식 확인 처리, 대부분 utf8이지만 가끔 euckr이 있음
        let contentType = response.headers['content-type']
        console.log(contentType);
        let charset = contentType && contentType.toLowerCase().includes('charset=')
          ? contentType.toLowerCase().split('charset=')[1]
          : 'UTF-8';
        console.log(charset);
        let data = iconv.decode(response.data, charset);
        let root = Parse(data);

        // 헤더에 인코딩 방식이 없고, html파일에만 있는 경우도 있음....
        // <meta http-equiv="Content-Type" content="text/html; charset=euc-kr">
        let metas = root.querySelectorAll("meta");
        for (let idx = 0; idx <metas.length; idx++){
          if (metas[idx].getAttribute("http-equiv") &&
          metas[idx].getAttribute("http-equiv").toLowerCase() === "content-type" &&
          metas[idx].getAttribute("content").toLowerCase().includes("euc-kr")){
            root = Parse(iconv.decode(response.data, "euc-kr"))
            break;
          } else if (metas[idx].getAttribute("charset") && metas[idx].getAttribute("charset").toLowerCase() === "euc-kr"){
            root = Parse(iconv.decode(response.data, "euc-kr"))
            break;
          }
        }
        // 파싱
        // const root = Parse(response.data);
        console.log(root);
        
        const titleEl = root.querySelector("title");
        if (titleEl){
          res.Title = titleEl.textContent;
        }
        
  
        let links = root.querySelectorAll("link");
        for (let idx =0; idx < links.length; idx ++){
          if ( links[idx].getAttribute("rel") === "shortcut icon" || links[idx].getAttribute("rel") === "icon" ){
            res.FaviconImg = links[idx].getAttribute("href");
            break;          
          }        
        }      
        // <link rel="shortcut icon" href="//img.danawa.com/new/danawa_main/v1/img/danawa_favicon.ico">
        let metaEl = root.querySelectorAll("meta")
        for (let idx = 0; idx <metaEl.length; idx++){
          // console.log(metaEl[idx].rawAttrs);
          // // console.log(`name : ${metaEl[idx].getAttribute("name")}`);
          // // console.log(`property : ${metaEl[idx].getAttribute("property")}`);
          // // console.log(`attri : ${JSON.stringify(metaEl[idx].attrs)}`);
          // console.log("------------------------");
          if ( metaEl[idx].getAttribute("name") === "Description"){
            res.Description = metaEl[idx].getAttribute("content");
          } else if ( metaEl[idx].getAttribute("name") === "Keywords"){
            res.Keywords = metaEl[idx].getAttribute("content");
          } else if ( metaEl[idx].getAttribute("property") === "og:title"){
            res.OGTitle = metaEl[idx].getAttribute("content");
          } else if ( metaEl[idx].getAttribute("property") === "og:site_name"){
            res.OGSiteName = metaEl[idx].getAttribute("content");
          } else if ( metaEl[idx].getAttribute("property") === "og:image"){
            res.OGImg = metaEl[idx].getAttribute("content");
          } else if ( metaEl[idx].getAttribute("property") === "og:description"){
            res.OGDescription = metaEl[idx].getAttribute("content");
          } else if ( metaEl[idx].getAttribute("property") === "og:url"){
            res.OGURL = metaEl[idx].getAttribute("content");
          } 
  
        }
        
      } catch (err) {
        res.Status = 5;
        console.log(err);
        // throw "data extract failed";
      }

    }

    return res;
  }

  // 아직 브라우저가 아니라서 그런지 계속 문제가 생기는 오류가 있음... 다른 방법을 써야할지도...
  async getSiteResponse(reqUrl : string) : Promise<AxiosResponse> {
    // html body 파일 가져오기
    const data = await lastValueFrom(
      // this.httpService.get<string>(reqUrl, {
      this.httpService.get(reqUrl, {
        maxRedirects : 2,
        timeout : 2500,
        headers : {
          Accept : "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
          "User-Agent" : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
          
        },
        responseType : 'arraybuffer'
      })
      .pipe(
        map(res => res),
        // catchError((error: AxiosError) => {
        //   console.log(error);
        //   console.log(error.message);
        //   console.log(error.code);

          
        //   throw new HttpException(`html data download failed, ${error.code}, ${error.message}`, HttpStatus.BAD_REQUEST);
        //   throw `html data download failed, ${error.code}, ${error.message} `;
        // }),
      ),
    );

    // let q = await axios.get(fixedURL.origin, {
//     timeout : 3000
    // })
    // .then((response) => response.status)
    // .catch((err) => {
    //     console.log(err);

    // });

    // console.log("axios" + q);

    return data;

  }

  async findAll(page? : number) : Promise<Site[]> {
    console.log("This action returns all site");
    if(!page){
      page = 1;
    }
    return await this.sRepo.find({
      where : {
        IsDeleted : 0
      },     
      relations : {
        Categories : true
      },
      order : {
        CreatedDate : "DESC"
      },
      // skip : this.WEBPAGECNT * (page - 1),
      // take : this.WEBPAGECNT *  page,       
    });
  }

  async findAllPublic(page? : number) : Promise<Site[]> {
    console.log("This action returns all site");
    if(!page){
      page = 1;
    }
    return await this.sRepo.find({
      select : {
        SiteId : true,
        URL : true,
        Name : true,
        NameKR : true,
        SiteDescription : true,
        Views : true,
        Good : true,
        Bad : true,
        CreatedDate : true
      },
      where : {
        IsDeleted : 0,
        Status : 2
      },      
      order : {
        CreatedDate : "DESC"
      },
      // skip : this.WEBPAGECNT * (page - 1),
      // take : this.WEBPAGECNT *  page,       
    });
  }

  async findOnlyByCategory(categoryId : string, page? : number, orderBy? : string, orderDesc? : boolean) : Promise<Site[]> {
    console.log(`This action returns site in ${categoryId} category`);
    console.log(`categoryId : ${categoryId}, page : ${page}`);
    page = page? page : 1;
    if (!categoryId || categoryId.length !== 32 || page < 0){
      throw new HttpException({
        errCode : 21,
        error : "query error, please check the value"

      }, HttpStatus.BAD_REQUEST);
    }

    
    `SELECT *
    FROM ta_site AS S
    JOIN TA_ReCategorySite AS R
    ON S.SiteId = R.SiteId WHERE R.CategoryId = ""`

    // 정렬 옵션
    let orderOption : FindOptionsOrder<Site> = {}
    orderDesc = orderDesc? orderDesc : true;
    switch(orderBy){
      case "views":
        orderOption = {
          Views : orderDesc? "DESC" : "ASC"
        }
        break;
      case "recommend":
        orderOption = {
          Views : orderDesc? "DESC" : "ASC"
        }
        break;
      case "bad":
        orderOption = {
          Views : orderDesc? "DESC" : "ASC"
        }
        break;
      case "createDate":
        orderOption = {
          Views : orderDesc? "DESC" : "ASC"
        }
        break;
      default:
        orderOption = {
          Views : orderDesc? "DESC" : "ASC"
        }
    }

    //  여기에서 카테고리 조인 뺴고, inner 조인으로 만들기 => queryBuilder 사용
    // 근데 쿼리보면 left join인데 왜 값은 inner join 처럼 나오지,,,,,,,?????
    let temp = await this.sRepo.find({
      select : {
        Categories : {
          CategoryId : true
        }
      },
      relations : {
        Categories : true
      },
      where : {
        IsDeleted : 0,
        Status : 2,
        Categories : {
          CategoryId : categoryId
        }
      },
      order : orderOption,
      skip : this.WEBPAGECNT * (page - 1),
      take : this.WEBPAGECNT *  page,
    });


    // 쿼리빌더 예시
    // await this.sRepo.createQueryBuilder("s")
    // .leftJoinAndSelect('s.Categories', 'c')
    // .where('s.IsDeleted = 0 and s.Status = 2 and c.CategoryId = :id', {id : categoryId})
    // .getMany();
    
    return temp;
  }

  

  async findRecommedSites() : Promise<Site[]> {
    console.log("This action findRecommedSites site");

    // 로그인하면 마지막 조회한 카테고리 여기에 추가해서 넣자

    // const res = this.getRecommendSite();
    let result = ServerCache.getRecommendSites();
    if (!result){
      const reLoadSites : Site[] = await this.sRepo.query(
        `(select * from ta_site where isDeleted = 0 and status = 2 order by Views DESC LIMIT 20)
        UNION
        (select * from ta_site where isDeleted = 0 and status = 2 order by Good DESC LIMIT 20)
        UNION
        (select * from ta_site where isDeleted = 0 and status = 2 order by Bad ASC LIMIT 20)
        UNION
        (select * from ta_site where isDeleted = 0 and status = 2 order by createdDate DESC LIMIT 20)
        order by rand()`        
      );
      ServerCache.setRecommendSites(reLoadSites);
      result = ServerCache.getRecommendSites();      
    }
    //  매번 셔플...???? 조금 과한데..
    // CustomUtils.shuffle(result);
    return result;
  }

  findOne(id: string) : Promise<Site> {
    console.log(`This action returns a #${id} category`);
    return this.sRepo.findOne({
      where : {
        IsDeleted : 0,
        SiteId :  id
      }
    })
    
  }

  findOneByAdmin(id: string) : Promise<Site> {
    console.log("findOneByAdmin");
    console.log(id);

    // let temp = await this.sRepo.find({
    //   select : {
    //     Categories : {
    //       CategoryId : true
    //     }
    //   },
    //   relations : {
    //     Categories : true
    //   },
    //   where : {
    //     IsDeleted : 0,
    //     Status : 2,
    //     Categories : {
    //       CategoryId : categoryId
    //     }
    //   },
    //   order : orderOption,
    //   skip : this.WEBPAGECNT * (page - 1),
    //   take : this.WEBPAGECNT *  page,
    // });

    return this.sRepo.findOne({
      where : {
        IsDeleted : 0,
        SiteId :  id
      },
      relations : {
        Categories : true
      }
    });
    
  }

  async findOneByUrl(url: string, isDeleted? : boolean) : Promise<Site> {
    url = this.correctionUrl(this.getUrlObj(url));
    console.log(`This action returns a by #${url} site`);
    let res : Site = await this.sRepo.findOne({
      where : {
        URL : url,
        IsDeleted : isDeleted ?  1 : 0
      },
    })
    return res;    
  }

  async updateByAdmin(updateSite: Site) : Promise<UpdateResult> {
    console.log(`This action updates a #${updateSite.SiteId} category`);    
    console.log(updateSite);
    // console.log(await this.cRepo.update(id, updateCategoryDto));
    // 반환값이 뭐지...?? => UpdateResult { generatedMaps: [], raw: [], affected: 1 }
    // return await this.sRepo.update({
    //   SiteId : updateSite.SiteId,
    // }, {
    //   ...updateSite,
    //   Categories : null
    // });
    if (updateSite.Status && updateSite.Status > 4){
      throw new HttpException({
        errCode : 21,
        error : "Status value is between 1 ~ 4"

      }, HttpStatus.BAD_REQUEST);
    }
    return await this.sRepo.update({
      SiteId : updateSite.SiteId,
    }, {
      Name : updateSite.Name,
      NameKR : updateSite.NameKR,
      IPAddress : updateSite.IPAddress,
      Img : updateSite.Img,
      SiteDescription : updateSite.SiteDescription,
      AppLinkAndroid : updateSite.AppLinkAndroid,
      AppLinkIOS : updateSite.AppLinkIOS,
      Status : updateSite.Status,
      // IsDeleted : updateCategoryDto.IsDeleted
    });
  }

  async update(id: string, updateCategoryDto: Site) : Promise<UpdateResult> {
    console.log(`This action updates a #${id} category`);    
    // console.log(await this.cRepo.update(id, updateCategoryDto));
    // 반환값이 뭐지...?? => UpdateResult { generatedMaps: [], raw: [], affected: 1 }
    return await this.sRepo.update(id, updateCategoryDto);
  }

  async updateViews(id: string) : Promise<UpdateResult> {
    console.log(`This action updateViews a #${id} site`);    
    // console.log(await this.cRepo.update(id, updateCategoryDto));
    // 반환값이 뭐지...?? => UpdateResult { generatedMaps: [], raw: [], affected: 1 }
    return await this.sRepo.update(id, {
      Views : () => "Views + 1",
    })
    .catch( (res)=> {
      throw new HttpException({
        errCode : 21,
        error : res

      }, HttpStatus.BAD_REQUEST);
    });
    // await this.commentRepository.update(comment.id, {
    //   likeCount: () => 'like_count + 1',
    // });
  }

  async remove(id: string) {
    console.log(`This action removes a #${id} category`);
    await this.sRepo.update(id, {
      IsDeleted : 1
    })
  }

  static restrictedViews : {lastUpdate : Date, keyValues : Set<string>};

  // 조회수 조작을 막기 위해 같은 정보로 동일하게 오면 제한, 대신 메모리로 관리하므로 시간마다 값 초기화
  static checkRestrictedViews(str) : boolean {
    let res = false;
    if (!SiteService.restrictedViews){
      SiteService.restrictedViews = {
        lastUpdate : new Date(),
        keyValues : new Set<string>()
      }  
    } else if (SiteService.restrictedViews.lastUpdate.getUTCHours !== new Date().getUTCHours){
      SiteService.restrictedViews.lastUpdate = new Date();
      SiteService.restrictedViews.keyValues.clear();
    }

    

    if (SiteService.restrictedViews.keyValues.has(str)){
      res = true;

      // //Create a Set
      // let diceEntries = new Set<number>();

      // //Add values
      // diceEntries.add(1);
      // diceEntries.add(2);
      // diceEntries.add(3);
      // diceEntries.add(4).add(5).add(6);   //Chaining of add() method is allowed
      
      // //Check value is present or not
      // diceEntries.has(1);                 //true
      // diceEntries.has(10);                //false
      
      // //Size of Set 
      // diceEntries.size;                   //6
      
      // //Delete a value from set
      // diceEntries.delete(6);              // true
      
      // //Clear whole Set
      // diceEntries.clear();                //Clear all entries
    } else{
      SiteService.restrictedViews.keyValues.add(str);
    }

    console.log(SiteService.restrictedViews);

    return res;      
  }

  // 사이트 객체 데이터 보정
  async generateSite(site : Site, urlObj : URL){

    site.SiteId = this.customUtils.get32UuId();

    site.URL = this.correctionUrl(urlObj);
    
    if(!site.Status){
      site.Status = 1;
    }

    if (site.FaviconImg){
      //  이미지 url 링크 보정
      if (site.FaviconImg.startsWith("//")){

      } else if (site.FaviconImg.startsWith("/")){
        site.FaviconImg = urlObj.origin + site.FaviconImg;
      } else {
        // 모르겠네 또 어떤 케이스가...
      }

    } else if (site.Status != 5) {
      // 이거 존재하는지 확인
      try{
        await this.getSiteResponse(urlObj.origin + "/favicon.ico");
        // 파비콘 없으면 기본 url에 /favicon.ico 로 보정
        site.FaviconImg = urlObj.origin + "/favicon.ico";

      } catch (err) {
        console.log(err);        
      }
    }
    
    // 기타 파악되는대로 여기 추가 필요
    // if (site.OGSiteName){
    //   site.Name = site.OGSiteName
    // } else 
    if (site.OGTitle){
      site.Name = site.OGTitle.trim();
    } else if (site.Title){
      site.Name = site.Title.trim();
    }

    //  이미지 url 링크 보정
    if (site.OGImg && !site.OGImg.startsWith("//") && site.OGImg.startsWith("/")){ 
      site.OGImg = urlObj.origin + site.OGImg;
    }

    if (site.OGImg){
      site.Img = site.OGImg;
    } else if (site.FaviconImg){
      site.Img = site.FaviconImg;
    }

    if (site.OGDescription){
      site.SiteDescription = site.OGDescription
    } else if (site.Description){
      site.SiteDescription = site.Description
    }

  }

  private static basicRecommendSites : {lastDate : Date, sites : Site[]};

  async getRecommendSite() : Promise<Site[]>{

    // lock 처리
    // 데이터 캐시처리, no 하루가 지날 때 마다 다시 조회하자
    if (!SiteService.basicRecommendSites ||
      SiteService.basicRecommendSites.lastDate.getUTCDate() !== new Date().getUTCDate()){

      // 기준 조회수, 좋아요, 싫어요, 등록일 순, 취향....
      // 걍 각 카테고리 탑 몇개씩 뽑아올 것인가.....

      // orm으로 짜기 너무 복잡해서 일단 쿼리로 짬
      let queryData = await this.sRepo.query(
        `(select * from ta_site where isDeleted = 0 and status = 2 order by Views DESC LIMIT 20)
        UNION
        (select * from ta_site where isDeleted = 0 and status = 2 order by Good DESC LIMIT 20)
        UNION
        (select * from ta_site where isDeleted = 0 and status = 2 order by Bad ASC LIMIT 20)
        UNION
        (select * from ta_site where isDeleted = 0 and status = 2 order by createdDate DESC LIMIT 20)
        order by rand()`        
      );

      console.log(queryData[0]);

      SiteService.basicRecommendSites = {
        lastDate : new Date(),
        sites : queryData
      }  
      
      
      // 쿼리가 이상해...
      // let data = await Promise.all([
      //   this.cRepo.find({
      //     where : {
      //       IsDeleted : 0,
      //       Status : 2,  
      //     },
      //     take : 20,
      //     order : {
      //       Views : "DESC"
      //     }        
      //   }),
      //   this.cRepo.find({
      //     where : {
      //       IsDeleted : 0,
      //       Status : 2,  
      //     },
      //     take : 20,
      //     order : {
      //       Like : "DESC"
      //     }        
      //   }),
      //   this.cRepo.find({
      //     where : {
      //       IsDeleted : 0,
      //       Status : 2,  
      //     },
      //     take : 20,
      //     order : {
      //       Dislike : "ASC"
      //     }        
      //   }),
      //   this.cRepo.find({
      //     where : {
      //       IsDeleted : 0,
      //       Status : 2,  
      //     },
      //     take : 20,
      //     order : {
      //       CreatedDate : "DESC"
      //     }        
      //   })
      // ])
      

      // SiteService.basicRecommedSites = [];
      // for (const da of data){
      //   console.log(da);
      //   SiteService.basicRecommedSites.concat(da);
      // }
    }
    //  매번 셔플...???? 조금 과한데.... => 프론트로 옮기자
    // this.customUtils.shuffle(SiteService.basicRecommendSites.sites);

    return SiteService.basicRecommendSites.sites;
  }

}
