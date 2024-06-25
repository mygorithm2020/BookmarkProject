import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Site } from './entities/site.entity';
import { Repository, UpdateResult } from 'typeorm';
import {v4 as uuidV4} from 'uuid'
import { URL } from 'url';
import { EMPTY, catchError, firstValueFrom, lastValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import axios, { AxiosError, HttpStatusCode } from 'axios';
import { JSDOM } from 'jsdom'
import { parse as Parse } from 'node-html-parser';

@Injectable()
export class SiteService {

  constructor(
    @InjectRepository(Site) private cRepo : Repository<Site>,
    private readonly httpService: HttpService){}

  

  getUrlObj(url : string): URL{

    console.log(url);

    if (url === null || url === undefined){
      throw "no url";
    }

    // url 체크(프로토콜 없이 입력했다면)
    if (!url.startsWith("http")){
      url = "https://" + url;
    }
    console.log(url);
    // url 파싱해서 정리
    let res = new URL(url);
    return res;
  }

  correctionSiteObj(site : Site, urlObj : URL){

    // protocol을 넣을지 고민헀는데, 브라우저가 아니면 에러남 넣는게 맞음, 근데 내가 브라우저처럼 자동으로 넣어도 되는거 아님?
    // 빼고가자
    // 아니면 따로 칼럼 파서 넣든가..... 후.....
    // https 가 아니어도 받아줄것인가....................ㅇㅇ 받자.. 받는게 맞음.
    site.URL = urlObj.host;

    // 파비콘 없으면 기본 url에 /favicon.ico 로 보정
    console.log(site.FaviconImg);
    if (site.FaviconImg === undefined){
      site.FaviconImg = urlObj.origin + "/favicon.ico";

    } else if (site.FaviconImg.startsWith("//")){
      
    } else if (site.FaviconImg.startsWith("/")){ //  이미지 url 링크 보정
      site.FaviconImg = urlObj.origin + site.FaviconImg;
    } else {
      // 모르겠네 또 어떤 케이스가...
    }
    
    // 기타 파악되는대로 여기 추가 필요

  }

  async create(site: Site) : Promise<Site> {
    console.log('This action adds a new category');
    // uuid 생성
    const newId = uuidV4().replaceAll("-", "");
    site.SiteId = newId;   
    
    let urlObj = this.getUrlObj(site.URL);    
    console.log(urlObj);
    
    // url 유효한지 확인
    // 여기가 문제구만.......
    let extractedSite = await this.setSiteParse(urlObj.origin);
      console.log(extractedSite);    
      if (extractedSite !== null){
        site.Title = extractedSite.Title;

        site.FaviconImg = extractedSite.FaviconImg;

        site.Description = extractedSite.Description;
        site.Keywords = extractedSite.Keywords;
        site.OGTitle = extractedSite.OGTitle;
        site.OGSiteName = extractedSite.OGSiteName;
        site.OGImg = extractedSite.OGImg;
        site.OGDescription = extractedSite.OGDescription;
        site.OGURL = extractedSite.OGURL;    

        this.correctionSiteObj(site, urlObj);      
      }
      //https 로 실패할 경우 http로 시도할 것인가 말것인가...........

    // 데이터 삽입
    
    const newCategory = this.cRepo.create(site);
    console.log(newCategory);
    return await this.cRepo.save(newCategory);
    
  }

  async setSiteJSDOM(reqUrl: string): Promise<Site> {
    
    let s = await JSDOM.fromURL(reqUrl); //timeout 설정이 불가능...
    let sss = s.window.document.querySelectorAll("meta");
    for (let qdx = 0; qdx < sss.length; qdx++){
      console.log(`name : ${sss[qdx].getAttribute("name")}`);
      console.log(`property : ${sss[qdx].getAttribute("property")}`);
      console.log(`content : ${sss[qdx].getAttribute("content")}`);
      console.log("------------------------");
    }
    console.log("============");
    return new Site();    
  }

  async setSiteJSDOMByHtml(htmlStr : string): Promise<Site> {
    
    const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
    console.log(dom.window.document.querySelector("p").textContent);


    const { window } = new JSDOM(htmlStr);
    console.log("============");
    return new Site();    
  }

  async setSiteParse(reqUrl): Promise<Site> {
    let res : Site = new Site();
    console.log("setSite");  
    const data = await this.getSiteHtml(reqUrl);
    console.log(data.substring(0, 200));      
    console.log("============");  

    try{
      const root = Parse(data);
      res.Title = root.querySelector("title").textContent;

      let links = root.querySelectorAll("link");
      for (let idx =0; idx < links.length; idx ++){
        if ( links[idx].getAttribute("rel") === "shortcut icon" || links[idx].getAttribute("rel") === "icon" ){
          res.FaviconImg = links[idx].getAttribute("href");
          break;          
        }        
      }      
      // <link rel="shortcut icon" href="//img.danawa.com/new/danawa_main/v1/img/danawa_favicon.ico">
      //  데이터 넣는 과정추가 필요
      let metaEl = root.querySelectorAll("meta")
      for (let idx = 0; idx <metaEl.length; idx++){
        console.log(metaEl[idx].rawAttrs);
        // console.log(`name : ${metaEl[idx].getAttribute("name")}`);
        // console.log(`property : ${metaEl[idx].getAttribute("property")}`);
        // console.log(`attri : ${JSON.stringify(metaEl[idx].attrs)}`);
        console.log("------------------------");
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
      console.log(err);
      throw "data extract failed";
    }

    return res;
  }

  async getSiteHtml(reqUrl) : Promise<string> {
    // html body 파일 가져오기
    const data = await lastValueFrom(
      this.httpService.get<string>(reqUrl, {
        maxRedirects : 2,
        timeout : 2000,
      })
      .pipe(
        map(res => res.data),
        catchError((error: AxiosError) => {
          console.log(error.message);
          console.log(error.code);

          
          throw new HttpException(`html data download failed, ${error.code}, ${error.message} `, HttpStatus.BAD_REQUEST);
          throw `html data download failed, ${error.code}, ${error.message} `;
        }),
      ),
    );

    // const data = await lastValueFrom(
    //   this.httpService.get<string>(fixedURL.origin, {
    //     maxRedirects : 0,
    //     timeout : 3000,
    //   })
    //   .pipe(
    //     map(response => response.status),
    //     catchError((error: AxiosError) => {
    //         console.log(error.status);        
    //         // console.log('An error happened!');
    //         // throw 'An error happened!';
    //         return EMPTY;
    //     }),
    //   ),
    // );
    // console.log("httpService" + data + "\r\n")

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

  async findAll() : Promise<Site[]> {
    console.log("This action returns all site");
    return await this.cRepo.find({
      where : {
        IsDeleted : 0,
        Status : 2,  
      },
      take : 20,
      order : {
        Views : "DESC"
      }        
    });
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
      let queryData = await this.cRepo.query(
        `(select * from ta_site where isDeleted = 0 and status = 2 order by Views DESC LIMIT 20)
        UNION
        (select * from ta_site where isDeleted = 0 and status = 2 order by ta_site.LIKE DESC LIMIT 20)
        UNION
        (select * from ta_site where isDeleted = 0 and status = 2 order by dislike ASC LIMIT 20)
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
    //  매번 셔플...???? 조금 과한데....
    this.shuffle(SiteService.basicRecommendSites.sites);

    return SiteService.basicRecommendSites.sites;
  }

  //  피셔-예이츠 셔플(Fisher-Yates shuffle)
  shuffle<T>(array : T[]) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // 무작위 인덱스(0 이상 i 미만)
  
      // array[i]와 array[j]를 바꿔치기합니다.
      // 아래 답안에선 "구조 분해 할당(destructuring assignment)"이라 불리는 문법을 사용하여
      // 원하는 것을 구현하였는데,
      // 이 문법에 대한 자세한 내용은 이후 챕터에서 다룰 예정입니다.
      // 구조 분해 할당을 사용하지 않고 작성한 코드는 아래와 같습니다.
      // let t = array[i]; array[i] = array[j]; array[j] = t
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  async findRecommedSites() : Promise<Site[]> {
    console.log("This action findRecommedSites site");

    const res = this.getRecommendSite();
    return res;
  }

  findOne(id: string) : Promise<Site> {
    console.log(`This action returns a #${id} category`);
    return this.cRepo.findOne({
      where : {
        SiteId :  id
      }
    })
    
  }

  findOneByUrl(url: string) : Promise<Site> {
    url = this.getUrlObj(url).host;
    console.log(`This action returns a #${url} category`);
    return this.cRepo.findOne({
      where : {
        URL :  url
      }
    })
    
  }

  async update(id: string, updateCategoryDto: Site) : Promise<UpdateResult> {
    console.log(`This action updates a #${id} category`);    
    // console.log(await this.cRepo.update(id, updateCategoryDto));
    // 반환값이 뭐지...?? => UpdateResult { generatedMaps: [], raw: [], affected: 1 }
    return await this.cRepo.update(id, updateCategoryDto);
  }

  async updateViews(id: string) : Promise<UpdateResult> {
    console.log(`This action updateViews a #${id} site`);    
    // console.log(await this.cRepo.update(id, updateCategoryDto));
    // 반환값이 뭐지...?? => UpdateResult { generatedMaps: [], raw: [], affected: 1 }
    return await this.cRepo.update(id, {
      Views : () => "Views + 1",
    })
    .catch( (res)=> {
      throw new HttpException(res, HttpStatus.BAD_REQUEST);
    });
    // await this.commentRepository.update(comment.id, {
    //   likeCount: () => 'like_count + 1',
    // });
  }

  async remove(id: string) {
    console.log(`This action removes a #${id} category`);
    await this.cRepo.update(id, {
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

}
