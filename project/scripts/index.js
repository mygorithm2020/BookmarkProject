import { Site } from "./site.js";
console.log(encodeURIComponent("https://www.hanbit.co.kr/src/10473"));
console.log(btoa("https://www.hanbit.co.kr/src/10473"));
const bd = window.btoa("https://www.hanbit.co.kr/src/10473");
console.log(bd);
console.log(window.atob(bd));
console.log(navigator.userAgent);
console.log(decodeURIComponent(document.cookie));
console.log("open index");
document.cookie = "user=John; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT; max-age=0";
document.cookie = `usernamessss = ${encodeURIComponent("홍길동")}; httpOnly`;


// 만료기간을 넣어서 쿠키가 자동 만료 되도록 제작할 수 있다.(UTC time을 이용)
document.cookie = "username2=John Doe; max-age=3600; samesite=strict; path=/;";


// 파라미터를 이용하여 쿠키가 어디 브라우저에 속할 수 있을지 알려줄 수 있다.
document.cookie = "username3=John Doe; expires=Thu, 18 Dec 2024 12:00:00 UTC; path=/";

document.cookie = "username4=John Doe; expires=Thu, 18 Dec 2024 12:00:00 UTC; path=/; Secure";



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
console.log(spinner);
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