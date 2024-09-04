import { Member } from "./memberObj.js";
import {STORAGE_KEY_NICKNAME, STORAGE_KEY_REMEBER_LOGIN, STORAGE_KEY_TOKEN} from "./global.js";

console.log("login");
console.log(window.location);
console.log(document.referrer);
console.log(document.cookie);

// 기존에 로그인이 되어 있는지 확인
// 쿠키냐 스토리지냐...
// 이미 되어있으면 바로 리다이렉트
if (true){
    // window.location.href = document.referrer;
}



const emailInput = document.querySelector("input[name=uemail]");

// 스토리지에 아이디 저장이면 값 불러오기
const loginStorage = window.localStorage.getItem(STORAGE_KEY_REMEBER_LOGIN);

if (loginStorage){
  const loginInfo = JSON.parse(loginStorage);
  console.log(loginInfo);
  emailInput.value = loginInfo.E;
  document.querySelector("input[name=remember]").checked = true;
}

// 아니면 입력 받은 정보로 로그인 진행
let loginForm = document.querySelector("form");
loginForm.addEventListener("submit", async (target) => {
  target.preventDefault();
  const mem = new Member();
  mem.MemEmail = emailInput.value;
  mem.Password = loginForm.querySelector("input[name=psw]").value;
  if(loginForm.querySelector("input[name=remember]").checked){
    // 이메일 저장하고 저장한다는 사실 저장하고
    window.localStorage.setItem(STORAGE_KEY_REMEBER_LOGIN, JSON.stringify({
      remember : true,
      E : mem.MemEmail
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
    if (document.referrer && window.location.href !== document.referrer){
      window.location.href = document.referrer;
      return;
    }
    window.location.href = "./index.html";
  }
});
