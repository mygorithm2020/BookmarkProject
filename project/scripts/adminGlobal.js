// import {STORAGE_KEY_NICKNAME, STORAGE_KEY_TOKEN, ACCESSTOKEN, REFRESHTOKEN, ISLOGIN} from "./global.js";
import {getExpiredDate} from "./global.js";

export const STORAGE_KEY_REMEBER_LOGIN = "";
export const STORAGE_KEY_NICKNAME = "nickname";
export const ISLOGIN = window.localStorage.getItem(STORAGE_KEY_NICKNAME) && (getExpiredDate() > Date.now() / 1000);

if (!ISLOGIN && !window.location.href.includes("login")){
    window.location.href = "login.html";
}

// // 로그인 페이지 빼고 전부 연결

// //로그인 상태 아니면 바로 다시 리다이렉트
// if (!window.localStorage.getItem(STORAGE_KEY_NICKNAME) || getExpiredDate() < Date.now()){
//     // console.log(document.querySelector("#header_nav>li:first-child"));
//     // document.querySelector("#header_nav>li:first-child").remove();

//     // document.querySelector("#header_nav").insertAdjacentHTML("afterbegin", `
//     //     <li>
//     //         <button id="logout">로그아웃</button>
//     //     </li>  `
//     // );

//     // document.querySelector("#header_nav").insertAdjacentHTML("beforeend", `
//     //     <li>            
//     //         <a href="myPage.html">
//     //             <img src="../images/user.png"/>
//     //             ${window.localStorage.getItem(STORAGE_KEY_NICKNAME)? window.localStorage.getItem(STORAGE_KEY_NICKNAME).substring(0, 10) : "마이페이지"}
//     //         </a>
//     //     </li>  `
//     // );

//     // document.querySelector("#logout").addEventListener("click", ()=> {
//     //     if(confirm("정말 로그아웃 하시겠습니까?")){
//     //         window.localStorage.removeItem(STORAGE_KEY_NICKNAME);
//     //         window.localStorage.removeItem(STORAGE_KEY_TOKEN);
//     //         window.location.reload();
//     //     }
//     // })
//     window.location.href = "adminlogin.html";
    
// }