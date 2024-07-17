import { Site } from "./site.js";
import { Category } from "./categoryObj.js";


let curUrl = new URL(document.location.toString());
console.log(curUrl.pathname);
let pageKey = curUrl.searchParams.get("key");
console.log(pageKey);

let mainContent01El = document.getElementById("main_content01");

// 사이트 조회
const site = await Site.getSiteById(pageKey);

if (!site){
  alert("존재하지 않는 사이트 입니다.");
  window.location.href = "index.html?key=site";
}


// 카테고리 조회
let cqdsd = new Category();
Category.categories = await cqdsd.getCategoryAdmin();

// 내용 표시
mainContent01El.insertAdjacentHTML("beforeend", siteDetailtoHtmlAdmin(site, Category.categories));

// 수정하기 버튼 클릭 이벤트 추가


function siteDetailtoHtmlAdmin(site, categories){
    let res = '';
    res += `<form>
                <table>
                    <tr>
                      <th>항목</th>
                      <th>내용</th>                
                    </tr>
                    <tr>
                      <td>URL</td>
                      <td>${site.URL}</td>
                    </tr>
                    <tr>
                      <td>이름</td>
                      <td><input style="width:500px;" type="text" value="${site.Name? site.Name : ""}"></td>
                    </tr>
                    <tr>
                      <td>한국이름</td>
                      <td><input type="text" value="${site.NameKR? site.NameKR : ""}"></td>
                    </tr>
                    <tr>
                      <td>이미지</td>
                      <td><img src="${site.Img}"></td>
                    </tr>
                    <tr>
                      <td>설명</td>
                      <td><textarea>${site.SiteDescription? site.SiteDescription : ""}</textarea></td>
                    </tr>
                    <tr>
                      <td>방문 수</td>
                      <td>${site.Views}</td>
                    </tr>
                    <tr>
                      <td>좋아요</td>
                      <td>${site.Good}</td>
                    </tr>
                    <tr>
                      <td>싫어요</td>
                      <td>${site.Bad}</td>
                    </tr>
                    <tr>
                      <td>상태</td>
                      <td>
                        <select name="status" >
                            <option value="uploading" ${site.Status == 1 ? "selected" : ""} disabled>등록</option>
                            <option value="showing" ${site.Status == 2 ? "selected" : ""} >표시</option>
                            <option value="postpone" ${site.Status == 3 ? "selected" : ""} >보류</option>
                            <option value="hiding" ${site.Status == 4 ? "selected" : ""} >숨기기</option>
                            <option value="uploadingError" ${site.Status == 5 ? "selected" : ""} disabled>자동 등록 중 에러</option>
                            <option value="uploadingComplete" ${site.Status == 6 ? "selected" : ""} disabled>자동 등록 완료</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td>등록날짜</td>
                      <td>${site.CreatedDate}</td>
                    </tr>
                    <tr>
                      <td>마지막 수정 날짜</td>
                      <td>${site.UpdatedDate}</td>
                    </tr>
                    <tr>
                        <td>카테고리</td>
                        <td>
                            <div>
                            `

            for (const category of categories){
              let isChecked = false;              
              if (site.Categories && site.Categories.length > 0){                
                
                for (const siteCategory of site.Categories){                  
                  
                  if (siteCategory.CategoryId === category.CategoryId){
                                   
                    isChecked = true;
                    break;
                  }
                }
              }
              
              res += `
              <input
                type="checkbox"
                name="category"
                value="${category.CategoryId}" ${isChecked? "checked" : ""} />
              <label for="subscribeNews">${category.NameKR}</label>`              
            }
            res += `
                          </div>
                              
                        </td>
                      </tr>
                </table>

                <input type="submit" value="사이트 수정">
                
            </form>`

    return res;
}