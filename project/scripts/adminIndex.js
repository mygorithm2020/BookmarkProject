
import { Site } from "./site.js";
import { Category } from "./categoryObj.js";

console.log("open index");

let mainContent01El = document.getElementById("main_content01");


// 추천사이트 조회
let sites = await Site.getAllSites();
//  HTML에 추가
mainContent01El.insertAdjacentHTML("beforeend", Site.listToHtmlv2(sites));            
// 카드 이벤트 효과 추가
Site.cardEvent();

window.onload = async function() {
    setTimeout(() => {
        console.log("ssss");
        
    }, 1000);

    
    

};
