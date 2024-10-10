import { Site } from 'src/site/entities/site.entity';
import { CustomEncrypt, CustomUtils, FileAdapter } from './utils';
import { ApiClient } from './apiClient';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Member } from 'src/member/entities/member.entity';
import { Category } from 'src/category/entities/category.entity';
// import { run } from "node:test";

// 나중에 엔터니 내부로 옮겨야 할거 같음
@Injectable()
export class Constraint {
  // static cUtils :CustomUtils = new CustomUtils();
  // static apiClient :ApiClient = new ApiClient();
  // static fileAdapter :FileAdapter = new FileAdapter();

  constructor(
    private readonly cUtils: CustomUtils,
    private readonly apiClient: ApiClient,
    private readonly fileAdapter: FileAdapter,
  ) {}

  generateMemObj(memObj: Member) {
    if (!memObj.MemEmail || !memObj.Password) {
      throw new HttpException(
        {
          errCode: 51,
          error: 'email and pw are required',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!this.isValidEmail(memObj.MemEmail)) {
      throw new HttpException(
        {
          errCode: 52,
          error: 'input right email address',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!this.passwordCheck(memObj.Password)) {
      throw new HttpException(
        {
          errCode: 53,
          error: 'input right password, password must be at least 6 character',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const newId = this.cUtils.get32UuId();
    memObj.MemberId = newId;

    // 비밀번호 암호화
    memObj.Password = CustomEncrypt.getInstance().encryptHash(memObj.Password);

    if (memObj.NickName == null) {
      memObj.NickName = memObj.MemEmail.slice(0, memObj.MemEmail.indexOf('@'));
    }

    if (!(memObj.Birth.length == 0) && !(memObj.Birth.length == 8)) {
      throw new HttpException(
        {
          errCode: 54,
          error: 'birth is 8 digits',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (memObj.Gender) {
      if (!['M', 'F'].includes(memObj.Gender)) {
        throw new HttpException(
          {
            errCode: 55,
            error: 'Gender is M or F',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    // 승인으로 시작
    memObj.Authentication = 2;

    // 기본은 일반 유저
    memObj.Authorization = 1;
  }

  async makeSessionId(memberId: string): Promise<string> {
    // 값 여러개를 더해서 암호화하기
    const res = memberId + '|' + new Date().toUTCString();
    console.log(res);
    console.log(Buffer.from(res, 'utf-8').toString('base64'));
    return res;
  }

  decryptSessionId(memberId: string): string {
    // 값 여러개를 더해서 암호화하기
    const res = memberId + new Date().toUTCString();
    return res;
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  emailCheck(email: string): boolean {
    let res = true;
    if (!email.includes('@')) {
      res = false;
    }
    return res;
  }

  passwordCheck(pw: string): boolean {
    let res = true;
    if (pw.length < 6) {
      res = false;
    }
    return res;
  }

  getUrlObj(url: string): URL {
    if (!url) {
      throw 'no url';
    }

    // url 체크(프로토콜 없이 입력했다면)
    if (!url.startsWith('http')) {
      url = 'https://' + url;
    }

    // www. 가 붙는 경우가 있고 안붙는 경우가 있어서 같은걸로 취급하려했는데,,,, 하나는 되고 하나는 안되는 경우가 있어버리네...
    // url 파싱해서 정리 => 안되는 경우가 있네...
    // url = url.replace("www.", "");

    const res = new URL(url);
    return res;
  }

  correctionUrl(urlObj: URL): string {
    // protocol을 넣을지 고민헀는데, 브라우저가 아니면 에러남 넣는게 맞음, 근데 내가 브라우저처럼 자동으로 넣어도 되는거 아님?
    // 빼고가자
    // 아니면 따로 칼럼 파서 넣든가..... 후.....
    // https 가 아니어도 받아줄것인가....................ㅇㅇ 받자.. 받는게 맞음.
    const res = urlObj.origin;

    return res;
  }

  async imageLinkToFileName(id: string, imgLink: string): Promise<string> {
    if (!imgLink) {
      throw new Error();
    }

    if (!imgLink.startsWith('http')) {
      imgLink = 'https:' + imgLink;
    }

    const imgRes = await this.apiClient.getSiteResponse(imgLink);
    let extension = '.png'; //path.extname(imgLink)
    if (imgLink.includes('.jpg')) {
      extension = '.jpg';
    } else if (imgLink.includes('.ico')) {
      extension = '.ico';
    } else if (imgLink.includes('.svg')) {
      extension = '.svg';
    }
    // 이미지가 계속 등록되므로 기존 이미지들 삭제하는 로직 추가
    const imgFile = this.cUtils.get32UuId() + extension;
    this.fileAdapter.saveTheFile(imgRes.data, imgFile, 'images', id);
    // const imgFilePath = path.resolve(__dirname, '..', '..', 'images', id, imgFile);

    // fs.mkdirSync(path.dirname(imgFilePath), { recursive: true });

    // fs.writeFileSync(imgFilePath, imgRes.data);

    this.fileAdapter.removeFiles('', [imgFile]);

    return imgFile;
  }

  // 카테고리 객체 데이터 보정
  generateCategory(category: Category) {
    if (!category.Name) {
      throw new HttpException(
        {
          errCode: 51,
          error: 'name is required',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    category.CategoryId = this.cUtils.get32UuId();
    category.Status = 1;
    category.IsDeleted = 0;
  }

  // 사이트 객체 데이터 생성
  async generateSite(site: Site, urlObj: URL) {
    if (!site.SiteId) {
      site.SiteId = this.cUtils.get32UuId();
    }

    if (!site.URL) {
      site.URL = this.correctionUrl(urlObj);
    }

    if (!site.Status) {
      site.Status = 1;
    }

    // 반응형이야 고려 대상이 아니고 적응형 페이지들의 경우
    // 모바일 페이지는 예를 들어 //m. 이런 페이지는 따로 설정 안해도 모바일 기기에서 접속하면 해당 페이지들이 알아서 리다이렉트를 설정해둔거 같은데..... 그러면.. .흠
    // 굳이 내가 따로 뭔가 설정을 할 필요는 없어 보이는데..

    if (!site.FaviconImg && site.Status == 6) {
      try {
        await this.apiClient.getSiteResponse(urlObj.origin + '/favicon.ico');
        site.FaviconImg = urlObj.origin + '/favicon.ico';
      } catch (err) {}
    }

    await this.correctionSite(site);

    // 이미지 값이 존재하면 해당 링크 파일 다운 받아서 저장하고 값으로 저장
    if (site.Img) {
      try {
        site.Img = await this.imageLinkToFileName(site.SiteId, site.Img);
      } catch {
        site.Img = null;
      }
    }
  }

  // 정보 보정
  async correctionSite(uSite: Site) {
    // 기본적으로 파일로부터 얻는 정보가 들어있을테니..... 나머지는 보정필요
    if (uSite.FaviconImg) {
      //  이미지 url 링크 보정
      if (uSite.FaviconImg.startsWith('//')) {
        uSite.FaviconImg = 'https:' + uSite.FaviconImg;
      } else if (uSite.FaviconImg.startsWith('/')) {
        uSite.FaviconImg = uSite.URL + uSite.FaviconImg;
      } else {
        // 모르겠네 또 어떤 케이스가...
      }
    }

    if (uSite.Description) {
      uSite.Description = uSite.Description.trim();
      if (uSite.Description.length > 1000) {
        uSite.Description = uSite.Description.slice(0, 1000);
      }
    }

    if (uSite.Keywords) {
      uSite.Keywords = uSite.Keywords.trim();
      if (uSite.Keywords.length > 1000) {
        uSite.Keywords = uSite.Keywords.slice(0, 1000);
      }
    }

    if (uSite.OGImg) {
      //  이미지 url 링크 보정
      if (uSite.OGImg.startsWith('//')) {
        uSite.OGImg = 'https:' + uSite.OGImg;
      } else if (uSite.OGImg.startsWith('/')) {
        uSite.OGImg = uSite.URL + uSite.OGImg;
      } else {
        // 모르겠네 또 어떤 케이스가...
      }
    }

    if (uSite.OGDescription) {
      uSite.OGDescription = uSite.OGDescription.trim();
      if (uSite.OGDescription.length > 1000) {
        uSite.OGDescription = uSite.OGDescription.slice(0, 1000);
      }
    }

    // 이미 유저가 변경한 사이트면 표시 정보 자동 변경 불가능
    if (uSite.Status == 2 || uSite.Status == 3 || uSite.Status == 4) {
      return;
    }

    if (!uSite.Name) {
      if (uSite.OGTitle) {
        uSite.Name = uSite.OGTitle.trim();
      } else if (uSite.Title) {
        uSite.Name = uSite.Title.trim();
      }
    }

    if (!uSite.Img) {
      if (uSite.OGImg) {
        uSite.Img = uSite.OGImg;
      } else if (uSite.FaviconImg) {
        uSite.Img = uSite.FaviconImg;
      }
    }

    // 이미지 값이 존재하면 해당 링크 파일 다운 받아서 저장하고 값으로 저장
    if (uSite.Img) {
      uSite.Img = uSite.Img.trim();
      try {
        uSite.Img = await this.imageLinkToFileName(uSite.SiteId, uSite.Img);
      } catch {
        uSite.Img = null;
      }
    }

    if (!uSite.SiteDescription) {
      if (uSite.OGDescription) {
        uSite.SiteDescription = uSite.OGDescription;
      } else if (uSite.Description) {
        uSite.SiteDescription = uSite.Description;
      }
    }
  }
}
