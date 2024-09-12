import {ACCESSTOKEN} from "./global.js";
import { Member } from "./memberObj.js";

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
            authorization : `Bearer ${ACCESSTOKEN}`            
        },        
    });

    temp(){
        instance.interceptors.response.use(
            response => response,
            async (error) => {
              const originalRequest = error.config;
          
              // 인증 오류가 발생했는지 확인 (예: 401 Unauthorized)
              if (error.response && error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
          
                try {
                  // 새 액세스 토큰 발급
                  const newAccessToken = await refreshToken();
                  
                  // 새로운 액세스 토큰을 헤더에 추가하고 원래 요청 재시도
                  axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                  originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          
                  return instance(originalRequest);
                } catch (refreshError) {
                  console.error('Error refreshing token:', refreshError);
                  // 리프레시 토큰 오류 시 사용자 로그아웃 처리
                  // 예: window.location.href = '/login';
                  return Promise.reject(refreshError);
                }
              }
          
              return Promise.reject(error);
            }
        );

    }

    static axiosDelete(path){
        path = encodeURI(path);
        let data = ApiRequest.instance.delete(path)
        .then((result) => {
            return result.data;   
        })
        .catch(async (error) => {
            console.log(error);
            // 인증 문제면 토큰 재 발행 후 다시 시도
            if (await this.UnauthorizedHandler(error)){                
                console.log("again");
                let againData = ApiRequest.instance.delete(path)
                .then((result) => {
                    console.log(result);
                    return result.data;
                })
                .catch((error) => {     
                    console.log(error);               
                    this.HandleBasicError(error);
                    return error.response.data;
                })
                return againData;

            } else {
                this.HandleBasicError(error);
                return error.response.data;
            }
        });
        console.log(data);
        return data;
    }

    static axiosPut(path, body){
        path = encodeURI(path);
        let data = ApiRequest.instance.put(path, body)
        .then((result) => {
            return result.data;   
        })
        .catch(async (error) => {
            console.log(error);
            // 인증 문제면 토큰 재 발행 후 다시 시도
            if (await this.UnauthorizedHandler(error)){                
                console.log("again");
                let againData = ApiRequest.instance.put(path, body,
                    
                )
                .then((result) => {
                    console.log(result);
                    return result.data;
                })
                .catch((error) => {     
                    console.log(error);               
                    this.HandleBasicError(error);
                    return error.response.data;
                })
                return againData;

            } else {
                this.HandleBasicError(error);
                return error.response.data;
            }
        });
        return data;
    }

    static axiosPatch(path, body){
        path = encodeURI(path);
        let data = ApiRequest.instance.patch(path, body)
        .then((result) => {
            return result.data;   
        })
        .catch(async (error) => {
            console.log(error);
            // 인증 문제면 토큰 재 발행 후 다시 시도
            if (await this.UnauthorizedHandler(error)){                
                console.log("again");
                let againData = ApiRequest.instance.patch(path, body,
                    
                )
                .then((result) => {
                    console.log(result);
                    return result.data;
                })
                .catch((error) => {     
                    console.log(error);               
                    this.HandleBasicError(error);
                    return error.response.data;
                })
                return againData;

            } else {
                this.HandleBasicError(error);
                return error.response.data;
            }
        });
        return data;
    }

    static axiosPost(path, body, headerObj){
        path = encodeURI(path);
        let data = ApiRequest.instance.post(path, body
        )
        .then((result) => {
            return result.data;   
        })
        .catch(async (error) => {
            console.log(error);
            // 인증 문제면 토큰 재 발행 후 다시 시도
            if (await this.UnauthorizedHandler(error)){                
                console.log("again");
                let againData = ApiRequest.instance.post(path, body,
                    
                )
                .then((result) => {
                    console.log(result);
                    return result.data;
                })
                .catch((error) => {     
                    console.log(error);               
                    this.HandleBasicError(error);
                    return error.response.data;
                })
                return againData;

            } else {
                this.HandleBasicError(error);
                return error.response.data;
            }
        });
        return data;
    }

    static axiosGet(path){
        path = encodeURI(path);
        let data = ApiRequest.instance.get(path)
        .then((result) => {
            return result.data;   
        })
        .catch(async (error) => {
            console.log(error);
            // 인증 문제면 토큰 재 발행 후 다시 시도
            if (await this.UnauthorizedHandler(error)){                
                console.log("again");
                let againData = ApiRequest.instance.get(path)
                .then((result) => {
                    console.log(result);
                    return result.data;
                })
                .catch((error) => {     
                    console.log(error);               
                    this.HandleBasicError(error);
                    return error.response.data;
                })
                return againData;

            } else {
                this.HandleBasicError(error);
                return error.response.data;
            }
        });
        return data;
    }

    static oneTime = true;

    static async UnauthorizedHandler(error){
        let res = false;
        try {
            if (error.response && error.response.data && error.response.data.errCode === 7){  
                // oneTime = false;                          
                console.log("refresh");                
                let data = await new Member().refreshToken();
                console.log(data);
                if (data && data.AccessToken){
                    ApiRequest.instance.defaults.headers['authorization'] = `Bearer ${data.AccessToken}`;
                    
                    res = true;
                }     
            }
        } catch (err) {
            console.log(err);
        }
        console.log(res);
        return res;
    }

    static isGoing = false;

    //모든 api 전체 공통 에러 처리
    static HandleBasicError(error){
        if (ApiRequest.isGoing){
            return;
        }
        ApiRequest.isGoing = true        
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
                    if(confirm("로그인이 필요한 서비스입니다.\r로그인 화면으로 이동하시겠습니까?")
                    ){
                        window.location.href = "login.html";
                    }
                    return;
                    break;
                // case 1:
                //     alert("내부 오류가 발생했습니다.");
                //     break;
                default:
                    
            }            
        }
        ApiRequest.isGoing = false;
    }
}

