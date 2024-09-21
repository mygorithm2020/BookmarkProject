// console.log("Sdsd");
// console.log(parseInt(null)? "ss": "aa");
// console.log(parseInt(undefined));

// const q = "https://login.sendgrid.com/";
// const w = q.split(".");
// console.log(w);
// console.log(w[w.length-2]);
// return;


//ES6
// import { ApiRequest } from './ApiRequest.js';
// import pkg from "selenium-webdriver";
// const { Builder, By, until, Options } = pkg;

// COMMON JS
const { ApiRequest } = require("./ApiRequest.js");
const { Builder, By, until, Options } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
// import ('chromedriver');

class Site{
    SiteId;
    URL;        
    Name;        
    NameKR;        
    IPAddress;        
    Img;        
    SiteDescription;        
    AppLinkAndroid;        
    AppLinkIOS;
    Views;        
    Good;        
    Bad;        
    MemberId;        
    Status;
    Title;
    FaviconImg;
    Description;
    Keywords;
    OGTitle;
    OGSiteName;        
    OGImg;
    OGDescription;
    OGURL; 
    IsDeleted;
    CreatedDate;
    UpdatedDate;
    constructor(siteObj){        
        this.SiteId = siteObj.SiteId;
        this.URL = siteObj.URL;        
        this.Name = siteObj.Name;        
        this.NameKR = siteObj.NameKR;        
        this.IPAddress = siteObj.IPAddress;        
        this.Img = siteObj.Img;        
        this.SiteDescription = siteObj.SiteDescription;        
        this.AppLinkAndroid = siteObj.AppLinkAndroid;        
        this.AppLinkIOS = siteObj.AppLinkIOS;        
        this.Status = siteObj.Status;
        this.Title = siteObj.Title;
        this.FaviconImg = siteObj.FaviconImg;
        this.Description = siteObj.Description;
        this.Keywords = siteObj.Keywords;
        this.OGTitle = siteObj.OGTitle;
        this.OGSiteName = siteObj.OGSiteName;        
        this.OGImg = siteObj.OGImg;
        this.OGDescription = siteObj.OGDescription;
        this.OGURL = siteObj.OGURL; 
    }
}


const enrollSite = new Set();
const start = Date.now();
(async function(){
    // 웹사이트를 불러와서
    let data = await ApiRequest.axiosGet("/site/daemon");
    console.log(data.length);
    //  크롬을 띄워서 해당 사이트 정보 스캔
    for (const one of data){
        enrollSite.add(one.URL);
    }

    let cnt = 0;    
    for (const one of data){                
        const res = new Site(one);
        console.log(cnt + ":  " + one.URL);
        cnt += 1;
        if (res.Status == 2 || res.Status == 3 || res.Status == 4){
            continue;
        }
        await (async function example() {
            
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

            let options = new chrome.Options();
            // options.addArguments('--headless'); // 백그라운드 실행 옵션
            options.windowSize({ width : 800,  height : 450});

            let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
            // let options = new Options(driver);
            // options.addArguments('--headless'); // Headless 모드

            let tempEnrollSites = new Set();

            try {
                // await driver.manage().setTimeouts({
                //     implicit: 3000, // 10초
                //     pageLoad: 10000, // 30초
                //     script: 10000 // 30초
                // });

                

                await driver.get(res.URL);                    
                // let page = await driver.getPageSource();

                await driver.sleep(3000);

                // let links = await driver.findElements(By.css("link"));
                let links = await driver.wait(until.elementsLocated(By.css("link")), 4000);
                let tempSize = 0;            
                for (let idx =0; idx < links.length; idx++){
                    if (links[idx].getAttribute("rel")){
                        const linkRel = await links[idx].getAttribute("rel");
                        if (linkRel.toLowerCase().includes("icon")){                    
                            let size = await links[idx].getAttribute("sizes")? parseInt(links[idx].getAttribute("sizes")) : 0;
                        if (tempSize === 0 || tempSize < size){
                            res.FaviconImg = await links[idx].getAttribute("href");    
                            tempSize = size;
                        }                    
                        }
                    }              
                }

                let title = await driver.getTitle();
                res.Title = title;

                // // let button = await driver.wait(until.elementLocated(By.id('foo')), 10000);

                // let metaEl = await driver.findElements(By.css("meta"));
                let metaEl = await driver.wait(until.elementsLocated(By.css("meta")), 4000);
                for (let idx = 0; idx <metaEl.length; idx++){
                    // console.log(metaEl[idx].rawAttrs);
                    // // console.log(`name : ${metaEl[idx].getAttribute("name")}`);
                    // // console.log(`property : ${metaEl[idx].getAttribute("property")}`);
                    // // console.log(`attri : ${JSON.stringify(metaEl[idx].attrs)}`);
                    // console.log("------------------------");     
                    let metaFromName = await metaEl[idx].getAttribute("name");
                    let metaFromProperty = await metaEl[idx].getAttribute("property");
                    let metaFromId = await metaEl[idx].getAttribute("id");
                    let metaContent = await metaEl[idx].getAttribute("content");

                    if (metaContent){
                        if (metaFromName){                    
                            metaFromName = metaFromName.toLowerCase();
                            if (metaFromName === "description"){
                                res.Description = metaContent;
                            } else if (metaFromName === "keywords") {
                                res.Keywords = metaContent;
                            }
                        } else if (metaFromId){
                            metaFromId = metaFromId.toLowerCase();
                            if (metaFromId === "description"){
                                res.Description = metaContent;
                            } else if (metaFromId === "keywords") {
                                res.Keywords = metaContent;
                            }
                        } else if (metaFromProperty){                    
                            metaFromProperty = metaFromProperty.toLowerCase();
                            if (metaFromProperty === "og:title"){
                                res.OGTitle = metaContent;
                            } else if ( metaFromProperty === "og:site_name"){
                                res.OGSiteName = metaContent;
                            } else if ( metaFromProperty === "og:image"){
                                res.OGImg = metaContent;
                            } else if ( metaFromProperty === "og:description"){
                                res.OGDescription = metaContent;
                            } else if ( metaFromProperty === "og:url"){
                                res.OGURL = metaContent;
                            } 
                        }                          
                    }                    
                }
                

                res.Status = 6;
                // 사이트 업데이트
                console.log(res);
                await ApiRequest.axiosPatch("/site/daemon", res);
                

                //  새로운 사이트 등록
                console.log("링크 조회 중");
                let hyperLinks = await driver.findElements(By.css("a"));  
                for (const hl of hyperLinks){                    
                    const newS = await hl.getAttribute("href");
                    try {
                        if (newS && newS.startsWith('https:')){                            
                            const urlObj = new URL(newS);                        
                            const newUrl = urlObj.origin;
                            const urlReg = newUrl.split(".");
                            // 서브 도메인은 제외하자 너무 잡다한게 많아진다
                            // 길이가 3보다 크면서 서브도메인이
                             
                            if ((urlReg.length > 2 && urlReg[urlReg.length-2].length > 2 && !newUrl.includes("www.")) || newUrl.includes("login") || newUrl.includes("signup") || newUrl.includes("test")){
                                continue;
                            }
                            if (!enrollSite.has(newUrl) && !tempEnrollSites.has(newUrl)){                                
                                tempEnrollSites.add(newUrl);
                                enrollSite.add(newUrl);                                
                            }                      
                        }
                    } catch (err) {

                    }                    
                }
                console.log("링크 조회 끝");      

            } catch (err) {
                console.log(err);
                console.log(`${res.URL} 등록실패`);
                // 사이트 조회 실패
                res.Status = 5;
                await ApiRequest.axiosPatch("/site/daemon", res);
            } finally {
                await driver.quit();                 
                // setTimeout(async () => {
                                                
                // }, 1000);           
            }

            console.log("사이트 등록 중" + tempEnrollSites.size);
            for (const addNewUrl of tempEnrollSites){                
                // 여기에서 새로 등록 api 추가
                try {
                    await ApiRequest.axiosPost("/site/daemon", {URL : addNewUrl});
                } catch (err) {

                }                
            }    
            console.log("사이트 등록 끝");        
            
        })();    
        
        console.log(`진행률 : ${parseInt(cnt/data.length * 100)}% (${cnt}/${data.length})    ${parseInt((Date.now() - start)/1000)} 초`);        
        // 생각보다 오래걸려서 일부분씩 하자
        if (cnt/data.length * 100 > 10){
            break;
        }
        
    }

})();