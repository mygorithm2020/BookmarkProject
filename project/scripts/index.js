
import { Site } from "./site.js";
import { Category } from "./categoryObj.js";

console.log("open index");

let mainContent01El = document.getElementById("main_content01");


// 추천사이트 조회
let sites = await Site.getRecommendedSite();
Site.shuffle(sites);
//  HTML에 추가
mainContent01El.insertAdjacentHTML("beforeend", Site.listToHtmlTemp(sites));            
// 카드 이벤트 효과 추가
Site.cardEvent();

let spinner = document.querySelector(".loading-spinner");
console.log(spinner);
spinner.classList.toggle("cover");

window.onload = async function() {
    setTimeout(() => {
        console.log("ssss");
        
    }, 1000);

    
    

};


// let instance = axios.create({
//     baseURL: 'https://some-domain.com/api/',
//     // ...other configs,
//     timeout: 1000,
// });

// instance.get("/")
// .then( (res) => {
//     console.log(res);
// }) 
// .catch((err) => {
//     console.log(err);
// })