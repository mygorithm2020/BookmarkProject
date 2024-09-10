import { Site } from "./site.js";
// console.log(encodeURIComponent("https://www.hanbit.co.kr/src/10473"));
// console.log(btoa("https://www.hanbit.co.kr/src/10473"));
// const bd = window.btoa("https://www.hanbit.co.kr/src/10473");
// console.log(bd);
// console.log(window.atob(bd));
// console.log(navigator.userAgent);
// console.log(decodeURIComponent(document.cookie));
// console.log("open index");


fetch('https://api.ipify.org?format=json')
.then(response => response.json())
.then(data => {
    console.log(data.ip);
    document.cookie = `${decodeURIComponent("clienip")} = ${decodeURIComponent(data.ip)};`;
})
.catch(error => {
    console.log('Error:', error);
});


let mainContent01El = document.getElementById("main_content01");


// 추천사이트 조회
let sites = await Site.getRecommendedSite();
Site.shuffle(sites);
//  HTML에 추가
mainContent01El.insertAdjacentHTML("beforeend", Site.listToHtmlTemp(sites));            
// 카드 이벤트 효과 추가
Site.cardEvent();

let spinner = document.querySelector(".loading-spinner");
spinner.classList.toggle("cover");



window.onload = async function() {
    setTimeout(() => {
        console.log("ssss");
        // const asdqwcc = document.querySelector("#header_main_logo").parentElement;
        // console.log(asdqwcc);
        // asdqwcc.click();
        
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