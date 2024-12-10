import { ApiRequest } from "./apiRequest.js";

export class MemberSite {

    MemberCategoryId;
    MemberId;
    Name;
    Sequence;
    CreatedDate;
    Sites;

    // 사이트 조회
    async getMemSite(){
        const resData = await ApiRequest.axiosGet("member-site");
        console.log(resData);
        return resData;
    }

    // 추가
    async addMemSite(name){
        const resData = await ApiRequest.axiosPost("member-site", 
            {Name : name}
        );
        if (resData.errCode){
            if (resData.errCode == 21){
                alert("필수값이 부족합니다.");
            } else if (resData.errCode == 22){
                alert("이름이 너무 깁니다");
            }
            return null;
        }        
        return resData;

    }

    // 수정
    updateMemSite(body){
        let data = ApiRequest.axiosPatch("member-category", body);

    }

    // 연결된 카테고리 수정
    updateMemCategorySite(body){
        let data = ApiRequest.axiosPut("member-site", body);
    }

    // 삭제
    async removeMemSite(id){
        let res = await ApiRequest.axiosDelete(`member-category/${id}`);
        if (res){

        }
        // let res = this.axiosDelete(`/category/admin?id=${categoryId}`);
        return res;
    }
    
}