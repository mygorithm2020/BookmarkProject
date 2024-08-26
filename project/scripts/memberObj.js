import { ApiRequest } from "./apiRequest.js";

export class Member {

    MemEmail;
    Password;
    NickName;
    Birth;
    Gender;


    apiInstance = axios.create({
        baseURL: ApiRequest.NEST_API_HOST + "/api",
        // ...other configs,
        timeout: 3000,
        withCredentials: true, // 인증 정보를 포함하도록 설정
    });


    // 이메일 인증번호 발송
    sendEmailAuth(email){
        const resData = this.axiosPost("auth/send/email", {Email : email});
        if (resData.errCode == 21){
            alert("올바른 이메일을 입력해주세요");
        } else if (resData.errCode == 22){
            alert("오류가 발생했습니다. 잠시 후 다시 시도해주세요");
        } else if (resData.errCode == 23){
            alert("동일한 이메일로 전송된 인증번호가 있습니다. 새로 요청하시려면 몇분 후에 시도해주세요");
        } 
        return resData.Email;
        // {
        //     "Email": "mygorithm2020@gmail.com"
        // }
    }

    // 이메일 인증확인
    emailAuthCheck(email, authCode){
        const resData = this.axiosPatch("auth/check/email",
            {
                Email : email,
                AuthCode : authCode,
            });
        if (resData.errCode == 11){
            alert("인증번호를 확인해주세요");
        } 
        return resData.Email;
        // {
        //     "Email": "mygorithm2020@gmail.com"
        // }
    }

    // 이메일 중복 확인, 응답으로 이메일이 있으면 중복됨을 의미    
    emailDuplecateCheck(email){
        email = encodeURIComponent(email);
        const resData = this.axiosGet(`member/duplicate?email=${email}`);
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
        const resData = this.axiosPost("member/signup", member);
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
        //     "email": "abc@gmail.com"
        // }
    }

    // 로그인
    login(member){
        const resData = this.axiosPost("member/login", member);
        if (resData.errCode == 24){
            alert("등록된 계정이 없습니다. 이메일과 비밀번호를 확인해주세요");
        } else if (resData.errCode == 25){
            alert("인증이 필요한 계정입니다");
        } else if (resData.errCode == 26){
            alert("차단된 계정입니다. 관리자에게 문의하세요");
        }
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

    //



    static async axiosPatch(path, body){
        let data = await this.apiInstance.patch(path, body)
        .then((result) => {
            return result.data;   
        })
        .catch((error) => {
            HandleBasicError(error);
            return error.response.data;
        });
        return data;
    }

    static async axiosPost(path, body){
        let data = await this.apiInstance.post(path, body)
        .then((result) => {
            return result.data;   
        })
        .catch((error) => {
            HandleBasicError(error);
            return error.response.data;
        });
        return data;
    }

    static async axiosGet(path){
        let data = await this.apiInstance.get(path)
        .then((result) => {
            return result.data;   
        })
        .catch((error) => {
            HandleBasicError(error);
            return error.response.data;
        });
        return data;
    }

    HandleBasicError(error){
        console.log(error);
        if (error.code === "ERR_NETWORK"){
            // 현재 이용 불가능한 무언가 띄우기...
            // alert("현재 서버 점검 중으로 이용할 수 없습니다.")
            alert("현재 서버 점검 중으로 수정할 수 없습니다.");
        } else if (error.response.data.errCode){
            // 백엔드에서 미리 처리못한 에러 발생 문의 필요
            if (error.response.data.errCode === 1){
                alert("내부 오류가 발생했습니다.");
            }
        }
    }
}