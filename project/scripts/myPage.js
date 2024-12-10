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
    // 데이터 조회
    
    const memCategories = await memCa.getMemCategory();

    // 화면 표출
    mainContentEl.insertAdjacentHTML("beforeend", showMemCategory(memCategories));

    const memSites = await memSite.getMemSite();
    mainContentEl.insertAdjacentHTML("beforeend", showMemSite(memSites));

    
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
    let res = "";
    return res;
    
}