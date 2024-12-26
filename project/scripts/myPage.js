import { MemberCategory } from "./memberCategoryObj.js";
import { MemberSite } from "./memberSiteObj.js";

let curUrl = new URL(document.location.toString());
let pageKey = curUrl.searchParams.get("key");

const siteMapTextEl = document.querySelector(".site-map-text");
const mainContentEl = document.querySelector("#main_content01");


const memCa = new MemberCategory();
const memSite = new MemberSite();

switch (pageKey){
    case "favorite" :
        console.log(pageKey);
        setFavorite();
        break;
    case "manager" :
        console.log(pageKey);
        break;
    case "myinfo" :
        console.log(pageKey);
        break;
    case "password" :
        console.log(pageKey);
        break;
    case "resign" :
        console.log(pageKey);
        break;
    default:
        console.log("default");
        setFavorite();
        break;
}




async function setFavorite(){
    document.querySelector(".site-map-text").textContent = "즐겨찾기";

    mainContentEl.insertAdjacentHTML("beforeend", `<button id="add-my-category">카테고리 추가</button>`);
    mainContentEl.insertAdjacentHTML("beforeend", `<button id="add-my-site">사이트 추가</button>`);
    mainContentEl.insertAdjacentHTML("beforeend", hiddenModal());

    const backCover = document.querySelector("#opacity-back");
    const addCateBox = document.querySelector("#add-mycategory-box");
    const addSiteBox = document.querySelector("#add-mysite-box");

    const addCateBtn = document.querySelector("#add-my-category");
    const addSiteBtn = document.querySelector("#add-my-site");
    // 버튼 클릭 이벤트 추가
    addCateBtn.addEventListener("click", ()=> {
        OpenOrCloseModal(1);
    });
    addSiteBtn.addEventListener("click", ()=> {
        OpenOrCloseModal(2);
    });

    backCover.addEventListener("click", ()=>{
        if (!addCateBox.classList.contains("hidden")){
            OpenOrCloseModal(1);
            return;
        } else if (!addSiteBox.classList.contains("hidden")){
            OpenOrCloseModal(2);
            return;
        }
    })

    // 모달 열기
    // recomSite.addEventListener("click", async ()=>{
    //     document.querySelector("#close-btn").disabled = false
    //     if(!ISLOGIN){
    //         if(confirm("로그인이 필요한 서비스입니다.\r로그인 페이지로 이동하시겠습니까?")){
    //             window.location.href = "./login.html";
    //         }
    //         return;
    //     }
    //     OpenOrCloseModal();
    // })


    // 데이터 조회    
    const memCategories = await memCa.getMemCategory();
    const memSites = await memSite.getMemSite();

    // 화면 표출
    mainContentEl.insertAdjacentHTML("beforeend", showMemCategory(memCategories));    
    mainContentEl.insertAdjacentHTML("beforeend", showMemSite(memSites));    

    function OpenOrCloseModal(kind){
        backCover.classList.toggle("hidden");
        if (kind == 1){
            addCateBox.classList.toggle("hidden");
        } else if (kind == 2){
            addSiteBox.classList.toggle("hidden");
        }
        
        // 입력값 초기화하는 과정 필요
        // reUrlEl.value = "";
    }    
}



function showButton(text){
    let res = `<button>${text}</button>`;
    return res;
}

function showMemCategory(memCaList){
    let res = "";
    res += `
    <fieldset>
        <legend>카테고리</legend>
        <ul id="member-category-list">
            <li>
                <input type="checkbox" id="category-all" name="category-all" />
                <label for="category-all"></label>
                <label for="category-all">전체</label>
                <span id="count-category-all"></span>
            </li>`;

    for(const memCa of memCaList){
        res += `
        <li>
            <input type="checkbox" id="${memCa.MemberCategoryId}" name="${memCa.MemberCategoryId}" />
            <label for="status-${memCa.MemberCategoryId}"></label>
            <label for="${memCa.MemberCategoryId}">${memCa.Name}</label>
            <span id="count-${memCa.MemberCategoryId}"></span>
        </li>
        `;
    }
    res += `
        </ul>
    </fieldset>`;
    return res;
}

function showMemSite(memSites){
    let res = "<ul>";
    for (const memSi of memSites){
        res += `
        <li>                    
            <a href="${memSi.URL}">
                <img src="${memSi.Img}">
                ${memSi.Name}
            </a>
        </li>
        `;
    }
    res += "</ul>";
    return res;    
}

function hiddenModal(){
    let res = `
    <div id="opacity-back" class="hidden">
    </div>
    <div id="add-mycategory-box" class="hidden">    
        <button class="close-btn"><img src="../images/close.png"></button>
        
        <form class="form-box" >        
            <h3>카테고리 등록</h3>
            <input type="text" placeholder="쇼핑" name="name" required maxlength="30">
            <input type="submit" value="등록" id="add-category-btn">
        </form>                
    </div>
    <div id="add-mysite-box" class="hidden">    
        <button class="close-btn"><img src="../images/close.png"></button>        
        <form class="form-box" >        
            <h3>카테고리 등록</h3>
            <input type="text" placeholder="쇼핑" name="name" required maxlength="30">
            <input type="submit" value="등록" id="add-category-btn">
        </form>                
    </div>
    `;    
    return res;
}