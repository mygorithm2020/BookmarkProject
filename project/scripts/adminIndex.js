
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


const selectedStatus = [false, false, false, false, false, false, false, false];

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
        if (res && res.CategoryId){
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
    
    const updateDesc = "최근 변경 순";
    const updateAsc = "변경 오래된 순";
    const createDesc = "최근 생성 순";
    const createAsc = "생성 오래된 순";

    let siteFilterHtml = "";
    siteFilterHtml += `
    <fieldset>
        <legend>상태</legend>
        <ul id="site-status-list">
            <li>
                <input type="checkbox" id="status-0" name="status-0" />
                <label for="status-0"></label>
                <label for="status-0">전체</label>
            </li>`;

    for (let ii=1; ii < 8; ii++){
        siteFilterHtml += `
        <li>
            <input type="checkbox" id="status-${ii}" name="status-${ii}" />
            <label for="status-${ii}"></label>
            <label for="status-${ii}">${Site.siteStatus[ii]}</label>
        </li>
        `;
    }    
    siteFilterHtml += `
        </ul>
    </fieldset>`;


    mainContent01El.insertAdjacentHTML("beforeend", 
        `<form id="search-box">
            <label>이름 또는 URL 검색</label>
            <input type="search" placeholder="bookmark">    
            <button id="site-search-btn">검색</button>                           
        </form>
        <div>
            ${siteFilterHtml}
        </div>
        <div>

        </div>
        <div>
            <button class="change-sequence">${updateDesc}</button>
            <button class="change-sequence">${updateAsc}</button>
            <button class="change-sequence">${createDesc}</button>
            <button class="change-sequence">${createAsc}</button>
            <span id="sort-value">${updateDesc}</span>
        </div>`
    );

    // 카테고리 표시
    let cqdsd = new Category();
    Category.categories = await cqdsd.getCategoryAdmin();
    // mainContent01El.insertAdjacentHTML("beforeend", cqdsd.listToHtmlForAdminSummary(Category.categories));
    // cqdsd.setNavigationBox(Category.categories);

    let sites = await Site.getAllSitesAdmin();
    //  HTML에 추가
    // mainContent01El.insertAdjacentHTML("beforeend", Site.listToHtmlForAdmin(sites));
    let showList = [];
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
    let siteSearchForm = document.querySelector("#search-box");
    siteSearchForm.addEventListener("submit", (target)=> {
        target.preventDefault();
        let searchBtn = siteSearchForm.querySelector("#site-search-btn");
        searchBtn.disabled = true;

        showList = makeFilteredList(sites, searchEl.value, selectedStatus);

        initSiteList(showList);
        searchBtn.disabled = false;
        // let siteList = mainContent01El.querySelector("#site-card-box");
        // if (siteList){
        //     siteList.remove();
        // }        
        // mainContent01El.insertAdjacentHTML("beforeend", Site.listToHtmlForAdmin(filterdSites));
    });
    
    // 선택된 상태 값에 따라 데이터 필터링
    for (let ii=0; ii < 8; ii++){
        document.querySelector(`input[name=status-${ii}]`).addEventListener("change", ()=>{
            selectedStatus[ii] = !selectedStatus[ii];
            showList = makeFilteredList(sites, searchEl.value, selectedStatus);
            initSiteList(showList);
        })
    }  

    // 정렬기준 변경기능
    const changeEl = document.querySelectorAll(".change-sequence");
    const showEl = document.querySelector("#sort-value");
    for (const cEl of changeEl){
        cEl.addEventListener("click", ()=> {
            showEl.textContent = cEl.textContent;
            if (cEl.textContent === updateDesc){ 
                showList.sort(function(a, b){
                    if (a.UpdatedDate < b.UpdatedDate){
                        return 1;
                    }
                    if (a.UpdatedDate === b.UpdatedDate){
                        return 0;
                    }
                    if (a.UpdatedDate > b.UpdatedDate){
                        return -1;        
                    }
                });           
                
                
            } else if (cEl.textContent === updateAsc){
                showList.sort(function(a, b){
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

            } else if (cEl.textContent === createDesc){
                showList.sort(function(a, b){
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

            } else if (cEl.textContent === createAsc){
                showList.sort(function(a, b){
                    if (a.CreatedDate > b.CreatedDate){
                        return 1;
                    }
                    if (a.CreatedDate === b.CreatedDate){
                        return 0;
                    }
                    if (a.CreatedDate < b.CreatedDate){
                        return -1;        
                    }
                }); 

            } 
            initSiteList(showList);
        })

    }
    spinner.classList.toggle("cover");
}

function setMemberPage(){
    spinner.classList.toggle("cover");
}

function makeFilteredList(originSiteList, searchValue, statusList){
    let filterdSites = [];
    let tempList = [];

    // 검색 값 없음
    if (!searchValue){
        tempList = originSiteList;
    } else {
        // 검색 값 없음
        searchValue = searchValue.toLowerCase();
        for(const oneSite of originSiteList){
            if ((oneSite.URL && oneSite.URL.includes(searchValue)) || 
            (oneSite.Name &&  oneSite.Name.includes(searchValue)) || 
            (oneSite.NameKR && oneSite.NameKR.includes(searchValue))){
                tempList.push(oneSite);
            }
        }
    }    

    // 상태 전체 선택
    if (statusList[0]){
        filterdSites = tempList;            
    } else {
        // 상태 일부 선택
        for(const oneSite of tempList){
            if (selectedStatus[oneSite.Status]){
                filterdSites.push(oneSite);
            }                    
        }
    }

    //  정렬 까지 여기다?
    return filterdSites;
}

function initSiteList(showSiteList){
    let siteList = mainContent01El.querySelector("#site-card-box");
    if (siteList){
        siteList.remove();
    }        
    mainContent01El.insertAdjacentHTML("beforeend", Site.listToHtmlForAdmin(showSiteList));
}

