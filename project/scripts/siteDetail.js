import { Site } from "./site.js";

(async function(){
    let curUrl = new URL(document.location.toString());
    let siteId = curUrl.searchParams.get("site");

    let mainContent01El = document.getElementById("main_content01");
    const site = await Site.getSiteById("6618441af53d42e6ae0ec4d2ce993fe3");

    if (!site){
        alert("존재하지 않는 사이트 입니다.");
        window.location.href = "index.html";
        return;
    }
    console.log(site);

    mainContent01El.insertAdjacentHTML("beforeend", siteDetailtoHtml(site));

    Site.siteEvent();
}
)();


function siteDetailtoHtml(site){
    let res = `
    <div id="detail-top">
        <img src='${site.Img && site.Img.startsWith("http") ? site.Img : Site.IMG_HOST  + "/" + site.SiteId + "/" + site.Img}' alt="no images">
        <div>
            <ul id="top-content">
                <li>
                    <a class="external_link" href="${site.URL}" target="_blank" rel="external" data-siteId=${site.SiteId}>${site.URL}</a>
                </li>
                <li>
                    ${site.NameKR? site.NameKR : site.Name}
                </li>
            </ul>
        </div>
    </div>
    <ul>
        <li>
            <ul>
                <li>
                    카테고리
                </li>
                <li>
                    <ul>`;
    for (const category of site.Categories){
        res += `<li><a href="./category.html?key=${category.Name}">${category.NameKR}</a></li>`
    }                           
    res +=         `</ul>
                </li>
            </ul>                    
        </li>                
        <li>
            ${site.SiteDescription}                   
        </li>
        <li>
            <ul>
                <li>
                    키워드
                </li>
                <li>
                    ${site.Keywords? site.Keywords : ""}                         
                </li>
            </ul>                    
        </li>
    </ul>
    <ul>
        <li>조회수 ${site.Views}</li>
        <li>좋아요 ${site.Good}</li>
        <li>싫어요 ${site.Bad}</li>
        <!-- <li><button>신고하기</button></li> -->
    </ul>
    <div>
        댓글
        <form>                    
            <textarea maxlength="200" placeholder="최대 200자까지 사이트에 대한 자유로운 의견을 남겨주세요"></textarea>
            <input type="submit" value="입력">
        </form>
    </div>
    <ul>
        <li>
            <ul>
                <li>댓글</li>
                <li>작성자</li>
                <li>작성날짜</li>
            </ul>
        </li>
        <li>
            <ul>
                <li>댓글</li>
                <li>작성자</li>
                <li>작성날짜</li>
            </ul>
        </li>
        <li>
            <ul>
                <li>댓글</li>
                <li>작성자</li>
                <li>작성날짜</li>
            </ul>
        </li>
        <li>
            <ul>
                <li>댓글</li>
                <li>작성자</li>
                <li>작성날짜</li>
            </ul>
        </li>
    </ul>
    `;
    return res;
}

