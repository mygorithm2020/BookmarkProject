import { Site } from "src/site/entities/site.entity";
import { CustomUtils, FileAdapter } from "./utils";
import { ApiClient } from "./apiClient";
import * as path from "path";
import * as fs from 'fs';

export class Constraint {

  static cUtils :CustomUtils = new CustomUtils();
  static apiClient :ApiClient = new ApiClient();  
  static fileAdapter :FileAdapter = new FileAdapter();
  
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

  async imageLinkToFileName(id : string, imgLink : string) : Promise<string>{    
    let imgRes = await Constraint.apiClient.getSiteResponse(imgLink);
    let imgFile = Constraint.cUtils.get32UuId() + path.extname(imgLink);
    Constraint.fileAdapter.saveTheFile(imgRes.data, imgFile, 'images', id);
    // const imgFilePath = path.resolve(__dirname, '..', '..', 'images', id, imgFile);

    // fs.mkdirSync(path.dirname(imgFilePath), { recursive: true });

    // fs.writeFileSync(imgFilePath, imgRes.data);

    return imgFile;
  }

  // 사이트 객체 데이터 보정
  async generateSite(site : Site, urlObj : URL){

    
    site.SiteId = Constraint.cUtils.get32UuId();
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
        await Constraint.apiClient.getSiteResponse(urlObj.origin + "/favicon.ico");
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

    // 이미지 값이 존재하면 해당 링크 파일 다운 받아서 저장하고 값으로 저장
    if (site.Img){
      try {
        site.Img = await this.imageLinkToFileName(site.SiteId, site.Img);
      } catch {
        site.Img = null;
      }      
    }

    if (site.OGDescription){
    site.SiteDescription = site.OGDescription
    } else if (site.Description){
    site.SiteDescription = site.Description
    }

  }
    
}