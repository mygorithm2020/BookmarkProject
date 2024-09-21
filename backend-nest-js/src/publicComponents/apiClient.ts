import axios, { AxiosResponse } from "axios";
import { lastValueFrom, map } from "rxjs";
import { Site } from "src/site/entities/site.entity";
import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as iconv from "iconv-lite";
import { parse as Parse } from 'node-html-parser';
import { JSDOM } from 'jsdom'
import exp from "constants";


@Injectable()
export class ApiClient{
    constructor(private readonly httpService: HttpService){
        console.log("new ApiClient");
    }    


    // 아직 브라우저가 아니라서 그런지 계속 문제가 생기는 오류가 있음... 다른 방법을 써야할지도...
    async getSiteResponse(reqUrl : string) : Promise<AxiosResponse> {
        // html body 파일 가져오기
        const data = await lastValueFrom(
        // this.httpService.get<string>(reqUrl, {
        this.httpService.get(reqUrl, {
            maxRedirects : 3,
            timeout : 3000,
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

        return data;

    }
    
    async setSiteParse(reqUrl : string): Promise<Site> {
        let res : Site = new Site();
        console.log("setSite"); 
        // 정확한 url을 입력해도 안될 수가 있음.... 수작업이 필요함..... 
        let response : AxiosResponse;
        try {
          response = await this.getSiteResponse(reqUrl);
          // console.log(response.data.substring(0, 100));      
          console.log("============");  
    
        } catch (err) {
          //  문제 있는 사이트는 숨기기....
          // res.Status = 5;
          
          // 404만 걸러내자
          console.log("getSiteResponseErr : " + err);
          if((err.code === "ENOTFOUND") || (err.response && err.response.status && err.response.status === HttpStatus.NOT_FOUND)) {
            throw new HttpException({
              errCode : 31,
              error : "url is wrong, can not find the site"    
            }, HttpStatus.BAD_REQUEST);
          }
    
          // 타임아웃시 나중에 다시 시도 체크 => 여기를 바꿔야 하나.... 타임아웃이여도 일단 등록으로?
          if((err.code === "ECONNABORTED")) {
            // throw new HttpException({
            //   errCode : 32,
            //   error : "URL verification takes too long, please try again later"    
            // }, HttpStatus.BAD_REQUEST);
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
            // console.log(root);
            
            const titleEl = root.querySelector("title");
            if (titleEl){
              res.Title = titleEl.textContent;
            }
            
      
            let links = root.querySelectorAll("link");
            // 사이즈 큰걸로
            let tempSize = 0;
            for (let idx =0; idx < links.length; idx ++){
              if (links[idx].getAttribute("rel")){
                const linkRel = links[idx].getAttribute("rel").toLowerCase();
                if (linkRel === "shortcut icon" || linkRel === "icon"){
                  const size = links[idx].getAttribute("sizes")? parseInt(links[idx].getAttribute("sizes")) : 0;
                  if (tempSize === 0 || tempSize < size){
                    res.FaviconImg = links[idx].getAttribute("href");    
                    tempSize = size;
                  }                    
                }
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
    
              if (metaEl[idx].getAttribute("name")){
                const metaFromName = metaEl[idx].getAttribute("name").toLowerCase();
                if (metaFromName === "description"){
                  res.Description = metaEl[idx].getAttribute("content");
                } else if (metaFromName === "keywords") {
                  res.Keywords = metaEl[idx].getAttribute("content");
                }
              } else if (metaEl[idx].getAttribute("property")){
                const metaFromProperty = metaEl[idx].getAttribute("property").toLowerCase();
                if (metaFromProperty === "og:title"){
                  res.OGTitle = metaEl[idx].getAttribute("content");
                } else if ( metaFromProperty === "og:site_name"){
                  res.OGSiteName = metaEl[idx].getAttribute("content");
                } else if ( metaFromProperty === "og:image"){
                  res.OGImg = metaEl[idx].getAttribute("content");
                } else if ( metaFromProperty === "og:description"){
                  res.OGDescription = metaEl[idx].getAttribute("content");
                } else if ( metaFromProperty === "og:url"){
                  res.OGURL = metaEl[idx].getAttribute("content");
                } 
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
}