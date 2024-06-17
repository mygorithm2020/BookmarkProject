import { Injectable } from '@nestjs/common';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Site } from './entities/site.entity';
import { Repository } from 'typeorm';
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

  async create(site: Site) : Promise<Site> {
    console.log('This action adds a new category');
    // uuid 생성
    const newId = uuidV4().replaceAll("-", "");
    site.SiteId = newId;        

    // url 체크(프로토콜 없이 입력했다면)
    if (!site.URL.startsWith("http")){
      site.URL = "https://" + site.URL;
    }
    // url 파싱해서 정리
    let fixedURL = new URL(site.URL); 
    console.log(fixedURL);
    
    // protocol을 넣을지 고민헀는데, 브라우저가 아니면 에러남 넣는게 맞음, 근데 내가 브라우저처럼 자동으로 넣어도 되는거 아님?
    //빼고가자
    // https 가 아니어도 받아줄것인가....................ㅇㅇ 받자.. 받는게 맞음.
    site.URL = fixedURL.host;
    
    // url 유효한지 확인
    // 여기가 문제구만.......
    let extractedSite = await this.setSiteParse(fixedURL.origin);
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
    }

    console.log(site);    

    // 데이터 삽입
    
    const newCategory = this.cRepo.create(site);
    return;
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
    console.log(data.substring(0, 100));      
    console.log("============");   
    try{
      const root = Parse(data);
      
      //  데이터 넣는 과정추가 필요
      let rData = root.querySelectorAll("meta")
      for (let idx = 0; idx <Math.min(rData.length, 5); idx++){
        console.log(rData[idx].rawAttrs);
        console.log(`name : ${rData[idx].getAttribute("name")}`);
        console.log(`property : ${rData[idx].getAttribute("property")}`);
        console.log(`attri : ${JSON.stringify(rData[idx].attrs)}`);
        console.log("------------------------");
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

  async update(id: string, updateCategoryDto: Site) {
    console.log(`This action updates a #${id} category`);
    // 반환값이 뭐지...??
    console.log(await this.cRepo.update(id, updateCategoryDto))
    // return await this.cRepo.update(id, updateCategoryDto);
  }

  async remove(id: string) {
    console.log(`This action removes a #${id} category`);
    await this.cRepo.update(id, {
      IsDeleted : 1
    })
  }
}
