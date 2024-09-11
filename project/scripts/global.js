// document.cookie = "user=John; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT; max-age=0";
// document.cookie = `usernamessss = ${encodeURIComponent("홍길동")}; httpOnly`;


// // 만료기간을 넣어서 쿠키가 자동 만료 되도록 제작할 수 있다.(UTC time을 이용)
// document.cookie = "username2=John Doe; max-age=3600; samesite=strict; path=/;";


// // 파라미터를 이용하여 쿠키가 어디 브라우저에 속할 수 있을지 알려줄 수 있다.
// document.cookie = "username3=John Doe; expires=Thu, 18 Dec 2024 12:00:00 UTC; path=/";

// document.cookie = "username4=John Doe; expires=Thu, 18 Dec 2024 12:00:00 UTC; path=/; Secure";

export const SITE_TITLE = "BookMarker";
export const STORAGE_KEY_REMEBER_LOGIN = "login-info";
export const STORAGE_KEY_NICKNAME = "nickname";
export const STORAGE_KEY_TOKEN = "token";
export const ACCESSTOKEN = window.localStorage.getItem(STORAGE_KEY_TOKEN) ? JSON.parse(window.localStorage.getItem(STORAGE_KEY_TOKEN)).AccessToken : "";
export const REFRESHTOKEN = window.localStorage.getItem(STORAGE_KEY_TOKEN)? JSON.parse(window.localStorage.getItem(STORAGE_KEY_TOKEN)).RefreshToken : "";
// 리프레시 토큰이 유효기간 이전이면 됨
export const ISLOGIN = window.localStorage.getItem(STORAGE_KEY_NICKNAME) && getExpiredDate() > Date.now() / 1000? true : false ;




const cName = "mId";
if (!getCookie(cName)){
    // https 에서만 사용 가능...
    // const vId = window.crypto.randomUUID().replaceAll("-", "");
    // document.cookie = `${encodeURIComponent(cName)}=${encodeURIComponent(vId)}; expires=Thu, 18 Dec 2030 12:00:00 UTC;`;
}

function getCookie(name){
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies){
        const splitedCookie =  cookie.split("=");
        if (splitedCookie[0] == encodeURIComponent(name)){
            return splitedCookie[1];
        }        
    }
}

window.onload = function(){
    // // 로그인 상태면 헤더 변경
    // if (ISLOGIN){
        
    //     if (document.querySelector("#header_nav>li:first-child")){
    //         console.log("Sdsdsds");
    //         document.querySelector("#header_nav>li:first-child").remove();
    //     }
        
    //     const headerNav = document.querySelector("#header_nav");

    //     if (headerNav){
    //         headerNav.insertAdjacentHTML("afterbegin", `
    //             <li>
    //                 <button id="logout">로그아웃</button>
    //             </li>  `
    //         );

    //         headerNav.insertAdjacentHTML("beforeend", `
    //             <li>            
    //                 <a href="myPage.html">
    //                     <img src="../images/user.png"/>
    //                     ${window.localStorage.getItem(STORAGE_KEY_NICKNAME)? window.localStorage.getItem(STORAGE_KEY_NICKNAME).substring(0, 10) : "마이페이지"}
    //                 </a>
    //             </li>  `
    //         );

    //     }
    //     if (document.querySelector("#logout")){
    //         document.querySelector("#logout").addEventListener("click", ()=> {
    //             if(confirm("정말 로그아웃 하시겠습니까?")){
    //                 window.localStorage.removeItem(STORAGE_KEY_NICKNAME);
    //                 window.localStorage.removeItem(STORAGE_KEY_TOKEN);
    //                 window.location.reload();
    //             }
    //         })
    //     }   
        
    // }
}


// 리프레시 토큰의 만료일
export function getExpiredDate(){
    let expiredDate = Date.now() / 1000;
    if(window.localStorage.getItem(STORAGE_KEY_TOKEN)){        
        expiredDate = JSON.parse(atob(REFRESHTOKEN.split(".")[1])).exp;
    }

    return expiredDate;
    
}