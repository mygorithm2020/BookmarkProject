import siteList from './data/site.json' with { type : "json"};

console.log(siteList[0]);

class MyBookmark {
    constructor(siteId, name, url, img, des, views){
        this._key = "my-bookmark";
        this.SiteId = siteId;
        this.Name = name;
        this.Url = url;
        this.Img = img;
        this.Des = des;
        this.Views = views;
    }

    addItem(item){
        this.items.push(item);        
    }

    removeItem(itemId){
        for (let idx = 0; idx < this.items.length; idx++){
            if (this.items[idx].SiteId === itemId){
                this.items.splice(idx, 1);
                break;
            }
        }
    }
}

// 즉각호출패턴
(function () {
    let siteCardBoxEl = document.getElementById("site-card-box");
    let cardList = "";
    for (let i =0 ; i<siteList.length; i++){
        // 포털에 해당하는 경우만 나중에는 db에 어차피 포털에 해당하는것만 가져올거임
        if (siteList[i].CategoryId === "2ca3d809ed7449978a4f9d8efc147145"){
            cardList +=`
            <li class="site-card">
                <a href="${siteList[i].URL}" target="_blank">
                    <div>
                        <img src="${siteList[i].Img}">
                        <ul class="site-detail-box">
                            <li>${siteList[i].NameKR ? siteList[i].NameKR : siteList[i].Name}</li>
                            <li>${siteList[i].URL}</li>
                            <li>${siteList[i].Description}</li>
                            <li>클릭 수 : ${siteList[i].Views}</li>
                            <li>좋아요 ${siteList[i].Like}</li>
                            <li>싫어요 ${siteList[i].Dislike}</li>
                            <li>등록 날짜 ${siteList[i].CreateDate}</li>
                            <li>내 즐겨찾기 등록</li>
                        </ul>
                    </div>
                </a>
                <div>
                    <input type="button" value="좋아요 싫어요">
                    <input type="button" value="내 즐겨찾기 등록">
                </div>
            </li>
            `
        }        
        
    }
    if (cardList.length == 0){
        cardList += `<p>해당 카테고리에 등록된 사이트가 없습니다.</p>`
    }
    // siteCardBoxEl.innerHTML = cardList;

    // 기존에 등록된 장바구니 목록 확인
    let mybooks = new MyBookmark();
    
    const itemString = localStorage.getItem(mybooks._key);
    let items = [];
    if (itemString){
        items = JSON.parse(itemString);
    } 

    // 로컬스토리지에 장바구니 추가
    document.querySelectorAll(".add-my-bookmark").forEach((v) => {
        v.addEventListener("click", (e) => {
            console.log(e.target.dataset.siteid);
            // 로그인 상태라면
            if (false){

            } else{
                let newSite = new MyBookmark(
                    e.target.dataset.siteid, 
                    e.target.dataset.name,
                    e.target.dataset.url,
                    e.target.dataset.img,
                    e.target.dataset.description,
                    e.target.dataset.views,
                );
    
                console.log(newSite);
                // 이미 있으면 ㄴㄴ
                for (let idx = 0; idx < items.length; idx ++){
                    if (items[idx].SiteId === newSite.SiteId){
                        return
                    }
                }
                items.push(newSite);
                localStorage.setItem(newSite._key, JSON.stringify(items));   

            }    
        })
    });
    
})();




