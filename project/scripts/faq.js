console.log("faq page");

let params = new URL(document.location.toString()).searchParams;
let key = params.get("key");
console.log(key);

let mainContent = document.getElementById("main_content01");
if (key){
    document.getElementById("notice_list").remove();

    switch(key){
        case "1":
            mainContent.insertAdjacentHTML("beforeend",
            `<table id="notice_detail">
            <tr class="notice_detail_row">
            <th>웹사이트 출시</th>
            <th>2024. 05. 31</th>
            <th>관리자</th>                  
            </tr>
            <tr class="notice_detail_row">
            <td colspan="3">
                <p><h4>2024. 00. 00 북마커 사이트가 출시되었습니다.</h4></p>
                <p>
                많은 관심 부탁드리며 주요 기능은 아래와 같습니다. <br><br>
                - 추천 사이트 확인 <br>
                - 카테고리별 사이트 분류 및 확인 <br>
                - 나만의 즐겨찾기 등록 <br>
                </p>
                <p>
                앞으로도 필요한 일부 기능들이 계속 출시 될 예정이며, 
                부족한 내용과 궁금한 내용은 FAQ를 확인하시거나, 문의부탁드립니다</br>

                감사합니다
                
                </p>
                <br>
                <p>관리자 및 개발자 올림</p>
                
                
            </td>
            </tr>
            </table>
            <div id="tolist_box">
            <a id="tolist_btn" href="faq.html">목록으로</a>
            </div>
            `
        );        
            break;
        default:
            mainContent.insertAdjacentHTML("beforeend",
            `<div style="text-align: center;"><h2 >해당 게시물이 존재하지 않습니다</h2></div>`
        );
    }
    
}

