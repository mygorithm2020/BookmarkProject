import { Site } from "./site.js";
import { Bookmark } from "./bookmark.js";


// 즉시 호출 패턴 => 광역으로 변수 설정 안되게 막고, 재사용이 아닌 한번 사용하는 함수
(function () {
    console.log("mybookmark");
    let itemList = Bookmark.myBookmarkList();
    let ss = document.getElementById("main_content01");
    
    ss.insertAdjacentHTML("beforeend", Site.listToHtmlCart(itemList));

    const removeBtns = document.querySelectorAll(".remove-my-bookmark");
    removeBtns.forEach((v) => {
        v.addEventListener("click", () => {
            if (Bookmark.removeBookmark(v.dataset.siteurl)){
                // // 삭제후 리스트 초기화 => 이렇게 하면 이벤트가 사라져버리네...
                // document.getElementById("site-card-box").remove();
                // itemList = Bookmark.myBookmarkList();
                // ss.insertAdjacentHTML("beforeend", Site.listToHtmlCart(itemList));
                // 새로고침
                location.href = "";
            }            
        })
    });
})();