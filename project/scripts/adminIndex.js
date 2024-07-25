
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
let addBox = document.getElementById("add-box");

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

    addBox.insertAdjacentHTML("beforeend",`
        <input type="url" placeholder="www.bookmark.com" required>
        <button id="add-site">신규 사이트 등록</button>
        `);
    let addSiteBtn = document.getElementById("add-site");
    addSiteBtn.addEventListener("click", async () => {
        let siteUrl = addBox.querySelector("input");
        if (!siteUrl.value){
            alert("url을 입력해주세요");
        }
        const site = new Site();
        site.URL = siteUrl.value;
        let res = await Site.addSiteAdmin(site);
        console.log(res);
        if (res.SiteId){
            alert("사이트가 새로 등록되었습니다.");
        }else if (res.errCode){
            if (res.errCode === 22){
                alert("이미 등록된 사이트 입니다.");
            }else{
                alert("오류가 발생했습니다. 잠시 후 다시 시도해주세요!");
            }

        }
    });
    


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


