
axios.defaults.withCredentials = true;
// api 요청 모음

export class ApiRequest {
    static NEST_API_HOST = "http://localhost:3000";
    // static NEST_API_HOST = "http://paretostream.shop:3000";
    static HEADER_AUTH = 'session ' + localStorage.getItem(encodeURIComponent("session"));
}

