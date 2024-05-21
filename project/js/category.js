import { Site } from "./site.js";

(function(){
    console.log("ai");
    let siteList = [];

    console.log(window.location);
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
                Name : "쿠팡",
                URL : "https://www.coupang.com/",
                Image : "//image7.coupangcdn.com/image/coupang/common/logo_coupang_w350.png",
                Description : "쿠팡은 로켓배송",
                Views : "10",
                Like : "5",
                CreatedDt : new Date(),
                UpdatedDt : new Date(),
            };
            siteList.push(siteInfo);
            siteInfo = {
                SiteId : "0ed4da2192f14c5598df83542fbf9a76",
                Name : "네이버쇼핑",
                URL : "https://shopping.naver.com/",
                Image : "https://shopv.pstatic.net/web/r/20240516174304/_next/static/ico/favicon_shopping.ico",
                Description : "쿠팡은 로켓배송",
                Views : "10",
                Like : "5",
                CreatedDt : new Date(),
                UpdatedDt : new Date(),
            };
            siteList.push(siteInfo);
            siteInfo = {
                SiteId : "0ed4da2192f14c5598df83542fbf9a76",
                Name : "옥션",
                URL : "https://www.auction.co.kr/",
                Image : "//pics.iacstatic.co.kr/common/static/favicon_2011.ico",
                Description : "쇼핑이 생각날 땐, 어서옥션! ALL-KILL 특가! 인터넷 쇼핑몰, 오픈마켓, 의류, 유아용품, 전자제품, 티켓, 도서음반 등 판매.",
                Views : "10",
                Like : "5",
                CreatedDt : new Date(),
                UpdatedDt : new Date(),
            };
            siteList.push(siteInfo);
            siteInfo = {
                SiteId : "0ed4da2192f14c5598df83542fbf9a76",
                Name : "스마트한 쇼핑검색, 다나와! : 가격비교 사이트",
                URL : "https://www.danawa.com",
                Image : "//img.danawa.com/new/danawa_main/v1/img/danawa_favicon.ico",
                Description : "온라인 쇼핑몰, 오픈마켓, 소셜커머스, 백화점, 전문몰 등 전 상품 정보 가격비교 사이트, 비교하면 다나와",
                Views : "10",
                Like : "5",
                CreatedDt : new Date(),
                UpdatedDt : new Date(),
            };
            siteList.push(siteInfo);
            siteInfo = {
                SiteId : "0ed4da2192f14c5598df83542fbf9a76",
                Name : "이마트몰, 당신과 가장 가까운 이마트",
                URL : "https://emart.ssg.com/",
                Image : "//sui.ssgcdn.com/ui/common/img/emart.ico",
                Description : "이마트몰, 당신과 가장 가까운 이마트",
                Views : "10",
                Like : "5",
                CreatedDt : new Date(),
                UpdatedDt : new Date(),
            };
            siteList.push(siteInfo);
            siteList.push(siteInfo);
            siteInfo = {
                SiteId : "0ed4da2192f14c5598df83542fbf9a76",
                Name : "11번가",
                URL : "https://www.11st.co.kr/",
                Image : "//s.011st.com/img/common/icon/favicon.ico",
                Description : "전 국민이 이용하는 대한민국 대표 쇼핑몰 | 오늘주문 내일도착 - 슈팅배송. 편리한 해외쇼핑 - 11번가 아마존. 산지에서 당일발송 - 신선밥상.",
                Views : "10",
                Like : "5",
                CreatedDt : new Date(),
                UpdatedDt : new Date(),
            };
            siteList.push(siteInfo);
            break;
        case "SNS":
            siteInfo = {
                SiteId : "0ed4da2192f14c5598df83542fbf9a76",
                Name : "사람과 세상을 향한 모든 연결의 시작, 카카오톡 | 카카오",
                URL : "https://www.kakaocorp.com/",
                Image : "https://www.kakaocorp.com/page/favicon.ico",
                Description : "#메신저 #오픈채팅 #카카오톡 #플랫폼 ",
                Views : "10",
                Like : "5",
                CreatedDt : new Date(),
                UpdatedDt : new Date(),
            };
            siteList.push(siteInfo);
            break;
        case "job":
            siteInfo = {
                SiteId : "0ed4da2192f14c5598df83542fbf9a76",
                Name : "잡코리아 - NEW JOB, NEW ME JOBKOREA.CO.KR",
                URL : "https://www.jobkorea.co.kr",
                Image : "https://www.jobkorea.co.kr/favicon.ico?202405201400",
                Description : "대한민국 대표 취업플랫폼 잡코리아에서 실시간 채용정보, 맞춤채용추천, 연봉, 기업정보, 합자소 등 취업에 필요한 사이트 정보를 확인하세요.",
                Views : "10",
                Like : "5",
                CreatedDt : new Date(),
                UpdatedDt : new Date(),
            };
            siteList.push(siteInfo);
            break;
        case "programmer":
            siteInfo = {
                SiteId : "0ed4da2192f14c5598df83542fbf9a76",
                Name : "프로그래머스",
                URL : "https://programmers.co.kr/",
                Image : "https://programmers.co.kr/assets/icons/favicon-ec61d910396b5fc4d7418ea44281693172c34e31d437d074f9ab5470523990fb.png",
                Description : "코드 중심의 개발자 채용. 스택 기반의 포지션 매칭. 프로그래머스의 개발자 맞춤형 프로필을 등록하고, 나와 기술 궁합이 잘 맞는 기업들을 매칭 받으세요.",
                Views : "10",
                Like : "5",
                CreatedDt : new Date(),
                UpdatedDt : new Date(),
            };
            siteList.push(siteInfo);
            break;
        case "community":
            siteInfo = {
                SiteId : "0ed4da2192f14c5598df83542fbf9a76",
                Name : "에펨코리아 펨코 - 유머, 축구, 게임, 풋볼매니저",
                URL : "https://www.fmkorea.com/",
                Image : "//image.fmkorea.com/favicon.ico",
                Description : "유머, 축구, 게임, 아프리카TV, 치지직, 풋볼매니저, 에펨, 피파온라인, 피파, 펨코 커뮤니티",
                Views : "10",
                Like : "5",
                CreatedDt : new Date(),
                UpdatedDt : new Date(),
            };
            siteList.push(siteInfo);
            break;
        case "ott":
            siteInfo = {
                SiteId : "0ed4da2192f14c5598df83542fbf9a76",
                Name : "넷플릭스 대한민국 - 인터넷으로 시리즈와 영화를 시청하세요",
                URL : "https://www.netflix.com/",
                Image : "https://assets.nflxext.com/us/ffe/siteui/common/icons/nficon2023.ico",
                Description : "스마트 TV, 태블릿, 스마트폰, PC, 게임 콘솔 등 다양한 디바이스에서 영화와 시리즈를 마음껏 즐기세요.",
                Views : "10",
                Like : "5",
                CreatedDt : new Date(),
                UpdatedDt : new Date(),
            };
            siteList.push(siteInfo);
            break;
        case "music":
            siteInfo = {
                SiteId : "0ed4da2192f14c5598df83542fbf9a76",
                Name : "Melon::음악이 필요한 순간, 멜론",
                URL : "https://www.melon.com/",
                Image : "https://www.melon.com/favicon.ico?2",
                Description : "No.1 뮤직플랫폼 멜론! 최신 트렌드부터 나를 아는 똑똑한 음악추천까지!",
                Views : "10",
                Like : "5",
                CreatedDt : new Date(),
                UpdatedDt : new Date(),
            };
            siteList.push(siteInfo);
            break;            
        case "utility":
            siteInfo = {
                SiteId : "0ed4da2192f14c5598df83542fbf9a76",
                Name : "파파고",
                URL : "https://papago.naver.com",
                Image : "https://papago.naver.com/favicon.ico",
                Description : "똑똑한 AI 번역기 파파고, 언어 장벽 없이 대화하는 세상을 꿈꿉니다.",
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