console.log("notice page");

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
            <tr class="notice_detail_row ">
            <th>웹사이트 출시</th>                              
            </tr>
            <tr class="notice_detail_row">
            <td colspan="2">
                <p><h4>안녕하세요 이용자님 북마커 사이트가 출시되었습니다.</h4></p>
                <p>
                많은 관심 부탁드리며 주요 기능은 아래와 같습니다. <br><br>
                - 추천 사이트 확인 <br>
                - 카테고리별 사이트 분류 및 확인 <br>                
                </p>
                <p>
                앞으로도 필요한 기능들이 계속 출시 될 예정이며, 
                부족한 내용과 궁금한 내용은 FAQ를 확인하시거나, 문의부탁드립니다</br>

                감사합니다
                
                </p>                
            </td>
            </tr>
            </table>
            <div id="tolist_box">
            <a id="tolist_btn" class="bg-color-4" href="notice.html">목록으로</a>
            </div>
            `
            );        
            break;
        case "2":
            mainContent.insertAdjacentHTML("beforeend",
            `<table id="notice_detail">
            <tr class="notice_detail_row ">
            <th>이용약관</th>                              
            </tr>
            <tr class="notice_detail_row">
            <td colspan="2">
                <p><h4>이용약관</h4></p>
                <p>
                사이트에서 제공되는 타 사이트 링크 및 정보 이미지 등의 저작권은 모두 해당 사이트에 있으며, 본 사이트는 단지 연결을 주도하는 사이트입니다.<br>
                특정 사이트 불법, 도박, 범죄, 사회적으로 문제가 될 수 있는 사이트는 경고나 공지 없이 삭제될 수 있으며, 위와 같은 사이트는 추천해도 등록 되지 않습니다.<br>
                불법 혹은 과도한 접근이 확인되면 제제될 수 있습니다.<br>                
                </p>
                <p>
                앞으로도 필요한 기능들이 계속 출시 될 예정이며, 
                부족한 내용과 궁금한 내용은 FAQ를 확인하시거나, 문의부탁드립니다</br>

                감사합니다
                
                </p>                
            </td>
            </tr>
            </table>
            <div id="tolist_box">
            <a id="tolist_btn" class="bg-color-4" href="notice.html">목록으로</a>
            </div>
            `
            );        
            break;
        case "3":
            mainContent.insertAdjacentHTML("beforeend",
            `<table id="notice_detail">
            <tr class="notice_detail_row ">
            <th>개인정보처리방침</th>                              
            </tr>
            <tr class="notice_detail_row">
            <td colspan="2">
                <h3>1. 수집하는 개인정보 항목</h3>
                <ul>
                    <li>이메일 주소</li>
                    <li>닉네임</li>
                    <li>성별</li>
                    <li>생년월일</li>
                </ul>
                <h3>2. 개인정보의 수집 및 이용 목적</h3>
                <ul>
                    <li>회원 관리: 회원 식별, 가입 의사 확인, 회원 자격 유지 및 관리</li>
                    <li>서비스 제공: 맞춤형 서비스 제공, 콘텐츠 제공, 본인 인증</li>
                    <li>추천 시스템 제공: 개인 맞춤형 추천 서비스 제공</li>
                    <li>마케팅 및 광고: 신규 서비스 개발 및 맞춤형 광고 제공, 이벤트 정보 및 참여 기회 제공</li>
                </ul>
                <h3>3. 개인정보의 보유 및 이용 기간</h3>
                <ul>
                    <li>회원 탈퇴 시까지 보유 및 이용</li>
                    <li>관련 법령에 따라 보존할 필요가 있는 경우 해당 법령에서 정한 기간 동안 보존</li>
                    
                </ul>
                <h3>4. 개인정보의 제3자 제공</h3>
                <ul>
                    <li>원칙적으로 이용자의 개인정보를 제3자에게 제공하지 않습니다. 다만, 이용자의 동의가 있거나 법령에 의하여 요구되는 경우 예외로 합니다.</li>                
                </ul>
                <h3>5. 이용자의 권리와 그 행사 방법</h3>
                <ul>
                    <li>이용자는 언제든지 자신의 개인정보에 대해 열람, 수정, 삭제를 요청할 수 있습니다.</li>
                    <li>개인정보 열람, 수정, 삭제 요청은 [고객센터 이메일 주소]를 통해 가능합니다.</li>                
                </ul>  
                <h3>6. 개인정보 보호를 위한 기술적/관리적 대책</h3>
                <ul>
                    <li>개인정보의 안전한 처리를 위해 다음과 같은 대책을 강구하고 있습니다</li>
                    <ul>
                        <li>개인정보의 암호화</li>
                        <li>해킹 등에 대비한 기술적 대책</li>
                        <li>개인정보 접근 제한</li>
                    </ul>                
                </ul> 
                <h3>7. 개인정보 처리방침의 변경</h3>
                <ul>
                    <li>본 개인정보 처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경 내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.</li>
                </ul>   
                <br/>
                <h4>시행일: 2024년 8월 25일</h4>                
                            
            </td>
            </tr>
            </table>
            <div id="tolist_box">
            <a id="tolist_btn" class="bg-color-4" href="notice.html">목록으로</a>
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

