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
    

    let reqCategory = setInterval(async () => {        
        console.log(Category.categories);
        let targetCategoryId = "";
        if (Category.categories && Category.categories.length > 0){
            for(const category of Category.categories){
                if (category.Name === pageKey || category.NameKR === pageKey){
                    targetCategoryId = category.CategoryId;
                    siteMapTextEl.innerHTML = category.NameKR;   
                    break;
                }        
            }                        

            // getSiteByCategory(targetCategoryId, 1);
            let mainContent01El = document.getElementById("main_content01");
            let sList = await Site.getSiteByCategory(targetCategoryId, 1);
            mainContent01El.insertAdjacentHTML("beforeend", Site.listToHtmlv2(sList));
            // 카드 이벤트 효과 추가
            Site.cardEvent();
            
            let spinner = document.querySelector(".loading-spinner");
            console.log(spinner);
            spinner.classList.toggle("cover");
            clearInterval(reqCategory);
        };  
        
    }, 200);

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

// async function getSiteByCategory(categoryId, page){
//     console.log(`categoryId : ${categoryId}`);
//     let data = await axios.get(`http://localhost:3000/site/category?id=62fe83ca0943461e9e28491ee6260965&page=1`)
//     .then((result) => {
//         console.log(result);
//         let ss = document.getElementById("main_content01");
//         ss.insertAdjacentHTML("beforeend", Site.listToHtmlv2(result.data));
//         // return result.data;

//     })
//     .catch((error) => {
//         console.error(error);
//         if (error.code === "ERR_NETWORK"){
//             // 현재 이용 불가능한 무언가 띄우기...
//             // alert("현재 서버 점검 중으로 이용할 수 없습니다.")
//             document.querySelector("main").innerHTML = "<h2 id='server_check'>현재 서버 점검 중으로 이용할 수 없습니다.</h2>";

//         }
//         return null;
//     });
    
//     return data;
// }