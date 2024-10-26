import { Category } from "./categoryObj.js";

(async function (){
    let cqdsd = new Category();
    Category.categories = await cqdsd.getCategory();
    Category.categories = cqdsd.transFormCategoriesLayerStructure(Category.categories);
    cqdsd.setNavigationBox(Category.categories);
    cqdsd.setExpandNavigationBox(Category.categories);

    let curUrl = new URL(document.location.toString());
    let pageKey = curUrl.searchParams.get("key");
    let navList = document.querySelector(`#nav_list_box>li[id="${pageKey}"]`);
    if (navList){
        navList.firstElementChild.classList.add("selected");
        console.log(navList);
    }
    
    // for (const navLiEl of navList){
        
    //     if (navLiEl.innerHTML.includes(pageKey)){
    //         navLiEl.firstElementChild.classList.add("selected");
    //         break;
    //     }
    // }

    // 검색 기능 추가
    const searchForm = document.querySelector("#site-search-form");
    let query = curUrl.searchParams.get("q");
    searchForm.querySelector("input[name=word]").value = query;
    searchForm.addEventListener("submit", async (target)=>{
        target.preventDefault();


        let word = searchForm.querySelector("input[name=word]").value;
        if(!word || word.trim() == ""){
            return;
        }
        word = word.trim();

        window.location.href = `./search.html?q=${encodeURI(word)}`;
    })
    
    

    window.addEventListener("scroll", scrollEvent);
    let navBox = document.querySelector("nav");
    let lastScrollY = 0;
    let maxScrollY = 0;
    const fixLocate = navBox.offsetTop;

    function scrollEvent(event){
        // 전체 크기에서 비율로 계산하자
        const STANDARD = window.innerHeight/6;
        // console.log(window.innerWidth, window.innerHeight);
        // const STANDARD = 30;

        // console.log(navBox.offsetTop);
        console.log(maxScrollY, window.scrollY, maxScrollY - 2 * STANDARD);
        
        if(window.scrollY > fixLocate){
            // console.log(window.scrollY);
            // navBox.classList.add("fixed-nav");
            if(window.scrollY > lastScrollY){
            // 현재 스크롤 위치가 이전 위치보다 클때 (내려가는 중)
                navBox.classList.remove("fixed-nav");                
                maxScrollY = window.scrollY;                
            }else if (window.scrollY < maxScrollY - 2 * STANDARD) {
            // 현재 스크롤 위치가 이전 위치보다 작을때 (올라가는 중)
                navBox.classList.add("fixed-nav");
            }            
        //   header.classList.add("hide")
        //   goTop.classList.add("show")
        }else {
            navBox.classList.remove("fixed-nav");
        //   header.classList.remove("hide")
        //   goTop.classList.remove("show")
        }
        lastScrollY = window.scrollY;                
    }

})();
