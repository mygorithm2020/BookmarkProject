import { Member } from "./memberObj.js";
import {ISLOGIN, STORAGE_KEY_NICKNAME, STORAGE_KEY_REMEBER_LOGIN, STORAGE_KEY_TOKEN} from "./global.js";

// 기존에 로그인이 되어 있는지 확인
// 이미 되어있으면 바로 리다이렉트
if (ISLOGIN){
  redirectBack();
}

const emailInput = document.querySelector("input[name=uemail]");

// 스토리지에 아이디 저장이면 값 불러오기
const loginStorage = window.localStorage.getItem(STORAGE_KEY_REMEBER_LOGIN);

if (loginStorage){
  const loginInfo = JSON.parse(loginStorage);
  emailInput.value = atob(loginInfo.E);
  document.querySelector("input[name=remember]").checked = true;
}

// 아니면 입력 받은 정보로 로그인 진행
let loginForm = document.querySelector("form");
loginForm.addEventListener("submit", async (target) => {
  target.preventDefault();
  const backCover = document.querySelector("#opacity-back");
  backCover.classList.toggle("hidden");
  const mem = new Member();
  mem.MemEmail = emailInput.value;
  mem.Password = loginForm.querySelector("input[name=psw]").value;
  if(loginForm.querySelector("input[name=remember]").checked){
    // 이메일 저장하고 저장한다는 사실 저장하고
    window.localStorage.setItem(STORAGE_KEY_REMEBER_LOGIN, JSON.stringify({
      E : btoa(mem.MemEmail)
    }));
  } else {
    window.localStorage.removeItem(STORAGE_KEY_REMEBER_LOGIN);
  }
  
  const resData = await mem.login(mem);
  if (resData){
    localStorage.setItem(STORAGE_KEY_TOKEN, JSON.stringify({
      AccessToken : resData.AccessToken,
      RefreshToken : resData.RefreshToken
    }));
    
    localStorage.setItem(STORAGE_KEY_NICKNAME, resData.Member.NickName);
    redirectBack();
  }
  backCover.classList.toggle("hidden");
});

// 이미 로그인 되어있는 경우 다른 페이지로
function redirectBack(){
  if (document.referrer && window.location.href !== document.referrer){
    window.location.href = document.referrer;
    return;
  }else {
    window.location.href = "./index.html";
  }
}
