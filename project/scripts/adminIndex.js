
import { Site } from "./site.js";
import { Category } from "./categoryObj.js";

console.log("open index");

let curUrl = new URL(document.location.toString());
console.log(curUrl.pathname);
let pageKey = curUrl.searchParams.get("key");

let navList = document.querySelectorAll("#nav_list_box li")
for (const navLiEl of navList){
    if (navLiEl.innerHTML.includes(pageKey)){
        navLiEl.classList.add("selected");
        break;
    }
}
let mainContent01El = document.getElementById("main_content01");

switch(pageKey){
    case "category":
        setCategoryPage();
        break;
    case "site":
        setSitePage();
        break;
    case "member":
        setMemberPage();
        break;
    default:
        // mainContent01El.insertAdjacentHTML("beforeend", "관리자 페이지에 오신걸 환영합니다.");
}


async function setCategoryPage(){
    console.log("category");
    let cqdsd = new Category();
    Category.categories = (await cqdsd.getCategoryAdmin());
    Category.categories.sort(function(a, b){
        console.log(a.Status, b.Status);
        if (a.Status < b.Status){
            return 1;
        }
        if (a.Status === b.Status){
            return 0;
        }
        if (a.Status > b.Status){
            return -1;

        }
    });
    console.log(Category.categories);
    mainContent01El.insertAdjacentHTML("beforeend", cqdsd.listToHtmlForAdmin(cqdsd.transFormCategories(Category.categories)));
}

async function setSitePage(){
    // 카테고리 표시
    let cqdsd = new Category();
    Category.categories = await cqdsd.getCategoryAdmin();
    mainContent01El.insertAdjacentHTML("beforeend", cqdsd.listToHtmlForAdminSummary(Category.categories));
    // cqdsd.setNavigationBox(Category.categories);

    let sites = await Site.getAllSitesAdmin();
    //  HTML에 추가
    mainContent01El.insertAdjacentHTML("beforeend", Site.listToHtmlForAdmin(sites));            
    // 카드 이벤트 효과 추가
}

function setMemberPage(){

}


