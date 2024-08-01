console.log("navi");

import { Category } from "./categoryObj.js";

(async function (){
    let cqdsd = new Category();
    Category.categories = await cqdsd.getCategory();
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




// console.log(navigator);
// console.log(window);
// let categories = [];

// function getCategory(){
//     // 카테고리 불러오기
//     let data = axios.get("http://localhost:3000/category")
//     .then((result) => {
//         console.log(result);
//         return result.data;
        
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

// async function setNavigationBox(){
//     categories = await getCategory();

//     let q = document.getElementById("nav_list_box");
    
//     // 세팅
//     for (const d of categories){                
//         q.insertAdjacentHTML("beforeend", `<li><a href="./category.html?key=${d.Name}">${d.NameKR}</a></li>`);
//     }

//     // 카테고리 바 확장
//     document.getElementById("category-open").addEventListener("click", e => {
//         console.log("category-open click");
//         const cate = document.getElementById("category-box-expand");
//         cate.classList.toggle("cover");
//         // if (cate.style.display == "none"){
//         //     cate.style.display = "block";
//         //     cate.style.opacity = 1;
//         //     cate.style.transition = "0.5s";
//         // } else {
//         //     cate.style.opacity = 0;
//         //     cate.style.transition = "0.5s";
//         //     cate.style.display = "none";        
//         // }
//     });

// }

// setNavigationBox();
