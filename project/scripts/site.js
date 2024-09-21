import { ApiRequest } from "./apiRequest.js";

export class Site {
    // static API_HOST = "http://220.72.179.212:3000";
    static API_HOST = ApiRequest.NEST_API_HOST + "/api";
    static IMG_HOST = ApiRequest.NEST_API_HOST + "/images";

    static siteStatus = {
        1 : "등록",
        2 : "공개",
        3 : "보류",
        4 : "비공개",
        5 : "자동등록실패",
        6 : "자동등록성공",
        7 : "자동등록보류",
    }

    constructor(siteInfo){
        this.SiteId;
        this.URL;        
        this.Name;        
        this.NameKR;        
        this.IPAddress;        
        this.Img;        
        this.SiteDescription;        
        this.AppLinkAndroid;        
        this.AppLinkIOS;
        this.Views;        
        this.Good;        
        this.Bad;        
        this.MemberId;        
        this.Status;
        this.Title;
        this.FaviconImg;
        this.Description;
        this.Keywords;
        this.OGTitle;
        this.OGSiteName;        
        this.OGImg;
        this.OGDescription;
        this.OGURL; 
        this.IsDeleted;
        this.CreatedDate;
        this.UpdatedDate;        
    }

    static shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1)); // 무작위 인덱스(0 이상 i 미만)

            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // 숫자(뷰, 좋아요, 싫어요)
    // 1000 넘어가면 표기 변경 구현
    // <li>방문수 ${siteList[i].Views}</li>

    static listToHtmlTemp(siteList){
        let res = "";
        if (!siteList || siteList.length === 0){
            res = `<div class="no-data-templet">현재 등록된 사이트가 없습니다.</div>`;
            return res;

        }

        res += `<ul id="site-card-box">`
        for (let i = 0 ; i < siteList.length; i++){
            // if (siteList[i].SiteDescription && siteList[i].SiteDescription.length > 80){
            //     siteList[i].SiteDescription = siteList[i].SiteDescription.slice(0, 80) + "...";
            // }
            res += `
            <li class="site-card">
                <a class="external_link" href="${siteList[i].URL}" target="_blank" rel="external" data-siteId=${siteList[i].SiteId}>
                    <div class="site-card-top ">                    
                        <img class="site-card-img" src="${siteList[i].Img && !siteList[i].Img.startsWith('http') ?Site.IMG_HOST + "/" + siteList[i].SiteId + "/" + siteList[i].Img : siteList[i].Img}" alt="no images">
                        
                    </div>
                    <div class="site-card-mid bg-color-5">
                        <div>
                            ${siteList[i].NameKR ? siteList[i].NameKR : siteList[i].Name}                            
                        </div>
                        <ul class="site-detail-box">
                            
                            
                                                         
                        </ul>
                    </div>
                    <p class="site-card-bottom bg-color-5">
                        ${siteList[i].SiteDescription? siteList[i].SiteDescription : ""}   
                    </p>                         
                </a>     
                  
            </li>`;
        }
                        
        res += `
        </ul>`

        return res;
    }

    static listToHtmlForSearch(siteList){
        let res = "";
        if (!siteList || siteList.length === 0){
            res = `<div class="no-data-templet">현재 등록된 사이트가 없습니다.</div>`;
            return res;

        }

        res += `<ul id="site-card-box">`
        for (let i = 0 ; i < siteList.length; i++){
            // if (siteList[i].SiteDescription && siteList[i].SiteDescription.length > 80){
            //     siteList[i].SiteDescription = siteList[i].SiteDescription.slice(0, 80) + "...";
            // }
            res += `
            <li class="site-card">
                <a class="external_link" href="${siteList[i].URL}" target="_blank" rel="external" data-siteId=${siteList[i].SiteId}>
                    <div class="site-card-top ">                    
                        <img class="site-card-img" src="${siteList[i].Img && !siteList[i].Img.startsWith('http') ?Site.IMG_HOST + "/" + siteList[i].SiteId + "/" + siteList[i].Img : siteList[i].Img}" alt="no images">
                        
                    </div>
                    <div class="site-card-mid bg-color-5">
                        <div>
                            ${siteList[i].NameKR ? siteList[i].NameKR : siteList[i].Name}                            
                        </div>
                        <ul class="site-detail-box">
                                                         
                        </ul>
                    </div>
                    <p class="site-card-bottom bg-color-5">
                        ${siteList[i].SiteDescription? siteList[i].SiteDescription : ""}   
                    </p>                         
                </a>     
                  
            </li>`;
        }
                        
        res += `
        </ul>`

        return res;
    }

    

    static listToHtmlv2(siteList){
        let res = "";
        if (!siteList || siteList.length === 0){
            res = `<div class="no-data-templet">현재 등록된 사이트가 없습니다.</div>`;
            return res;

        }

        res += `<ul id="site-card-box">`
        for (let i = 0 ; i < siteList.length; i++){
            // if (siteList[i].SiteDescription && siteList[i].SiteDescription.length > 80){
            //     siteList[i].SiteDescription = siteList[i].SiteDescription.slice(0, 80) + "...";
            // }
            res += `
            <li class="site-card">                    
                <div class="site_card_top_mid">
                    <a class="external_link" href="${siteList[i].URL}" target="_blank" rel="external" data-siteId=${siteList[i].SiteId}>
                        <div class="site_card_top">
                            <div>                            
                                <img class="site_card_img" src="${siteList[i].Img && !siteList[i].Img.startsWith('http') ? Site.IMG_HOST + "/" + site.SiteId + "/" + site.Img : '../images/noImage.jpg'}" alt="no images">
                            </div>                                
                            <div>
                                ${siteList[i].NameKR ? siteList[i].NameKR : siteList[i].Name}<br>
                            </div>
                        </div>
                        <ul class="site-detail-box">
                            <li>클릭 수 ${siteList[i].Views}</li>
                            <li>좋아요 ${siteList[i].Good}</li>
                            <li>싫어요 ${siteList[i].Bad}</li>                                
                        </ul>   
                        <p class="site_card_description">
                            ${siteList[i].SiteDescription? siteList[i].SiteDescription : ""}                              
                        </p>                            
                    </a>                                                        
                </div>                    
                <div class="site_card_bottom" 
                data-siteId=${siteList[i].SiteId}
                data-siteURL=${siteList[i].URL}>
                    <input type="button" name="좋아요요요??" value="좋아요">
                    <input type="button" value="내 즐겨찾기" class="remove-my-bookmark">
                </div>
            </li>`;
        }
                        
        res += `
        </ul>`

        return res;
    }

    static listToHtmlForAdmin(siteList){
        let res = "";

        res += `<ul id="site-card-box" class="bg-color-3">`
        if (!siteList || siteList.length === 0){
            res += `<div class="no-data-templet">등록된 사이트가 없습니다.</div>`;

        } else {
            for (let i = 0 ; i < siteList.length; i++){
                if (siteList[i].SiteDescription && siteList[i].SiteDescription.length > 80){
                    siteList[i].SiteDescription = siteList[i].SiteDescription.slice(0, 80) + "...";
                }
                res += `
                <li class="site-card">
                    <a class="external_link" href="siteDetail.html?site=${siteList[i].SiteId}"  rel="external" data-siteId=${siteList[i].SiteId}>
                        <ul class="site-card-list">
                            <li>
                                <img class="site_card_img" src="${siteList[i].Img && !siteList[i].Img.startsWith('http') ? this.IMG_HOST + "/" + siteList[i].SiteId + "/" + siteList[i].Img : '../images/noImage.jpg'}" alt="no images">    
                            </li>
                            <li>
                                <div class="info-top">
                                    ${siteList[i].URL}
                                </div>  
                                <div class="info-bottom">
                                    ${siteList[i].NameKR ? siteList[i].NameKR : siteList[i].Name}
                                </div>                                
                            </li>
                            <li>
                                <div class="info-top">
                                    ${this.siteStatus[siteList[i].Status]}
                                </div>
                                <div class="info-bottom">
                                    ${siteList[i].Categories && siteList[i].Categories.length > 0? "카테고리 등록" : "카테고리 미등록"}
                                </div>                                                            
                            </li>                            
                            <li>
                                ${siteList[i].SiteDescription}                            
                            </li>                        
                        </ul>                                             
                    </a>
                </li>`;
            }
        }
        
                        
        res += `
        </ul>`

        return res;
    }

    
    static updateViews(siteId){
        let data = ApiRequest.axiosPatch("/site/views", {
            SiteId : siteId
        });

        // 카테고리 불러오기
        // let data = axios.patch(`${this.API_HOST}/site/views`, {
        //     SiteId : siteId
        // },
        // {
        //     headers: {
        //         'Content-Type' : 'application/json'
        //     }
            
        // })
        // .then((result) => {
        //     console.log(result);            
        // })
        // .catch((error) => {
        //     console.error(error);
        // });        
    }

    updateGood(memberId, siteId){

    }

    static cardEvent(){        
        //조회수 측정 효과 추가
        const cardLinks = document.querySelectorAll(".external_link");
        cardLinks.forEach((element) => {
            element.addEventListener("click", (val)=>{
                // val.preventDefault();
                console.log(element);
                this.updateViews(element.dataset.siteid)
                
            });
        });

        // 좋아요, 즐겨찾기 이벤트 추가
        const cardAbleClick = document.querySelectorAll(".site_card_bottom");
        for (const one of cardAbleClick){
            one.addEventListener("click", (value)=>{
                alert("로그인이 필요합니다." + value.target.parentNode.dataset.siteid);
                console.log(value.target.parentNode.dataset);
            })
        }
    }

    

    // 개수 많아지면 페이지 추가
    static async getAllSitesAdmin(page){
        let data = ApiRequest.axiosGet("/site/admin/all");
        // 모든 사이트 조회
        // let data = await this.axiosGet(`${this.API_HOST}/site/admin/all`);        
        return data;
    }

    // 개수 많아지면 페이지 추가
    static async getAllSites(page){
        let data = ApiRequest.axiosGet("/site");

        // 모든 사이트 조회
        // let data = await this.axiosGet(`${this.API_HOST}/site`);        
        return data;
    }

    // 개수 많아지면 페이지 추가
    static async getRecommendedSite(page){

        let data = ApiRequest.axiosGet("/site/recommend");
        return data;
    }


    static async getSiteByCategory(categoryId, page){
        let data = ApiRequest.axiosGet(`/site/category?id=${categoryId}&page=${page}`);
        // let data = await this.axiosGet(`${this.API_HOST}/site/category?id=${categoryId}&page=${page}`);        
        return data;
    }

    static async getSiteById(siteId){
        let data = ApiRequest.axiosGet(`/site/admin?id=${siteId}`);
        // let data = await this.axiosGet(`${this.API_HOST}/site/admin?id=${siteId}`);
        return data;
    }

    // 사이트 검색
    static async getSiteBySearchWord(word){
        let data = ApiRequest.axiosGet(`/site/search?key=${word}`);
        // let data = await this.axiosGet(`${this.API_HOST}/site/admin?id=${siteId}`);
        return data;
    }

    //사이트 등록
    static addSiteAdmin(site){
        let data = ApiRequest.axiosPost("/site", site);
        
        return data;
    }

    //사이트 수정
    static async updateSiteAdmin(site){
        let data = ApiRequest.axiosPut(`/site/admin`, site);
        
        // let data = await this.axiosPut(`${this.API_HOST}/site/admin`, site);
        return data;        
    }

    static async axiosPost(url, body){
        let data = await axios.post(url, body)
        .then((result) => {
            console.log(result); 
            return result.data;   
        })
        .catch((error) => {
            console.error(error);            
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
            return error.response.data;
        });
        return data;
    }

    static async axiosGet(url){
        let data = await axios.get(url)
        .then((result) => {
            console.log(result);
            return result.data;   
        })
        .catch((error) => {
            console.error(error);            
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
            return error.response.data;
        });
        return data;
    }

    static async axiosPut(url, body){
        let data = await axios.put(url, body)
        .then((result) => {
            console.log(result); 
            return result.data;   
        })
        .catch((error) => {
            console.error(error);            
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
            return error.response.data;
        });
        return data;
    }

    

    
}