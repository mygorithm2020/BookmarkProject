//ES6
// import { ApiRequest } from './ApiRequest.js';
// import pkg from "selenium-webdriver";
// const { Builder, By, until, Options } = pkg;

// COMMON JS
const { ApiRequest } = require("./ApiRequest.js");
const { Builder, By, until, Options } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { Site } = require("./Site.js");
// import ('chromedriver');


// 등록 요청 => 배치 작업
// 배치 등록 => 배치 작업
// 기존 사이트들(공개, 보류, 자동 등록 실패, 자동 등록 성공) => 정보 업데이트

// 등록 요청 된 사이트를 조회해서 업데이트하고, 배치 작업 + 데몬 용 사이트 추가

const enrollSite = new Set();
const start = Date.now();
batchRegistedStie();
async function batchRegistedStie(){
    // 웹사이트를 불러와서
    let data = await ApiRequest.axiosGet("/site/daemon");
    // 내가 임의의 사이트를 보내기
    // data = [{URL : "test.com"}]
    //  크롬을 띄워서 해당 사이트 정보 스캔
    if (!data){
        return;
    }
    for (const one of data){
        enrollSite.add(one.URL);
    }

    let cnt = 0;    
    for (const one of data){                
        const res = new Site(one);        
        cnt += 1;
        console.log(`${cnt} : ${one.URL} , ${one.Status}`)
        if (res.Status != 1){
            continue;
        }        

        let tempEnrollSites = new Set();


        await (async function example() {            
            let options = new chrome.Options();
            // options.addArguments('--headless'); // 백그라운드 실행 옵션
            options.windowSize({ width : 800,  height : 450});

            // let driver = await new Builder().forBrowser('chrome').build();
            let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
            // let options = new Options(driver);
            // options.addArguments('--headless'); // Headless 모드            

            try {
                // 창 열리는 만료 시간
                await driver.manage().setTimeouts({
                    implicit: 10000, // 10초
                    pageLoad: 10000, // 30초
                    script: 10000 // 30초
                });
                
                await driver.get(res.URL);                    
                // let page = await driver.getPageSource();
                // 실제 브라우저가 여는데 시간이 필요해서 대기 시간
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
                
                const curUrl = await driver.getCurrentUrl();
                const curUrlObj = new URL(curUrl);                
                res.Status = 6;
                // 등록된 url 과 열리는 창이 다르면 (redirect) 된다면 이미 공개된 경우를 제외하곤 비공개로 전환                
                if (res.URL !== curUrlObj.origin){
                    console.log(`다르다고? : ${curUrlObj.origin}`);
                    res.Status = 4;
                }                

                //  새로운 사이트 등록
                console.log("링크 조회 중");
                let hyperLinks = await driver.findElements(By.css("a"));  
                for (const hl of hyperLinks){                                        
                    try {
                        const newS = await hl.getAttribute("href");
                        if (newS){
                            if (newS.startsWith("//")){
                                newS = "https:" + newS;
                            }

                            if (newS.startsWith('https:')){                            
                                const urlObj = new URL(newS);                        
                                const newUrl = urlObj.origin;
                                const urlReg = newUrl.split(".");
                                // 서브 도메인은 제외하자 너무 잡다한게 많아진다
                                // 길이가 3보다 크면서 서브도메인이
                                
                                if ((urlReg.length >= 3 && !newUrl.includes("//www.")) 
                                    || newUrl.includes("-")
                                    || newUrl.includes("image.")
                                    || newUrl.includes("support")
                                    || newUrl.includes("tistory")
                                    || newUrl.includes("login")
                                    || newUrl.includes("signup") 
                                    || newUrl.includes("test") 
                                    || newUrl.includes("blog")
                                    || newUrl.includes(".go.kr")
                                    || newUrl.includes(".or.kr")){
                                        continue;
                                }
                                if (!enrollSite.has(newUrl) && !tempEnrollSites.has(newUrl)){                                
                                    tempEnrollSites.add(newUrl);
                                    enrollSite.add(newUrl);                                
                                }                      
                            }
                        }
                    } catch (err) {

                    }                    
                }                  

            } catch (err) {
                console.log(err);
                console.log(`${res.URL} 자동등록실패`);
                // 사이트 조회 실패
                if (res.Status !== 2 && res.Status !== 3 && res.Status !== 4){
                    res.Status = 5;
                }
            } finally {
                await driver.quit();                                    
            }
        })();

        // 사이트 업데이트
        console.log(JSON.stringify(res));
        if (res.SiteId){
            await ApiRequest.axiosPatch("/site/daemon", res);                
        }

        if (tempEnrollSites.size > 0){
            console.log("자등등록 중" + tempEnrollSites.size);
            for (const addNewUrl of tempEnrollSites){  
                console.log(addNewUrl);
                // 여기에서 새로 등록 api 추가
                try {
                    ApiRequest.axiosPost("/site/daemon", {URL : addNewUrl, Status : 8});
                } catch (err) {

                }                
            }    
        }

        console.log(`진행률 : ${parseInt(cnt/data.length * 100)}% (${cnt}/${data.length})    ${parseInt((Date.now() - start)/1000)} 초`);        
        // 생각보다 오래걸려서 일부분씩 하자
        if (cnt/data.length * 100 > 99){
            break;
        }        
    }    
}