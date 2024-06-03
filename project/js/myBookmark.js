import { Site } from "./site.js";
import { Bookmark } from "./bookmark.js";


// 즉시 호출 패턴 => 광역으로 변수 설정 안되게 막고, 재사용이 아닌 한번 사용하는 함수
(function () {
    console.log("mybookmark");
    let itemList = Bookmark.myBookmarkList();

    let ss = document.getElementById("main_content01");
    
    ss.insertAdjacentHTML("beforeend", Site.listToHtml(itemList));

})();