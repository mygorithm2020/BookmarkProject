import { Site } from "./site.js";

const STORAGE_KEY_NICKNAME = "nickname";
const STORAGE_KEY_TOKEN = "token";
const REFRESHTOKEN = window.localStorage.getItem(STORAGE_KEY_TOKEN)? JSON.parse(window.localStorage.getItem(STORAGE_KEY_TOKEN)).RefreshToken : "";
const ISLOGIN = window.localStorage.getItem(STORAGE_KEY_NICKNAME) && getExpiredDate() > Date.now() / 1000? true : false ;

// 리프레시 토큰의 만료일
function getExpiredDate(){
    let expiredDate = Date.now() / 1000;
    if(window.localStorage.getItem(STORAGE_KEY_TOKEN)){
        
        expiredDate = JSON.parse(atob(REFRESHTOKEN.split(".")[1])).exp;
    }

    return expiredDate;
    
}

// 로그인 상태면 헤더 변경
const headerNav = document.querySelector("#header_nav");
if (ISLOGIN){

    if (headerNav){
        headerNav.insertAdjacentHTML("afterbegin", `
            <li>
                <button id="logout">로그아웃</button>
            </li>  `
        );

        // 아직 마이페이지에 아무것도 없음...
        // headerNav.insertAdjacentHTML("beforeend", `
        //     <li>            
        //         <a href="myPage.html">
        //             <img src="../images/user.png"/>
        //             ${window.localStorage.getItem(STORAGE_KEY_NICKNAME)? window.localStorage.getItem(STORAGE_KEY_NICKNAME).substring(0, 10) : "마이페이지"}
        //         </a>
        //     </li>  `
        // );

    }
    if (document.querySelector("#logout")){
        document.querySelector("#logout").addEventListener("click", ()=> {
            if(confirm("정말 로그아웃 하시겠습니까?")){
                window.localStorage.removeItem(STORAGE_KEY_NICKNAME);
                window.localStorage.removeItem(STORAGE_KEY_TOKEN);
                window.location.reload();
            }
        })
    }   
    
} else {
    headerNav.insertAdjacentHTML("afterbegin", `
        <li>
            <a href="login.html">로그인</a>
        </li>  `
    );    
}


const recomSite = document.querySelector("#recommend-site");
const backCover = document.querySelector("#opacity-back");
const recSiteBox = document.querySelector("#recom-site-box");
const formBox = document.querySelector("#form-box");
const reUrlEl = formBox.querySelector("input[name=url]");

// 모달 열기
recomSite.addEventListener("click", async ()=>{
    document.querySelector("#close-btn").disabled = false
    if(!ISLOGIN){
        if(confirm("로그인이 필요한 서비스입니다.\r로그인 페이지로 이동하시겠습니까?")){
            window.location.href = "./login.html";
        }
        return;
    }
    OpenOrCloseModal();
})

// 모달 닫기 효과들
document.querySelector("#close-btn").addEventListener("click", ()=>{
    OpenOrCloseModal();
    document.querySelector("#close-btn").disabled = true
});

backCover.addEventListener("click", ()=>{
    if (!backCover.classList.contains("hidden")){
        OpenOrCloseModal();
            return;
    } 

})

document.addEventListener("keydown", (event)=>{
    if (!backCover.classList.contains("hidden")){
        if (event.key == "Escape"){
            OpenOrCloseModal();
            return;
        }
    }    
});



formBox.addEventListener("submit", async (target)=>{
    target.preventDefault();
    const btn = formBox.querySelector("#add-site-btn");
    btn.disabled = true;
    btn.value = "등록 중....";

    const url = reUrlEl.value;
    if(!url || url.trim() == ""){
        alert("올바른 url을 입력하세요!");
        btn.disabled = false;
        return;
    }
    const site = new Site();
    site.URL = url
    let res = await Site.addSiteAdmin(site);
    if (res){
        if (res.SiteId){
            alert(`${url} 사이트가 새로 등록되었습니다`);
            // 등록 창 닫기
            OpenOrCloseModal();
        }else if (res.errCode){
            if (res.errCode === 22){
                alert("이미 등록된 사이트 입니다.");
            } else if (res.errCode === 32){
                alert("입력한 url이 정확한지 확인 후 다시 시도해주세요.");
            } else if (res.errCode > 10){
                alert("오류가 발생했습니다. 잠시 후 다시 시도해주세요!");
            }        
        }

    }    
    btn.disabled = false;
    btn.value = "추천";
})

function OpenOrCloseModal(){
    backCover.classList.toggle("hidden");
    recSiteBox.classList.toggle("hidden");
    reUrlEl.value = "";
}

