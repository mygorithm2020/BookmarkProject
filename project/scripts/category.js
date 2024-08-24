import { Bookmark } from "./bookmark.js";
import { Category } from "./categoryObj.js";
import { Site } from "./site.js";

console.log("category");
(function(){

    console.log(window.location);
    // console.log(window.location.search.substring(5));

    // let categoryObj = new Category();
    // setTimeout(() => {
    //     categoryObj.setNavigationBox();        
    //     let targetCategoryId = "";
    //     // 지금 여기에 값이 없음categoryObj.categories
    //     for(const category of categoryObj.categories){
    //         if (category.Name === pageKey || category.NameKR === pageKey){
    //             targetCategoryId = category.CategoryId;
    //             break;
    //         }        
    //     }
        

    //     getSiteByCategory(targetCategoryId, 1);
    // }, 500);

    // setTimeout(() => {     
    //     let targetCategoryId = "";
    //     // 지금 여기에 값이 없음categoryObj.categories
    //     for(const category of Category.categories){
    //         if (category.Name === pageKey || category.NameKR === pageKey){
    //             targetCategoryId = category.CategoryId;
    //             break;
    //         }        
    //     }
        

    //     getSiteByCategory(targetCategoryId, 1);
    // }, 500);

    let curUrl = new URL(document.location.toString());
    console.log(curUrl.pathname);
    let pageKey = curUrl.searchParams.get("key");
    console.log(pageKey);
    
    const asd = document.querySelector("title");
    asd.textContent += ` - ${pageKey}`;

    const siteMapTextEl = document.querySelector(".site-map-text");
    let spinner = document.querySelector(".loading-spinner");
    let numOfInterval = 0;
    let reqCategory = setInterval(async () => {        
        numOfInterval++;
        let targetCategoryId = "";
        if (Category.categories && Category.categories.length > 0){
            for(const category of Category.categories){
                if (category.Name === pageKey || category.NameKR === pageKey){
                    targetCategoryId = category.CategoryId;
                    siteMapTextEl.innerHTML = category.NameKR;   
                    break;
                }        
            }
            
            if (!targetCategoryId){
                clearInterval(reqCategory);
                alert("잘못된 요청 페이지 입니다.");
                window.location.href = "./index.html";
            }

            // getSiteByCategory(targetCategoryId, 1);
            let mainContent01El = document.getElementById("main_content01");
            let sList = await Site.getSiteByCategory(targetCategoryId, 1);
            mainContent01El.insertAdjacentHTML("beforeend", Site.listToHtmlTemp(sList));
            // 카드 이벤트 효과 추가
            Site.cardEvent();
            
            
            spinner.classList.toggle("cover");
            clearInterval(reqCategory);
        };  

        // 적당히 하다 안되면 그만
        if (numOfInterval > 10){
            spinner.classList.toggle("cover");
            clearInterval(reqCategory);
        }
        
    }, 400);

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