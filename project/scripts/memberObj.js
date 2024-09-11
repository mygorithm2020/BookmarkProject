import { ApiRequest } from "./apiRequest.js";
import {ACCESSTOKEN, REFRESHTOKEN, STORAGE_KEY_TOKEN, STORAGE_KEY_NICKNAME} from "./global.js";

export class Member {

    MemEmail;
    Password;
    NickName;
    Birth;
    Gender;

    // apiInstance = axios.create({
    //     baseURL: ApiRequest.NEST_API_HOST + "/api",
    //     // ...other configs,
    //     timeout: 4000,
    //     withCredentials: true, // 인증 정보를 포함하도록 설정
    //     headers : {
    //         authorization : `Bearer ${ACCESSTOKEN}`
            
    //     },
        
    // });

    // 이메일 인증번호 발송
    async sendEmailAuth(email){
        const resData = await ApiRequest.axiosPost("auth/sendemail", 
            {Email : email}
        );
        if (resData.errCode == 21){
            alert("올바른 이메일을 입력해주세요");
        } else if (resData.errCode == 22){
            alert("오류가 발생했습니다. 잠시 후 다시 시도해주세요");
        } else if (resData.errCode == 23){
            alert("동일한 이메일로 전송된 인증번호가 있습니다. 새로 요청하시려면 몇분 후에 시도해주세요");
        } 
        return resData;
        // {
        //     "Email": "mygorithm2020@gmail.com"
        // }
    }

    // 이메일 인증확인(5분 이내로)
    async emailAuthCheck(email, authCode){
        const resData = await ApiRequest.axiosPatch("auth/checkemail",
            {
                Email : email,
                AuthCode : authCode,
            });
        if (resData.errCode == 11){
            alert("잘못된 인증번호입니다.");
        } 
        return resData;
        // {
        //     "Email": "mygorithm2020@gmail.com"
        // }
    }

    // 이메일 중복 확인, 응답으로 이메일이 있으면 중복됨을 의미    
    async emailDuplecateCheck(email){
        email = encodeURIComponent(email);
        const resData = await ApiRequest.axiosGet(`member/duplicate?email=${email}`);
        if (resData.errCode == 11){
            alert("이메일 인증요청부터 진행해주세요");
        } else if (resData.errCode == 12){
            alert("이메일 인증을 완료해주세요");
        } else if (resData.errCode == 12){
            alert("이메일 인증을 완료해주세요");
        }
        return resData;
        // {
        //     "email": "abc@gmail.com"
        // }
    }

    // 회원가입
    signUp(member){
        const resData = ApiRequest.axiosPost("member/signup", member);
        if (resData.errCode == 11){
            alert("인증번호를 확인해주세요");
        } else if (resData.errCode == 21){
            alert("이미 등록된 계정입니다");
        } else if (resData.errCode == 51){
            alert("이메일과 암호는 필수 값 입니다");
        } else if (resData.errCode == 52){
            alert("올바른 이메일 주소를 입력해주세요");
        } else if (resData.errCode == 53){
            alert("6자리 이상의 암호를 입력해주세요");
        } else if (resData.errCode == 54){
            // alert("생년월일은 8자리");
        } else if (resData.errCode == 55){
            // alert("성별은 M 또는 F");
        } else if (resData.errCode){
            console.log(reqData.errCode);            
        }
        
        return resData;
        // {
        //     "MemEmail": "mygorithm2020@gmail.com"
        // }
    }

    // 로그인
    async login(member){
        const resData = await ApiRequest.axiosPost("auth/login", member);
        console.log(resData);
        if (resData){
            if (resData.errCode == 24){
                alert("등록된 계정이 없습니다. 이메일과 비밀번호를 확인해주세요");
            } else if (resData.errCode == 25){
                alert("인증이 필요한 계정입니다");
            } else if (resData.errCode == 26){
                alert("차단된 계정입니다. 관리자에게 문의하세요");
            }
        }
        
        return resData;
        // {
        //     "AccessToken": "6ITH2gF/QUBv6VICNdOB1nr+XVGuOwBIFN3IJZ3ihuZNMzdLAhvoxUbc5+tdv6BeoAJVh7oOtrJsJMkwk74lI2AtaURzeY6UZD9tILdcmS8Z2QBMXhjw82oI8WeN24w35/UHE8Qd0JKacrsTEk0wJtvRDzeEXBPecJaYo2t2nnTu3O/HaZaBMq+dDLHFU0SOMgVlFKET+pqzD5HTPtmqvkmj2lOukGv8HNMhXjYJJs5mTc0ySJRkjxMJaQ==",
        //     "RefreshToken": "6ITH2gF/QUBv6VICNdOB1nr+XVGuOwBIFN3IJZ3ihuZNMzdLAhvoxUbc5+tdv6BeoAJVh7oOtrJsJMkwk74lI2AtaURzeY6UZD9tILdcmS8e1RBMXhzzzXQUzA6Q2aIV4PEAJfk014KacqsXXU0wPp/RISOKRjngaoWtp3Rbt1Kg38HtIJavPuSdMq3LeFbXOCpfLIEAx7ilK7/ofe6rui+E7Xu4oU+qEJsdFWU5dNcQfsAEF8FgpB4Wa2H9T7TBzLVEx01n59hGIM3RppO/UjI6QQ==",
        //     "Member": {
        //         "MemberId": "3cf1c866d24e4eafa4ff972ee8d2a7a1",
        //         "NickName": "테스트0826"
        //     }
        // }
    }

    // 401에러 나오면 리프레시 시도하고, 그래도 안되면 재 로그인 필요
    // 토큰 리프레쉬 + 로그인 확인용
    async refreshToken(){
        console.log("token");
        const resData = ApiRequest.instance.post("auth/refresh", null, {
            headers : {
                authorization : `Bearer ${REFRESHTOKEN}`            
            }            
        })
        .then((res) => {
            if (res.data && res.data.AccessToken){
                localStorage.setItem(STORAGE_KEY_TOKEN, JSON.stringify({
                    AccessToken : res.data.AccessToken,
                    RefreshToken : res.data.RefreshToken
                }));
                localStorage.setItem(STORAGE_KEY_NICKNAME, res.data.Member.NickName);
            }else {
                localStorage.removeItem(STORAGE_KEY_TOKEN);
                localStorage.removeItem(STORAGE_KEY_NICKNAME);
            }
            return res.data;
        })
        .catch((err) => {
            localStorage.removeItem(STORAGE_KEY_TOKEN);
            localStorage.removeItem(STORAGE_KEY_NICKNAME);
        });

        // if (resData && resData.ACCESSTOKEN){
        //     localStorage.setItem(STORAGE_KEY_TOKEN, JSON.stringify({
        //       AccessToken : resData.AccessToken,
        //       RefreshToken : resData.RefreshToken
        //     }));
            
        //     localStorage.setItem(STORAGE_KEY_NICKNAME, resData.Member.NickName);
        // } else {
        //     localStorage.removeItem(STORAGE_KEY_TOKEN);
        //     localStorage.removeItem(STORAGE_KEY_NICKNAME);
        // }        

        return resData;
        // {
        //     "accessToken": "6ITH2gF/QUBv6VICNdOB1nr+XVGuOwBIFN3IJZ3ihuZNMzdLAhvoxUbc5+tdv6BeoAJVh7oOtrJsJMkwk74lI2AtaURzeY6UZD9tILdcmS8Z2QBMXhjw82oI8WeN24w35/UHE8Qd0JKacrsTEk0wJtvRDzeEXBPecJaYo2t2nnTu3O/HaZaBMq+dDLHFU0SOMgVlFKET+pqzD5HTPtmqvkmj2lOukGv8HNMhXjYJJs5mTc0ySJRkjxMJaQ==",
        //     "refreshToken": "6ITH2gF/QUBv6VICNdOB1nr+XVGuOwBIFN3IJZ3ihuZNMzdLAhvoxUbc5+tdv6BeoAJVh7oOtrJsJMkwk74lI2AtaURzeY6UZD9tILdcmS8e1RBMXhzzzXQUzA6Q2aIV4PEAJfk014KacqsXXU0wPp/RISOKRjngaoWtp3Rbt1Kg38HtIJavPuSdMq3LeFbXOCpfLIEAx7ilK7/ofe6rui+E7Xu4oU+qEJsdFWU5dNcQfsAEF8FgpB4Wa2H9T7TBzLVEx01n59hGIM3RppO/UjI6QQ==",
        //     "member": {
        //         "MemberId": "3cf1c866d24e4eafa4ff972ee8d2a7a1",
        //         "MemEmail": "abc@gmail.com",
        //         "NickName": "테스트0826"
        //     }
        // }
    }

    
}