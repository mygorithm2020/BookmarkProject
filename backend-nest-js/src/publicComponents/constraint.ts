import { Site } from "src/site/entities/site.entity";
import { CustomEncrypt, CustomUtils, FileAdapter } from "./utils";
import { ApiClient } from "./apiClient";
import * as path from "path";
import * as fs from 'fs';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Member } from "src/member/entities/member.entity";
import { Category } from "src/category/entities/category.entity";

// 나중에 엔터니 내부로 옮겨야 할거 같음
@Injectable()
export class Constraint {

  // static cUtils :CustomUtils = new CustomUtils();
  // static apiClient :ApiClient = new ApiClient();
  // static fileAdapter :FileAdapter = new FileAdapter();

  constructor(
    private readonly cUtils :CustomUtils,
    private readonly apiClient :ApiClient,
    private readonly fileAdapter :FileAdapter,
  ){}




  generateMemObj(memObj : Member){
    if (!memObj.MemEmail || !memObj.Password){
      throw new HttpException({
        errCode : 51,
        error : "email and pw are required"
      }, HttpStatus.BAD_REQUEST);
    }  
    if (!this.isValidEmail(memObj.MemEmail)){
      throw new HttpException({
        errCode : 52,
        error : "input right email address"
      }, HttpStatus.BAD_REQUEST);
    }

    if (!this.passwordCheck(memObj.Password)){
      throw new HttpException({
        errCode : 53,
        error : "input right password, password must be at least 6 character"
      }, HttpStatus.BAD_REQUEST);
    }

    const newId = this.cUtils.get32UuId();
    memObj.MemberId = newId;

    // 비밀번호 암호화
    memObj.Password = CustomEncrypt.getInstance().encryptHash(memObj.Password);

    if (memObj.NickName == null){
      memObj.NickName = memObj.MemEmail.slice(0, memObj.MemEmail.indexOf("@"));      
    }

    if (!(memObj.Birth.length == 0) && !(memObj.Birth.length == 8)){
      throw new HttpException({
        errCode : 54,
        error : "birth is 8 digits"
      }, HttpStatus.BAD_REQUEST);
    }

    if (memObj.Gender){
      if (!(["M", "F"].includes(memObj.Gender))){
        throw new HttpException({
          errCode : 55,
          error : "Gender is M or F"
        }, HttpStatus.BAD_REQUEST);
      }      
    }

    // 승인으로 시작
    memObj.Authentication = 2;

    // 기본은 일반 유저
    memObj.Authorization = 1;
  }

  async makeSessionId(memberId : string) : Promise<string> {
    // 값 여러개를 더해서 암호화하기
    let res = memberId +"|"+ new Date().toUTCString();
    console.log(res);
    console.log(Buffer.from(res, "utf-8").toString("base64"));
    return res;
  }

  decryptSessionId(memberId : string) : string {
    // 값 여러개를 더해서 암호화하기
    let res = memberId + new Date().toUTCString();
    return res;
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  emailCheck(email : string) : boolean{
    let res = true;
    if (!email.includes("@")){
      res = false;
    }
    return res
  }

  passwordCheck(pw : string) : boolean{
    let res = true;
    if (pw.length < 6){
      res = false;
    }
    return res
  }
  
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
    if (!imgLink || !imgLink.startsWith("http")){
      throw new Error();
    }
    let imgRes = await this.apiClient.getSiteResponse(imgLink);
    let extension = ".png"; //path.extname(imgLink)
    if (imgLink.includes(".jpg")){
      extension = ".jpg";
    } else if (imgLink.includes(".ico")){
      extension = ".ico";
    } else if (imgLink.includes(".svg")){
      extension = ".svg";
    }
    // 이미지가 계속 등록되므로 기존 이미지들 삭제하는 로직 추가
    let imgFile = this.cUtils.get32UuId() + extension;
    this.fileAdapter.saveTheFile(imgRes.data, imgFile, 'images', id);
    // const imgFilePath = path.resolve(__dirname, '..', '..', 'images', id, imgFile);

    // fs.mkdirSync(path.dirname(imgFilePath), { recursive: true });

    // fs.writeFileSync(imgFilePath, imgRes.data);

    this.fileAdapter.removeFiles("", [imgFile]);

    return imgFile;
  }

  // 카테고리 객체 데이터 보정
  generateCategory(category : Category){
    if (!category.Name){
      throw new HttpException({
        errCode : 51,
        error : "name is required"
      }, HttpStatus.BAD_REQUEST);   
    }
    category.CategoryId = this.cUtils.get32UuId();
    category.Status = 1;
    category.IsDeleted = 0;
  }

  // 사이트 객체 데이터 보정
  async generateSite(site : Site, urlObj : URL){

    site.SiteId = this.cUtils.get32UuId();
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
      // 파비콘 없으면 기본 url에 /favicon.ico 로 보정
      try{
          await this.apiClient.getSiteResponse(urlObj.origin + "/favicon.ico");
          site.FaviconImg = urlObj.origin + "/favicon.ico";

      } catch (err) {
           
      }
    }

    //  이미지 url 링크 보정
    if (site.OGImg && !site.OGImg.startsWith("//") && site.OGImg.startsWith("/")){ 
      site.OGImg = urlObj.origin + site.OGImg;
    }
    
    // 자동 표시 정보 등록용
    if (site.OGTitle){
      site.Name = site.OGTitle.trim();
    } else if (site.Title){
      site.Name = site.Title.trim();
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