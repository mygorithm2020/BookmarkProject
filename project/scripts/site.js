
export class Site {

    constructor(siteInfo){
        this.SiteId = siteInfo.SiteId;
        this.Name = siteInfo.Name;
        this.URL = siteInfo.URL;
        this.Image = siteInfo.Image;
        this.Description = siteInfo.Description;
        this.Keyword = siteInfo.Keyword;
        this.Views = siteInfo.Views;
        this.Like = siteInfo.Like;
        this.CreatedDt = siteInfo.CreatedDt;
        this.UpdatedDt = siteInfo.UpdatedDt;
    }


    // site 리스트를 html ul태그로 생성해주는 기능
    static listToHtml(siteList){
        let res = "";
        if (siteList == null){
            res = `<div>해당 카테고리에 등록된 사이트가 없습니다.</div>`;

        }else{
            res += `<ul id="site-card-box">`
            for (let i = 0 ; i < siteList.length; i++){
                if (siteList[i].Description.length > 40){
                    siteList[i].Description = siteList[i].Description.slice(0, 40) + "...";
                }
                res += `
                <li class="site-card">                    
                    <div>
                        <a href="${siteList[i].URL}" target="_blank" rel="external">
                            <div class="site_card_top">
                                <div>
                                    <img class="site_card_img" src="${siteList[i].Image}">
                                </div>                                
                                <div>
                                    ${siteList[i].Name}<br>
                                </div>
                            </div>
                            <ul class="site-detail-box">
                                <li>클릭 수 ${siteList[i].Views}</li>
                                <li>좋아요 ${siteList[i].Like}</li>
                                <li>싫어요 1만</li>                                
                            </ul>   
                            <p class="site_card_description">
                                ${siteList[i].Description}                              
                            </p>                            
                        </a>                                                        
                    </div>                    
                    <div class="site_card_bottom">
                        <input type="button" name="좋아요요요??" value="좋아요">
                        <input type="button" value="내 즐겨찾기 등록" class="add-my-bookmark"
                         data-siteId=${siteList[i].SiteId}
                         data-siteURL=${siteList[i].URL}
                         >
                    </div>
                </li>`;
            }
                            
            res += `
            </ul>`
        }

        return res;
    }

    // 숫자(뷰, 좋아요, 싫어요)
    // 1000 넘어가면 표기 변경 구현
    

    static listToHtmlv2(siteList){
        let res = "";
        if (!siteList || siteList.length === 0){
            console.log("sdd");
            res = `<div class="no-data-templet">현재 등록된 사이트가 없습니다.</div>`;
            return res;

        }

        res += `<ul id="site-card-box">`
        for (let i = 0 ; i < siteList.length; i++){
            if (siteList[i].SiteDescription && siteList[i].SiteDescription.length > 80){
                siteList[i].SiteDescription = siteList[i].SiteDescription.slice(0, 80) + "...";
            }
            res += `
            <li class="site-card">                    
                <div>
                    <a class="external_link" href="${siteList[i].URL}" target="_blank" rel="external" data-siteId=${siteList[i].SiteId}>
                        <div class="site_card_top">
                            <div>
                                <img class="site_card_img" src="${siteList[i].Img ? siteList[i].Img : '../images/noImage.jpg'}" alt="no images">
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
                            ${siteList[i].SiteDescription}                              
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

    
    static updateViews(siteId){
        // 카테고리 불러오기
        let data = axios.patch("http://localhost:3000/site/views", {
            SiteId : siteId
        },
        {
            headers: {
                'Content-Type' : 'application/json'
            }
            
        })
        .then((result) => {
            console.log(result);            
        })
        .catch((error) => {
            console.error(error);
        });        
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

    
}