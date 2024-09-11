console.log("Sdsd");
console.log(parseInt(null)? "ss": "aa");
console.log(parseInt(undefined));

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



const start = Date.now();
(async function(){
    // 웹사이트를 불러와서
    let data = await ApiRequest.axiosGet("/site/daemon");
    console.log(data.length);
    //  크롬을 띄워서 해당 사이트 정보 스캔
    let cnt = 0;
    for (const one of data){
        console.log(one.URL);
        enrollSite.add(one.URL);
        const res = new Site(one);
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
            options.addArguments('--headless'); // 백그라운드 실행 옵션
            

            let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

            await driver.manage().setTimeouts({
                implicit: 3000, // 10초
                pageLoad: 10000, // 30초
                script: 10000 // 30초
            });

            // let options = new Options(driver);
            // options.addArguments('--headless'); // Headless 모드
            try {
                await driver.get(res.URL);
                let title = await driver.getTitle();
                res.Title = title;
                // let page = await driver.getPageSource();

                let links = await driver.findElements(By.css("link"));
                // let links = await driver.wait(until.elementsLocated(By.css("link")), 3000);
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

                // // let button = await driver.wait(until.elementLocated(By.id('foo')), 10000);

                let metaEl = await driver.findElements(By.css("meta"));
                for (let idx = 0; idx <metaEl.length; idx++){
                // console.log(metaEl[idx].rawAttrs);
                // // console.log(`name : ${metaEl[idx].getAttribute("name")}`);
                // // console.log(`property : ${metaEl[idx].getAttribute("property")}`);
                // // console.log(`attri : ${JSON.stringify(metaEl[idx].attrs)}`);
                // console.log("------------------------");     
                
                if (await metaEl[idx].getAttribute("name")){
                    console.log(await metaEl[idx].getAttribute("name"));
                    let metaFromName = await metaEl[idx].getAttribute("name");
                    metaFromName = metaFromName.toLowerCase();
                    if (metaFromName === "description"){
                    res.Description = await metaEl[idx].getAttribute("content");
                    } else if (metaFromName === "keywords") {
                    res.Keywords = await metaEl[idx].getAttribute("content");
                    }
                } else if (await metaEl[idx].getAttribute("property")){
                    let metaFromProperty = await metaEl[idx].getAttribute("property");
                    metaFromProperty = metaFromProperty.toLowerCase();
                    if (metaFromProperty === "og:title"){
                    res.OGTitle = await metaEl[idx].getAttribute("content");
                    } else if ( metaFromProperty === "og:site_name"){
                    res.OGSiteName = await metaEl[idx].getAttribute("content");
                    } else if ( metaFromProperty === "og:image"){
                    res.OGImg = await metaEl[idx].getAttribute("content");
                    } else if ( metaFromProperty === "og:description"){
                    res.OGDescription = await metaEl[idx].getAttribute("content");
                    } else if ( metaFromProperty === "og:url"){
                    res.OGURL = await metaEl[idx].getAttribute("content");
                    } 
                }  
                }
                console.log(res);

                

                //  새로운 사이트 등록
                let hyperLinks = await driver.findElements(By.css("a"));
                for (const hl of hyperLinks){
                    const newS = await hl.getAttribute("href");
                    if (newS && newS.startsWith('https:')){
                        try {
                            const urlObj = new URL(newS);                        
                            const newUrl = urlObj.origin;
                            if (!enrollSite.has(newUrl)){
                                console.log(newUrl);
                                enrollSite.add(newUrl);
                                
                                // 여기에서 새로 등록 api 추가
                                await ApiRequest.axiosPost("/site/daemon", {URL : newUrl});
                            }
                        } catch {

                        }                        
                    }
                }

                // 사이트 업데이트
                await ApiRequest.axiosPatch("/site/daemon", res);

            } catch (err) {
                console.log(err);
            } finally {
                await driver.quit(); 
                cnt += 1;
                console.log("진행률 : " + cnt/data.length * 100);
                console.log("시간 경과 : " + parseInt((Date.now() - start)/1000) + " 초");
                // setTimeout(async () => {
                                                
                // }, 1000);           
            }
        })();        

        // 생각보다 오래걸려서 일부분씩 하자
        if (cnt/data.length * 100 > 30){
            break;
        }
        
    }

})();