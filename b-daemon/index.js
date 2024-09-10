console.log("Sdsd");


import { ApiRequest } from './ApiRequest.js';
import pkg from "selenium-webdriver";
const { Builder, By, until, Options } = pkg;
// import ('chromedriver');

class Site{
    constructor(){        
        this.SiteId;
        this.URL;        
        this.Name;        
        this.NameKR;        
        this.IPAddress;        
        this.Img;        
        this.SiteDescription;        
        this.AppLinkAndroid;        
        this.AppLinkIOS;
        this.Views;        
        this.Good;        
        this.Bad;        
        this.MemberId;        
        this.Status;
        this.Title;
        this.FaviconImg;
        this.Description;
        this.Keywords;
        this.OGTitle;
        this.OGSiteName;        
        this.OGImg;
        this.OGDescription;
        this.OGURL; 
        this.IsDeleted;
        this.CreatedDate;
        this.UpdatedDate;
    }
}

let enrollSite = new Set();

// 웹사이트를 불러와서
let data = await ApiRequest.axiosGet("/site/daemon");
console.log(data.length);
//  크롬을 띄워서 해당 사이트 정보 스캔
for (const one of data){
    console.log(one.URL);
    enrollSite.add(one);

    (async function example() {
        // let driver = await new Builder().forBrowser('chrome').build();
        // try {
        //     // Google 홈페이지로 이동
        //     await driver.get(one.URL);

        //     // 페이지 제목 출력
        //     let title = await driver.getTitle();
        //     console.log('Page title is:', title);
        // } finally {
        //     // 브라우저 닫기
        //     await driver.quit();
        // }

        // let options = new Options();
        // options.addArguments('--headless'); // Headless 모드

        // let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
        // try {
        //     await driver.get("https://kr.hotels.com");
        //     let title = await driver.getTitle();
        //     console.log('Page title is:', title);
        // } finally {
        //     await driver.quit();
        // }

        

        let driver = await new Builder().forBrowser('chrome').build();

        // let options = new Options(driver);
        // options.addArguments('--headless'); // Headless 모드
        try {
            await driver.get("https://kr.hotels.com");
            let title = await driver.getTitle();
            // let page = await driver.getPageSource();
            let metas = await driver.findElements(By.css("meta"));
            // console.log(metas[0]);      
            
            // const titleEl = root.querySelector("title");
            // if (titleEl){
            //   res.Title = titleEl.textContent;
            // }
            
      
            // let links = root.querySelectorAll("link");
            // // 사이즈 큰걸로
            // let tempSize = 0;
            // for (let idx =0; idx < links.length; idx ++){
            //   if (links[idx].getAttribute("rel")){
            //     const linkRel = links[idx].getAttribute("rel").toLowerCase();
            //     if (linkRel === "shortcut icon" || linkRel === "icon"){
            //       if (tempSize === 0 || tempSize < parseInt(links[idx].getAttribute("sizes"))){
            //         res.FaviconImg = links[idx].getAttribute("href");    
            //         tempSize = parseInt(links[idx].getAttribute("sizes"));
            //       }                    
            //     }
            //   }              
            // }      
            // // <link rel="shortcut icon" href="//img.danawa.com/new/danawa_main/v1/img/danawa_favicon.ico">
            // let metaEl = root.querySelectorAll("meta")
            // for (let idx = 0; idx <metaEl.length; idx++){
            //   // console.log(metaEl[idx].rawAttrs);
            //   // // console.log(`name : ${metaEl[idx].getAttribute("name")}`);
            //   // // console.log(`property : ${metaEl[idx].getAttribute("property")}`);
            //   // // console.log(`attri : ${JSON.stringify(metaEl[idx].attrs)}`);
            //   // console.log("------------------------");          
    
            //   if (metaEl[idx].getAttribute("name")){
            //     const metaFromName = metaEl[idx].getAttribute("name").toLowerCase();
            //     if (metaFromName === "description"){
            //       res.Description = metaEl[idx].getAttribute("content");
            //     } else if (metaFromName === "keywords") {
            //       res.Keywords = metaEl[idx].getAttribute("content");
            //     }
            //   } else if (metaEl[idx].getAttribute("property")){
            //     const metaFromProperty = metaEl[idx].getAttribute("property").toLowerCase();
            //     if (metaFromProperty === "og:title"){
            //       res.OGTitle = metaEl[idx].getAttribute("content");
            //     } else if ( metaFromProperty === "og:site_name"){
            //       res.OGSiteName = metaEl[idx].getAttribute("content");
            //     } else if ( metaFromProperty === "og:image"){
            //       res.OGImg = metaEl[idx].getAttribute("content");
            //     } else if ( metaFromProperty === "og:description"){
            //       res.OGDescription = metaEl[idx].getAttribute("content");
            //     } else if ( metaFromProperty === "og:url"){
            //       res.OGURL = metaEl[idx].getAttribute("content");
            //     } 
            //   }  
            // }
            console.log('Page title is:', title);
        } finally {
            await driver.quit(); 
            setTimeout(async () => {
                                               
            }, 1000);
            
        }
    })();

    break;    
}

//  새로운 사이트 등록
// for (const newSite of ){
//     if (!enrollSite.has()){
//         enrollSite.add();
//     }
// }

// 사이트 정보 업데이트