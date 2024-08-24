
import { Site } from "./site.js";
import { Category } from "./categoryObj.js";

let curUrl = new URL(document.location.toString());
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
let spinner = document.querySelector(".loading-spinner");            

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
        location.href = "?key=category";
        // mainContent01El.insertAdjacentHTML("beforeend", "관리자 페이지에 오신걸 환영합니다.");
}


async function setCategoryPage(){

    addBox.insertAdjacentHTML("beforeend",`
        <input type="text" placeholder="travel" name="name" required>
        <input type="text" placeholder="여행" name="nameKR" required>
        <button id="add-category">메인(최상위) 카테고리 추가</button>        
        `);
        
    let addSiteBtn = document.getElementById("add-category");
    addSiteBtn.addEventListener("click", async (target) => {
        target.preventDefault();
        spinner.classList.toggle("cover");
        addSiteBtn.disabled = true;
        const category = new Category();
        category.Name = addBox.querySelector("input[name='name']").value;
        category.NameKR = addBox.querySelector("input[name='nameKR']").value;
        
        if (!category.Name){
            alert("이름을 입력해주세요");
            spinner.classList.toggle("cover");
            addSiteBtn.disabled = false;
            return;
        }
        let res = await category.addCategoryAdmin(category);
        // console.log(res);
        if (res.CategoryId){
            location.reload();
        }
        spinner.classList.toggle("cover");
        addSiteBtn.disabled = false;
    });


    let cqdsd = new Category();
    Category.categories = await cqdsd.getCategoryAdmin();
    Category.categories.sort(function(a, b){
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
    mainContent01El.insertAdjacentHTML("beforeend", cqdsd.listToHtmlForAdmin(cqdsd.transFormCategories(Category.categories)));
    spinner.classList.toggle("cover");
}

{/* <label for="username">Username:</label> 
  <input type="text" id="username" name="username" required> 
  <button type="submit">Submit</button>  */}

async function setSitePage(){

    addBox.insertAdjacentHTML("beforeend",`
        <form>
            <label>사이트 url    </label> 
            <input type="text" placeholder="www.bookmark.com"/>
            <button id="add-site" type="submit">신규 사이트 등록</button>            
        </form>
        `);
    

    mainContent01El.insertAdjacentHTML("beforeend", 
        `<div id="search-box">
            <label>이름 또는 URL 검색</label>
            <input type="text" placeholder="bookmark" required>                               
        </div>
        <div>
            <button id="change-sequence">변경 오래된 순</button>
        </div>`
    );

    // 카테고리 표시
    let cqdsd = new Category();
    Category.categories = await cqdsd.getCategoryAdmin();
    // mainContent01El.insertAdjacentHTML("beforeend", cqdsd.listToHtmlForAdminSummary(Category.categories));
    // cqdsd.setNavigationBox(Category.categories);

    let sites = await Site.getAllSitesAdmin();
    //  HTML에 추가
    mainContent01El.insertAdjacentHTML("beforeend", Site.listToHtmlForAdmin(sites));            
    // 카드 이벤트 효과 추가

    // 사이트 등록 기능 추가
    let addSiteBtn = document.getElementById("add-site");
    addSiteBtn.addEventListener("click", async (target) => {
        target.preventDefault();
        spinner.classList.toggle("cover");
        addSiteBtn.disabled = true;
        let siteUrl = addBox.querySelector("input");
        if (!siteUrl.value){
            alert("url을 입력해주세요");
            spinner.classList.toggle("cover");
            addSiteBtn.disabled = false;
            return;            
        }
        const site = new Site();
        site.URL = siteUrl.value;
        let res = await Site.addSiteAdmin(site);
        
        if (res.SiteId){
            alert("사이트가 새로 등록되었습니다.");
            location.reload();
        }else if (res.errCode){
            if (res.errCode === 22){
                alert("이미 등록된 사이트 입니다.");
            } else if (res.errCode === 32){
                alert("입력한 url이 정확한지 확인 후 다시 시도해주세요. 같은 문제가 계속 발생하면 관리자에게 따로 문의 부탁드립니다.");

            } else{
                alert("오류가 발생했습니다. 잠시 후 다시 시도해주세요!");
            }
        }
        spinner.classList.toggle("cover");
        addSiteBtn.disabled = false;
    });

    // 검색 기능 추가
    let searchEl = document.querySelector("#search-box > input");
    searchEl.addEventListener("input", ()=> {
        
        let filterdSites = [];
        if (!searchEl.value){
            filterdSites = sites;
        } else{
            const searchValue = searchEl.value.toLowerCase()
            for(const oneSite of sites){
                if ((oneSite.URL && oneSite.URL.includes(searchValue)) || 
                (oneSite.Name &&  oneSite.Name.includes(searchValue)) || 
                (oneSite.NameKR && oneSite.NameKR.includes(searchValue))){
                    filterdSites.push(oneSite);
                }
            }
        }
        let siteList = mainContent01El.querySelector("#site-card-box");
        if (siteList){
            siteList.remove();
        }        
        mainContent01El.insertAdjacentHTML("beforeend", Site.listToHtmlForAdmin(filterdSites));
    });

    // 정렬기준 변경기능
    const changeEl = document.getElementById("change-sequence");
    changeEl.addEventListener("click", ()=> {
        if (changeEl.textContent === "변경 오래된 순"){
            changeEl.textContent = "최근 등록 순";
            sites.sort(function(a, b){
                if (a.UpdatedDate > b.UpdatedDate){
                    return 1;
                }
                if (a.UpdatedDate === b.UpdatedDate){
                    return 0;
                }
                if (a.UpdatedDate < b.UpdatedDate){
                    return -1;        
                }
            });
            
        } else {
            changeEl.textContent = "변경 오래된 순";
            sites.sort(function(a, b){
                if (a.CreatedDate < b.CreatedDate){
                    return 1;
                }
                if (a.CreatedDate === b.CreatedDate){
                    return 0;
                }
                if (a.CreatedDate > b.CreatedDate){
                    return -1;        
                }
            });            
        }
        let siteList = mainContent01El.querySelector("#site-card-box");
        if (siteList){
            siteList.remove();
        }
        searchEl.value = "";
        mainContent01El.insertAdjacentHTML("beforeend", Site.listToHtmlForAdmin(sites));
    })
    

    spinner.classList.toggle("cover");
}

function setMemberPage(){

    spinner.classList.toggle("cover");
}


