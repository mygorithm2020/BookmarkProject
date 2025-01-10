import { ApiRequest } from "./apiRequest.js";

export class MemberCategory {

    MemberCategoryId;
    MemberId;
    Name;
    Sequence;
    CreatedDate;
    Sites;

    // 카테고리 조회
    async getMemCategory(){
        const resData = await ApiRequest.axiosGet("member-category");
        console.log(resData);
        return resData;
    }

    // 카테고리 추가
    async addMemCategory(name){
        const resData = await ApiRequest.axiosPost("member-category", 
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

    // 카테고리 수정
    updateMemCategory(body){
        let data = ApiRequest.axiosPatch("member-category", body);

    }

    // 연결된 사이트 수정
    updateMemCategorySite(body){
        let data = ApiRequest.axiosPut("member-category", body);
    }

    // 카테고리 삭제
    async removeMemCategory(id){
        let res = await ApiRequest.axiosDelete(`member-category/${id}`);
        if (res){

        }
        // let res = this.axiosDelete(`/category/admin?id=${categoryId}`);
        return res;
    }
    
}