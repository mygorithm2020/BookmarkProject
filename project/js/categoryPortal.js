import siteList from './data/site.json' with { type : "json"};

console.log(siteList);

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
            </li>
            `
        }        
        
    }
    if (cardList.length == 0){
        cardList += `<p>해당 카테고리에 등록된 사이트가 없습니다.</p>`
    }
    siteCardBoxEl.innerHTML = cardList;
})();



