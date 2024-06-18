import { Injectable } from '@nestjs/common';
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

    if (url === null || url === undefined){
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

  correctionSiteObj(site : Site, urlObj : URL){

    // protocol을 넣을지 고민헀는데, 브라우저가 아니면 에러남 넣는게 맞음, 근데 내가 브라우저처럼 자동으로 넣어도 되는거 아님?
    // 빼고가자
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

    console.log(site);    

    // 데이터 삽입
    
    const newCategory = this.cRepo.create(site);
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
    const data = await firstValueFrom(
      this.httpService.get<string>(reqUrl, {
        maxRedirects : 2,
        timeout : 2000,
      })
      .pipe(
        map(res => res.data),
        catchError((error: AxiosError) => {
          console.log(error.message);
          console.log(error.code);
          
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
    return await this.cRepo.find();
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

  async remove(id: string) {
    console.log(`This action removes a #${id} category`);
    await this.cRepo.update(id, {
      IsDeleted : 1
    })
  }
}
