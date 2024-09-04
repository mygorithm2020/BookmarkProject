import { Member } from "./memberObj.js";

const email = document.querySelector("input[name=uemail-f]");
const emailDomainBox = document.querySelector("input[name=uemail-b]");
const emailDomainHelper = document.querySelector("select[name=domain]");
console.log(emailDomainHelper);
const sendEmail = document.getElementById("send-auth-code");
const authCodebox = document.querySelector("#auth-code-box");
const checkEmail = document.getElementById("check-auth-code");
const signupForm = document.querySelector("form");
const subBox = document.getElementById("detail-info-box");

const member = new Member();


emailDomainHelper.addEventListener("change", ()=> {
    emailDomainBox.value = emailDomainHelper.value;
})

let authTImer = 60 * 5; 

sendEmail.addEventListener("click", async ()=> { 
    if (!email.value || !emailDomainBox.value){
        alert("이메일을 입력해주세요");
        return;
    }
    sendEmail.disabled = true;
    const authData = await member.sendEmailAuth(email.value + "@" + emailDomainBox.value);
    // 성공
    if (authData.Email){
        authCodebox.classList.remove("hidden");
        sendEmail.innerHTML = "인증 번호 전송 완료";      
        document.querySelector("#auth-code-box>label").insertAdjacentHTML("afterend", `<span id="auth-time"></span>`);
        const timerBox = document.querySelector("#auth-time");
        setInterval(() => {
            authTImer -= 1;
            timerBox.innerHTML = `   남은시간 ${authTImer} 초`;
            
        }, 1000);
    } else {
        sendEmail.disabled = false;
    }
})

checkEmail.addEventListener("click", async ()=> {
    const authCode = document.querySelector("input[name=auth-code");
    const checkEmailData = await member.emailAuthCheck(email.value + "@" + emailDomainBox.value, authCode.value);
    console.log(checkEmailData);
    checkEmail.disabled = true;
    // 인증 성공
    if (checkEmailData.Email){
        document.querySelector("#auth-time").remove();
        // 중복체크
        const duplicateData = await member.emailDuplecateCheck(email.value + "@" + emailDomainBox.value);
        if (duplicateData.Email){
            if(confirm("이미 등록된 이메일입니다. 비밀번호 찾기로 이동할까요?")){
                window.location.href = "./pwsearch.html";
                return;
            }          
            checkEmail.disabled = false;
            sendEmail.disabled = false;
            sendEmail.innerHTML = "인증 번호 전송";              
        } else {
            subBox.classList.remove("hidden");
            email.disabled = true;
            emailDomainBox.disabled = true;
            authCode.disabled = true;
            emailDomainHelper.disabled = true;
            checkEmail.innerHTML = "인증 완료";
        }        
    } else {
        checkEmail.disabled = false;
    }
})


signupForm.addEventListener("submit", async (target)=> {
    target.preventDefault();
    const pw = signupForm.querySelector("input[name=psw]").value;
    if (pw !== signupForm.querySelector("input[name=psw-confirm]").value){
        alert("비밀번호 확인 결과 일치하지 않습니다. 다시 입력해주세요");
        return;
    }
    member.MemEmail = email.value + "@" + emailDomainBox.value;
    member.Password = pw;
    member.NickName = signupForm.querySelector("input[name=nickname]").value;
    member.Birth = signupForm.querySelector("input[name=birth]").value.replaceAll("-", "");
    const gender = signupForm.querySelector("select[name=gender]").value;
    if (gender === "male"){
        member.Gender = "M";
    } else if (gender === "female") {
        member.Gender = "F";
    }
    console.log(signupForm.querySelector("select[name=gender]"));
    const agreeInfo = signupForm.querySelector("input[name=agree-info]").checked;
    if (!agreeInfo){
        alert("개인정보 제공 동의는 필수 체크사항입니다.");
        return;
    }


    const signUpRes = await member.signUp(member);
    if (signUpRes.MemEmail){
        alert("회원가입에 성공했습니다.");
        window.location.href = "login.html";
    } else {
        
    }
})