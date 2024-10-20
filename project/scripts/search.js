import {Site} from "./site.js";

let curUrl = new URL(document.location.toString());
let query = curUrl.searchParams.get("q");



let mainContent01El = document.getElementById("main_content01");
let data = await Site.getSiteBySearchWord(query);
console.log(data);
let spinner = document.querySelector(".loading-spinner");
spinner.classList.toggle("cover");
if (data && data[1] >0){
    mainContent01El.insertAdjacentHTML("beforeend", Site.listToHtmlForSearch(data[0]));
} else {
    mainContent01El.insertAdjacentHTML("beforeend", "<h2>검색어에 해당하는 사이트가 없습니다</h2>");
}
// const searchForm = document.querySelector("#site-search-form");
// searchForm.querySelector("input[name=word]").value = query;