import { Bookmark } from "./bookmark.js";
import { Site } from "./site.js";

console.log("category");
(function(){
    console.log("ai");
    let siteList = [];

    console.log(window.location);
    // console.log(window.location.search.substring(5));

    
    const pageKey = window.location.search.substring(5);
    
    const asd = document.querySelector("title");
    asd.textContent += ` - ${pageKey}`;

    
    const siteMapTextEl = document.querySelector(".site-map-text");


    let siteInfo = null;
    switch(pageKey){
        case "ai":
            siteMapTextEl.innerHTML = "인공지능 AI";
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
            siteMapTextEl.innerHTML = "쇼핑";
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
            siteMapTextEl.innerHTML = "소셜미디어";

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
            siteInfo = {
                SiteId : "0ed4da2192f14c5598df83542fbf9a76",
                Name : "Facebook",
                URL : "https://www.facebook.com/",
                Image : "https://www.facebook.com/images/fb_icon_325x325.png", //
                Description : "Facebook에 로그인하세요. 친구, 가족, 지인들과 함께 하는 즐거운 Facebook 생활이 시작됩니다.",
                Views : "10",
                Like : "5",
                CreatedDt : new Date(),
                UpdatedDt : new Date(),
            };
            siteList.push(siteInfo);
            siteInfo = {
                SiteId : "0ed4da2192f14c5598df83542fbf9a76",
                Name : "WhatsApp | 안전하며 신뢰할 수 있는 무료 개인 메시지 및 전화",
                URL : "https://www.whatsapp.com/",
                Image : "https://static.whatsapp.net/rsrc.php/v3/yz/r/ujTY9i_Jhs1.png", //
                Description : "WhatsApp Messenger로 친구 및 가족과 계속 연락을 주고받으세요. 무료로 제공되는 WhatsApp을 이용하면 전 세계에서 전화로 쉽고 안전하며 신뢰할 수 있는 방식으로 메시지를 주고받고 전화를 할 수 있습니다.",
                Views : "10",
                Like : "5",
                CreatedDt : new Date(),
                UpdatedDt : new Date(),
            };
            siteList.push(siteInfo);
            siteInfo = {
                SiteId : "0ed4da2192f14c5598df83542fbf9a76",
                Name : "Instagram",
                URL : "https://www.instagram.com/",
                Image : "https://static.cdninstagram.com/rsrc.php/v3/yI/r/VsNE-OHk_8a.png", //
                Description : "계정을 만들거나 Instagram에 로그인하여 나를 이해하는 사람들과 회원님의 관심사를 공유해보세요.",
                Views : "10",
                Like : "5",
                CreatedDt : new Date(),
                UpdatedDt : new Date(),
            };
            siteList.push(siteInfo);
            siteInfo = {
                SiteId : "0ed4da2192f14c5598df83542fbf9a76",
                Name : "TikTok - 트렌드의 시작, 틱톡",
                URL : "https://www.tiktok.com/",
                Image : "https://www.tiktok.com/favicon.ico", //
                Description : "트렌드가 시작되는 동영상 엔터테인먼트 플랫폼 틱톡을 남들과는 다르게, 나만의 방식으로 재밌게 즐겨보세요.",
                Views : "10",
                Like : "5",
                CreatedDt : new Date(),
                UpdatedDt : new Date(),
            };
            siteList.push(siteInfo);
            break;
        case "job":
            siteMapTextEl.innerHTML = "일자리";

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
            siteInfo = {
                SiteId : "0ed4da2192f14c5598df83542fbf9a76",
                Name : "땡큐 베리 매치 사람인 | 취업, 채용, 커리어 매칭 플랫폼",
                URL : "https://www.saramin.co.kr/",
                Image : "https://www.saramin.co.kr/favicon.ico?ver=3",
                Description : "나에게 딱 맞는 커리어만 매치! 사람인에서 새로운 기회를 제안 받고 기업정보, 연봉정보, 면접후기 등 취업, 채용에 꼭 필요한 정보를 확인해보세요.",
                Views : "10",
                Like : "5",
                CreatedDt : new Date(),
                UpdatedDt : new Date(),
            };
            siteList.push(siteInfo);
            siteInfo = {
                SiteId : "0ed4da2192f14c5598df83542fbf9a76",
                Name : "모든 생애 모든 알바 알바천국",
                URL : "https://www.alba.co.kr/",
                Image : "https://image.alba.kr/icon/bi_800.png",
                Description : "알바 채용, 아르바이트, 지역별, 직종별, 주말, 단기, 청소년, 대학생, 알바스토리, 최저시급, 근로계약서 작성 안내",
                Views : "10",
                Like : "5",
                CreatedDt : new Date(),
                UpdatedDt : new Date(),
            };
            siteList.push(siteInfo);
            siteInfo = {
                SiteId : "0ed4da2192f14c5598df83542fbf9a76",
                Name : "워크넷 - 구인/구직",
                URL : "https://www.work.go.kr/",
                Image : "https://www.work.go.kr/images/common/ico/w_favicon.ico",
                Description : "",
                Views : "10",
                Like : "5",
                CreatedDt : new Date(),
                UpdatedDt : new Date(),
            };
            siteList.push(siteInfo);
            siteInfo = {
                SiteId : "0ed4da2192f14c5598df83542fbf9a76",
                Name : "국민 대표 일자리 앱! 벼룩시장",
                URL : "https://www.findjob.co.kr/",
                Image : "http://image.findall.co.kr/FAImage/findjob/banner/banner-findjob-story-w.png",
                Description : "누구나 좋아하는 브랜드 일자리부터 AI 추천일자리까지, 벼룩시장에서 만나보세요!",
                Views : "10",
                Like : "5",
                CreatedDt : new Date(),
                UpdatedDt : new Date(),
            };
            siteList.push(siteInfo);
            siteInfo = {
                SiteId : "0ed4da2192f14c5598df83542fbf9a76",
                Name : "알바를 리스펙 알바몬",
                URL : "https://www.albamon.com/",
                Image : "https://contents.albamon.kr/monimg/msa/images/sns_img/og_23-08-01_alba_respect.png",
                Description : "알바 정보부터 알바 채용까지, 알바 취업포털 알바몬",
                Views : "10",
                Like : "5",
                CreatedDt : new Date(),
                UpdatedDt : new Date(),
            };
            siteList.push(siteInfo);
            break;
        case "programmer":
            siteMapTextEl.innerHTML = "개발";
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
            siteInfo = {
                SiteId : "0ed4da2192f14c5598df83542fbf9a76",
                Name : "Baekjoon Online Judge",
                URL : "https://www.acmicpc.net/",
                Image : "https://onlinejudgeimages.s3-ap-northeast-1.amazonaws.com/images/boj-og.png",
                Description : "",
                Views : "10",
                Like : "5",
                CreatedDt : new Date(),
                UpdatedDt : new Date(),
            };
            siteList.push(siteInfo);
            siteInfo = {
                SiteId : "0ed4da2192f14c5598df83542fbf9a76",
                Name : "클라우드 컴퓨팅 서비스 | Google Cloud",
                URL : "https://cloud.google.com/",
                Image : "https://www.gstatic.com/devrel-devsite/prod/v0d244f667a3683225cca86d0ecf9b9b81b1e734e55a030bdcd3f3094b835c987/cloud/images/favicons/onecloud/favicon.ico",
                Description : "데이터 관리, 하이브리드 및 멀티 클라우드, AI와 머신러닝 등 Google의 클라우드 컴퓨팅 서비스로 비즈니스 당면 과제를 해결하세요.",
                Views : "10",
                Like : "5",
                CreatedDt : new Date(),
                UpdatedDt : new Date(),
            };
            siteList.push(siteInfo);
            break;
        case "community":
            siteMapTextEl.innerHTML = "커뮤니티";
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
            siteInfo = {
                SiteId : "0ed4da2192f14c5598df83542fbf9a76",
                Name : "## CONNECTING HEARTS! 디시인사이드입니다. ## ",
                URL : "https://www.dcinside.com/",
                Image : "https://nstatic.dcinside.com/dc/w/images/logo_icon.ico",
                Description : "국내 최대 인터넷 커뮤니티 포털이자 인터넷 트렌드의 중심, 디시인사이드입니다. 실시간 베스트 등의 갤러리 커뮤니티 서비스를 제공합니다.",
                Views : "10",
                Like : "5",
                CreatedDt : new Date(),
                UpdatedDt : new Date(),
            };
            siteList.push(siteInfo);
            siteInfo = {
                SiteId : "0ed4da2192f14c5598df83542fbf9a76",
                Name : "뽐뿌 - 사람이 좋아 함께하는 곳",
                URL : "https://ppomppu.co.kr/",
                Image : "https://www.ppomppu.co.kr/images/icon_app_20160427.png",
                Description : "쇼핑몰핫딜, 쿠폰 및 이벤트, 사용기, 휴대폰 등 쇼핑 정보 제공",
                Views : "10",
                Like : "5",
                CreatedDt : new Date(),
                UpdatedDt : new Date(),
            };
            siteList.push(siteInfo);
            siteInfo = {
                SiteId : "0ed4da2192f14c5598df83542fbf9a76",
                Name : "보배드림 - 중고차 플랫폼, 수입차, 수입중고차 및 중고차시세, 내차시세 제공",
                URL : "https://bobaedream.co.kr/",
                Image : "http://image.bobaedream.co.kr/renew2017/assets/images/bobae.png",
                Description : "중고차, 커뮤니티, 수입차, 외제차, 수입중고차, 스포츠카, 튜닝카 전문 중고차쇼핑몰. 중고자동차, 슈퍼카, 올드카, 캠핑카 화물차, 특장차, 픽업트럭 매매 및 판매, 중고차시세 제공, 국내 최대 자동차 커뮤니티",
                Views : "10",
                Like : "5",
                CreatedDt : new Date(),
                UpdatedDt : new Date(),
            };
            siteList.push(siteInfo);
            break;
        case "ott":
            siteMapTextEl.innerHTML = "OTT";
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
            siteInfo = {
                SiteId : "0ed4da2192f14c5598df83542fbf9a76",
                Name : "TVING",
                URL : "https://www.tving.com/",
                Image : "https://www.tving.com/img/tving_logo_meta_new.png",
                Description : "티빙 오리지널부터 드라마, 예능, 영화, 해외시리즈까지! 무제한으로 스트리밍해 보세요.",
                Views : "10",
                Like : "5",
                CreatedDt : new Date(),
                UpdatedDt : new Date(),
            };
            siteList.push(siteInfo);
            siteInfo = {
                SiteId : "0ed4da2192f14c5598df83542fbf9a76",
                Name : "쿠팡플레이 - 와우회원은 무료!",
                URL : "https://www.coupangplay.com/",
                Image : "https://assets.coupangplay.com/images/og-meta-img.png",
                Description : "",
                Views : "10",
                Like : "5",
                CreatedDt : new Date(),
                UpdatedDt : new Date(),
            };
            siteList.push(siteInfo);
            siteInfo = {
                SiteId : "0ed4da2192f14c5598df83542fbf9a76",
                Name : "Wavve(웨이브)",
                URL : "https://www.wavve.com/",
                Image : "http://img.wavve.com/service30/profile/wavve2022.png",
                Description : "세상 얕은 콘텐츠부터 세상 딥한 콘텐츠까지 JUST DIVE! Wavve",
                Views : "10",
                Like : "5",
                CreatedDt : new Date(),
                UpdatedDt : new Date(),
            };
            siteList.push(siteInfo);
            siteInfo = {
                SiteId : "0ed4da2192f14c5598df83542fbf9a76",
                Name : "왓챠",
                URL : "https://watcha.com/",
                Image : "https://do6ll9a75gxk6.cloudfront.net/images/og.af1d8fcdd63eafb6a46f.png",
                Description : "모든 영화, 드라마, 다큐멘터리, 애니메이션을 언제 어디서나 최고의 화질로 무제한 감상하세요.",
                Views : "10",
                Like : "5",
                CreatedDt : new Date(),
                UpdatedDt : new Date(),
            };
            siteList.push(siteInfo);
            siteInfo = {
                SiteId : "0ed4da2192f14c5598df83542fbf9a76",
                Name : "새로운 감동과 가능성을 발견해 보세요 우리가 좋아하는 모든 이야기, 지금 스트리밍 중",
                URL : "https://www.disneyplus.com",
                Image : "https://static-assets.bamgrid.com/product/disneyplus/images/share-default.8bf3102623e935e7bc126df36b956b98.jpg",
                Description : "디즈니, 픽사, 마블, 스타워즈, 내셔널지오그래픽, Star를 다 함께 즐길 수 있는 곳. 인기 영화, 고전 작품, 시리즈, 오리지널을 모두 한자리에서 만나보세요.",
                Views : "10",
                Like : "5",
                CreatedDt : new Date(),
                UpdatedDt : new Date(),
            };
            siteList.push(siteInfo);
            break;
        case "music":
            siteMapTextEl.innerHTML = "음악";
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
            siteInfo = {
                SiteId : "0ed4da2192f14c5598df83542fbf9a76",
                Name : "NAVER VIBE(바이브)",
                URL : "https://vibe.naver.com/",
                Image : "https://music-phinf.pstatic.net/20201019_118/16031004163365Jexk_JPEG/about.jpg",
                Description : "좋아하는 음악은 물론, 좋아할 음악까지 들려주는 취향 저격 뮤직 서비스",
                Views : "10",
                Like : "5",
                CreatedDt : new Date(),
                UpdatedDt : new Date(),
            };
            siteList.push(siteInfo);
            siteInfo = {
                SiteId : "0ed4da2192f14c5598df83542fbf9a76",
                Name : "벅스",
                URL : "https://music.bugs.co.kr/",
                Image : "https://file.bugsm.co.kr/bdesign/sns/1200x630_bugs.png",
                Description : "나를 위한 플리, 벅스! 마음을 담은 노래추천 플레이리스트, 그리고 일상을 감성으로 가득 채워줄 essential player까지",
                Views : "10",
                Like : "5",
                CreatedDt : new Date(),
                UpdatedDt : new Date(),
            };
            siteList.push(siteInfo);
            siteInfo = {
                SiteId : "0ed4da2192f14c5598df83542fbf9a76",
                Name : "소리바다",
                URL : "https://www.soribada.com/",
                Image : "http://image.soribada.com/image/main/icon_logo.png",
                Description : "Share The Rhythm",
                Views : "10",
                Like : "5",
                CreatedDt : new Date(),
                UpdatedDt : new Date(),
            };
            siteList.push(siteInfo);
            siteInfo = {
                SiteId : "0ed4da2192f14c5598df83542fbf9a76",
                Name : "지니 : 음악, 그리고 설레임",
                URL : "https://www.genie.co.kr/",
                Image : "https://www.genie.co.kr/resources/favicon_32.ico?v=202404231400",
                Description : "가격은 가볍게, 추천은 확실하게! 최저가로 즐기는 프리미어 사운드! 국내 최초 실시간 TOP 200 차트",
                Views : "10",
                Like : "5",
                CreatedDt : new Date(),
                UpdatedDt : new Date(),
            };
            siteList.push(siteInfo);
            break;            
        case "utility":
            siteMapTextEl.innerHTML = "유틸리티";
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
            siteMapTextEl.innerHTML = "기타";
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

    // 기존에 등록된 장바구니 목록 확인
    
    // const itemString = localStorage.getItem(MyBookmark.SESSION_KEY);
    // let items = [];
    // if (itemString){
    //     items = JSON.parse(itemString);
    // } 
    
    // console.log(items);

    let addBtnElList =document.querySelectorAll(".add-my-bookmark");
    addBtnElList.forEach( (v, k) => {
        v.addEventListener("click", ()=>{            

            // 로그인 상태라면
            if (false){

            } else{
                for (let idx = 0; siteList.length; idx++){
                    if (siteList[idx].URL === v.dataset.siteurl){
                        const res = Bookmark.addMyBookmark(
                            siteList[idx].SiteId,
                            siteList[idx].Name, 
                            siteList[idx].URL, 
                            siteList[idx].Image, 
                            siteList[idx].Description, 
                            siteList[idx].Views);
                        console.log(v.dataset.siteurl);
                        if (res){
                            alert("즐겨찾기에 추가");
                        }else{
                            alert("이미 존재");
                        }
                        break;
                    }
                }                                
            }
        });
    });

    //  바로 네비게이션 아래로 스크롤 되는 내용 추가, 아니면 헤더 높이좀 줄여라 굳이 저렇게 넓게 차지할 필요가 있나..
})();
