import {ACCESSTOKEN} from "./global.js";

axios.defaults.withCredentials = true;
// api 요청 모음

export class ApiRequest {
    static NEST_API_HOST = "http://localhost:3000";
    // static NEST_API_HOST = "http://paretostream.shop:3000";
    static HEADER_AUTH = 'session ' + localStorage.getItem(encodeURIComponent("session"));

    static instance = axios.create({
        baseURL: ApiRequest.NEST_API_HOST + "/api",
        // ...other configs,
        timeout: 4000,
        withCredentials: true, // 인증 정보를 포함하도록 설정
        headers : {
            authorization : `bearer ${ACCESSTOKEN}`            
        },
        
    });

    static axiosDelete(path, body){
        let data = ApiRequest.instance.delete(path, body)
        .then((result) => {
            return result.data;   
        })
        .catch((error) => {
            this.HandleBasicError(error);
            return error.response.data;
        });
        return data;
    }

    static axiosPatch(path, body){
        let data = ApiRequest.instance.patch(path, body)
        .then((result) => {
            return result.data;   
        })
        .catch((error) => {
            this.HandleBasicError(error);
            return error.response.data;
        });
        return data;
    }

    static axiosPost(path, body, headerObj){
        let data = ApiRequest.instance.post(path, body,
            {
                headers: headerObj
            },
        )
        .then((result) => {
            return result.data;   
        })
        .catch((error) => {
            this.HandleBasicError(error);
            return error.response.data;
        });
        return data;
    }

    static axiosGet(path){
        let data = ApiRequest.instance.get(path)
        .then((result) => {
            return result.data;   
        })
        .catch((error) => {
            this.HandleBasicError(error);
            return error.response.data;
        });
        return data;
    }

    //모든 api 전체 공통 에러 처리
    static HandleBasicError(error){
        console.log(error);
        if (error.code === "ERR_NETWORK"){
            // 현재 이용 불가능한 무언가 띄우기...
            // alert("현재 서버 점검 중으로 이용할 수 없습니다.")
            alert("현재 서버 점검 중으로 수정할 수 없습니다.");
        } else if (error.response.data.errCode){
            const eCode = error.response.data.errCode;
            // 백엔드에서 미리 처리못한 에러 발생 문의 필요
            switch (eCode){
                case 1:
                    alert("내부 오류가 발생했습니다.");
                    break;
                case 6:                    
                case 7:
                    alert("인증 실패");
                    break;
                // case 1:
                //     alert("내부 오류가 발생했습니다.");
                //     break;
                default:
                    
            }            
        }
    }
}

