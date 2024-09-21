// import axios from 'axios';
const axios = require("axios");

class ApiRequest{

    // static SERVER_API_HOST = "http://localhost:3000";
    static SERVER_API_HOST = "http://paretostream.shop:3000";

    static instance = axios.create({
        baseURL: ApiRequest.SERVER_API_HOST + "/api",
        // ...other configs,
        timeout: 4000,
        withCredentials: true, // 인증 정보를 포함하도록 설정
        headers : {
                                
        },        
    });


    static axiosDelete(path){
        path = encodeURI(path);
        let data = ApiRequest.instance.delete(path)
        .then((result) => {
            return result.data;   
        })
        .catch(async (error) => {
            console.log(error.status);     
        });
        return data;
    }

    static axiosPut(path, body){
        path = encodeURI(path);
        let data = ApiRequest.instance.put(path, body)
        .then((result) => {
            return result.data;   
        })
        .catch(async (error) => {
            console.log(error.status);
            
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
            console.log(error.status);
            
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
            console.log(error.status);
            
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
            console.log(error.status);                 
        });
        return data;
    }

}

exports.ApiRequest = ApiRequest;