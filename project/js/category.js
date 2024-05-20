import { Site } from "./site.js";

(function(){
    console.log("ai");
    let siteList = [];

    console.log(window.location.search);
    console.log(window.location.search.substring(5));

    
    const pageKey = window.location.search.substring(5);
    
    const asd = document.querySelector("title");
    asd.textContent += ` - ${pageKey}`;
    


    let siteInfo = null;
    switch(pageKey){
        case "ai":
            siteInfo = {
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
            siteList.push(siteInfo);
            siteInfo = {
                SiteId : "0ed4da2192f14c5598df83542fbf9a76",
                Name : "AI 이미지 업스케일러",
                URL : "https://www.upscale.media/ko",
                Image : "https://cdn.pixelbin.io/v2/dummy-cloudname/original/upscalemedia_assets/logo/favicon.png?f_auto=true",
                Description : "AI 도구를 사용하여 텍스처 또는 세부 사항을 손실 없이 이미지를 2배 또는 4배로 업스케일하세요. 화려한 시각 효과를 위한 최고의 AI 이미지 업스케일러. 지금 Upscale.media를 사용해보세요!",
                Views : "10",
                Like : "5",
                CreatedDt : new Date(),
                UpdatedDt : new Date(),
            };
            siteList.push(siteInfo);
            siteInfo = {
                SiteId : "0ed4da2192f14c5598df83542fbf9a76",
                Name : "Adobe Podcast",
                URL : "https://podcast.adobe.com/",
                Image : "https://podcast.adobe.com/favicon.ico",
                Description : "Next generation audio from Adobe is here. Record, transcribe, edit, share. Crisp and clear, every time.",
                Views : "10",
                Like : "5",
                CreatedDt : new Date(),
                UpdatedDt : new Date(),
            };
            siteList.push(siteInfo);
            siteInfo = {
                SiteId : "0ed4da2192f14c5598df83542fbf9a76",
                Name : "canva",
                URL : "https://www.canva.com/ko_kr/",
                Image : "https://static.canva.com/static/images/favicon-1.ico",
                Description : "Canva는 무료로 제공되는 온라인 그래픽 디자인 도구입니다. Canva를 이용하여 소셜 미디어 게시물, 프레젠테이션, 포스터, 동영상, 로고 등을 간편하게 제작해 보세요.",
                Views : "10",
                Like : "5",
                CreatedDt : new Date(),
                UpdatedDt : new Date(),
            };
            siteList.push(siteInfo);
            siteInfo = {
                SiteId : "0ed4da2192f14c5598df83542fbf9a76",
                Name : "뤼튼",
                URL : "https://wrtn.ai/",
                Image : "https://wrtn.ai/images/favicon.ico",
                Description : "당신의 첫 AI 에이전트 뤼튼. AI 검색부터 나만의 AI 캐릭터까지, AI의 끝없는 가능성을 탐험해 보세요.",
                Views : "10",
                Like : "5",
                CreatedDt : new Date(),
                UpdatedDt : new Date(),
            };
            siteList.push(siteInfo);
            siteInfo = {
                SiteId : "0ed4da2192f14c5598df83542fbf9a76",
                Name : "Playground AI",
                URL : "https://playground.com/",
                Image : "https://playground.com/favicon.ico",
                Description : "Playground (official site) is a free-to-use online AI image creator. Use it to create art, social media posts, presentations, posters, videos, logos and more.",
                Views : "10",
                Like : "5",
                CreatedDt : new Date(),
                UpdatedDt : new Date(),
            };
            siteList.push(siteInfo);
            siteInfo = {
                SiteId : "0ed4da2192f14c5598df83542fbf9a76",
                Name : "Leonardo.Ai",
                URL : "https://app.leonardo.ai/auth/login?callbackUrl=%2F",
                Image : "https://app.leonardo.ai/favicon.ico",
                Description : "Create production-quality visual assets for your projects with unprecedented quality, speed and style-consistency.",
                Views : "10",
                Like : "5",
                CreatedDt : new Date(),
                UpdatedDt : new Date(),
            };
            siteList.push(siteInfo);
            break;
                        
        case "shopping":
            siteInfo = {
                SiteId : "0ed4da2192f14c5598df83542fbf9a76",
                Name : "AI 이미지 업스케일러",
                URL : "https://www.upscale.media/ko",
                Image : "https://cdn.pixelbin.io/v2/dummy-cloudname/original/upscalemedia_assets/logo/favicon.png?f_auto=true",
                Description : "AI 도구를 사용하여 텍스처 또는 세부 사항을 손실 없이 이미지를 2배 또는 4배로 업스케일하세요. 화려한 시각 효과를 위한 최고의 AI 이미지 업스케일러. 지금 Upscale.media를 사용해보세요!",
                Views : "10",
                Like : "5",
                CreatedDt : new Date(),
                UpdatedDt : new Date(),
            };
            siteList.push(siteInfo);
            break;
        case "shopping":
            siteInfo = {
                SiteId : "0ed4da2192f14c5598df83542fbf9a76",
                Name : "coupang",
                URL : "https://www.naver.com",
                Image : "https://www.naver.com/favicon.ico?1",
                Description : "네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요",
                Views : "10",
                Like : "5",
                CreatedDt : new Date(),
                UpdatedDt : new Date(),
            };
            siteList.push(siteInfo);
            break;
        case "shopping":
            siteInfo = {
                SiteId : "0ed4da2192f14c5598df83542fbf9a76",
                Name : "coupang",
                URL : "https://www.naver.com",
                Image : "https://www.naver.com/favicon.ico?1",
                Description : "네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요",
                Views : "10",
                Like : "5",
                CreatedDt : new Date(),
                UpdatedDt : new Date(),
            };
            siteList.push(siteInfo);
            break;
        case "shopping":
            siteInfo = {
                SiteId : "0ed4da2192f14c5598df83542fbf9a76",
                Name : "coupang",
                URL : "https://www.naver.com",
                Image : "https://www.naver.com/favicon.ico?1",
                Description : "네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요",
                Views : "10",
                Like : "5",
                CreatedDt : new Date(),
                UpdatedDt : new Date(),
            };
            siteList.push(siteInfo);
            break;
        case "shopping":
            siteInfo = {
                SiteId : "0ed4da2192f14c5598df83542fbf9a76",
                Name : "coupang",
                URL : "https://www.naver.com",
                Image : "https://www.naver.com/favicon.ico?1",
                Description : "네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요",
                Views : "10",
                Like : "5",
                CreatedDt : new Date(),
                UpdatedDt : new Date(),
            };
            siteList.push(siteInfo);
            break;
        default:
            siteInfo = {
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
            siteList.push(siteInfo);
            siteInfo = {
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
            siteList.push(siteInfo);

    }
        
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