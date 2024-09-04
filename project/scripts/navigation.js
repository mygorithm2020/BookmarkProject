console.log("navi");

import { Category } from "./categoryObj.js";

(async function (){
    let cqdsd = new Category();
    Category.categories = await cqdsd.getCategory();
    Category.categories = cqdsd.transFormCategoriesLayerStructure(Category.categories);
    cqdsd.setNavigationBox(Category.categories);
    cqdsd.setExpandNavigationBox(Category.categories);

    let curUrl = new URL(document.location.toString());
    console.log(curUrl.pathname);
    let pageKey = curUrl.searchParams.get("key");
    let navList = document.querySelectorAll("#nav_list_box li");
    for (const navLiEl of navList){
        if (navLiEl.innerHTML.includes(pageKey)){
            navLiEl.classList.add("selected");
            break;
        }
    }
    

    window.addEventListener("scroll", scrollEvent);
    let navBox = document.querySelector("nav");
    let lastScrollY = 0;

    function scrollEvent(event){
        // 전체 크기에서 비율로 계산하자
        const STANDARD = window.innerHeight/6;
        console.log(window.innerWidth, window.innerHeight);
        // const STANDARD = 30;
        
        if(window.scrollY > STANDARD){
            if(window.scrollY > lastScrollY){
            // 현재 스크롤 위치가 이전 위치보다 클때 (내려가는 중)
                navBox.classList.remove("fixed-nav");
            }else {
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
