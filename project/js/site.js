
export class Site {

    constructor(siteInfo){
        this.SiteId = siteInfo.SiteId;
        this.Name = siteInfo.Name;
        this.URL = siteInfo.URL;
        this.Image = siteInfo.Image;
        this.Description = siteInfo.Description;
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
                         >
                    </div>
                </li>`;
            }
                            
            res += `
            </ul>`
        }

        return res;
    }
}