import { Site } from "./site.js";

(function(){
    console.log("ai");
    let siteList = [];
    // let q = {
    //     SiteId : "0ed4da2192f14c5598df83542fbf9a76",
    //     Name : "naver",
    //     URL : "https://www.naver.com",
    //     Image : "https://www.naver.com/favicon.ico?1",
    //     Description : "네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요",
    //     Views : "10",
    //     Like : "5",
    //     CreatedDt : new Date(),
    //     UpdatedDt : new Date(),
    // };
    // siteList.push(new Site(q));
    // q = {
    //     SiteId : "0ed4da2192f14c5598df83542fbf9a72",
    //     Name : "ChatGPT&hairsp;",
    //     URL : "https://chatgpt.com/",
    //     Image : "https://cdn.oaistatic.com/_next/static/media/favicon-32x32.be48395e.png",
    //     Description : "A conversational AI system that listens, learns, and challenges",
    //     Views : "10",
    //     Like : "5",
    //     CreatedDt : new Date(),
    //     UpdatedDt : new Date(),
    // };
    // siteList.push(new Site(q));
    // console.log(siteList);
    
    let q = {
        SiteId : "0ed4da2192f14c5598df83542fbf9a76",
        Name : "naver",
        URL : "https://www.naver.com",
        Image : "https://www.naver.com/favicon.ico?1",
        Description : "네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요",
        Views : "10",
        Like : "5",
        CreatedDt : new Date(),
        UpdatedDt : new Date(),
    };
    siteList.push(q);
    q = {
        SiteId : "0ed4da2192f14c5598df83542fbf9a72",
        Name : "ChatGPT&hairsp;",
        URL : "https://chatgpt.com/",
        Image : "https://cdn.oaistatic.com/_next/static/media/favicon-32x32.be48395e.png",
        Description : "A conversational AI system that listens, learns, and challenges",
        Views : "10",
        Like : "5",
        CreatedDt : new Date(),
        UpdatedDt : new Date(),
    };
    siteList.push(q);
    console.log(siteList);

    let ss = document.getElementById("main_content01");
    
    ss.insertAdjacentHTML("beforeend", Site.listToHtml(siteList));

    // document.getElementById("main_content01").innerHTML(Site.listToHtml(siteList));

    let addBtnElList =document.querySelectorAll(".add-my-bookmark");
    addBtnElList.forEach( (v, k) => {
        v.addEventListener("click", ()=>{
            alert(v.dataset.siteid +"즐겨찾기 추가 구현중");
        });
    })
    
    
    

})();