import { Site } from "./site.js";
import { Category } from "./categoryObj.js";


let curUrl = new URL(document.location.toString());

let siteId = curUrl.searchParams.get("site");


let mainContent01El = document.getElementById("main_content01");

// 사이트 조회
const site = await Site.getSiteById(siteId);

if (!site){
  alert("존재하지 않는 사이트 입니다.");
  window.location.href = "index.html?key=site";
}


// 카테고리 조회
let cqdsd = new Category();
Category.categories = await cqdsd.getCategoryAdmin();
Category.categories = cqdsd.transFormCategoriesLayerStructure(Category.categories);

// 내용 표시
mainContent01El.insertAdjacentHTML("beforeend", siteDetailtoHtmlAdmin(site, Category.categories));

// 수정하기 버튼 클릭 이벤트 추가
let siteEdit = document.getElementById("site-edit-form");
siteEdit.addEventListener("submit", async (target) => {
  target.preventDefault();
  let confirmRes = window.confirm("정말 수정하시겠습니까?");
  if(confirmRes){
    siteEdit.disabled = true;
  } else {
    return;
  }

  //  여기서 값 추출하는 과정 추가 하고
  let nameValue = siteEdit.querySelector("input[name='nameKR']");
  console.log(nameValue);
  console.log(nameValue.value);
  console.log(siteEdit.querySelector("input[name='name']").value);
  console.log(siteEdit.querySelector("input[name='nameKR']").value);
  console.log(siteEdit.querySelector("input[name='img']").value);
  console.log(siteEdit.querySelector("textarea[name='siteDescription']").value);
  console.log(siteEdit.querySelector("select[name='status']").value);
  site.Categories = [];
  for(const one of siteEdit.querySelectorAll("input[name='category']")){
    console.log(one);
    if (one.checked){
      console.log(one.value + "checked");
      const category = new Category();
      category.CategoryId = one.value;
      site.Categories.push(category);
    }
  }
  
  // console.log(siteEdit.querySelector("input[name='nameKR']").value);

  site.Name = siteEdit.querySelector("input[name='name']").value;
  site.NameKR = siteEdit.querySelector("input[name='nameKR']").value;
  if (siteEdit.querySelector("input[name='img']").value){
    site.Img = siteEdit.querySelector("input[name='img']").value;
  } else {
    site.Img = undefined;
  }
  site.SiteDescription = siteEdit.querySelector("textarea[name='siteDescription']").value;
  site.Name = siteEdit.querySelector("input[name='name']").value;
  if (siteEdit.querySelector("select[name='status']").value > 4){
    site.Status = undefined;
  }else if (siteEdit.querySelector("select[name='status']").value <= 4){
    site.Status = siteEdit.querySelector("select[name='status']").value;
  }

  // 공개할떄 기본 정보가 없다면 한번 더 확인 받기
  if (site.Status == 2){
    if (!site.Name || !site.Img || !site.SiteDescription){
      let confirmMan = window.confirm("공개를 위한 필수값이 부족합니다. 정말로 공개하시겠습니까?");
      if(!confirmMan){
        return;
      }
    }
  }
  
  console.log(site);
  const res = await Site.updateSiteAdmin(site);
  if (res.SiteId){
    alert("수정이 완료되었습니다.");
    // 내용만 변경하면 이벤트 기능이 안 붙음
    // mainContent01El.querySelector("form").remove();
    // // 수정된 데이터로 변경

    // // 내용 표시
    // mainContent01El.insertAdjacentHTML("beforeend", siteDetailtoHtmlAdmin(site, Category.categories));
    location.reload();
  }else{
    alert("수정이 실패했습니다. 잠시 후 다시 시도해주세요!");

  }
  siteEdit.disabled = false;

});


function siteDetailtoHtmlAdmin(site, categories){
    let res = '';
    res += `<form id="site-edit-form">              
                <table>
                    <tr>
                      <th>항목</th>
                      <th>내용</th>                
                    </tr>
                    <tr>
                      <td>URL</td>
                      <td><a href="${site.URL}" target="_blank" rel="external">${site.URL}</a></td>
                    </tr>
                    <tr>
                      <td>이름</td>
                      <td><input name="name" type="text" value="${site.Name? site.Name : ""}"></td>
                    </tr>
                    <tr>
                      <td>한국이름</td>
                      <td><input name="nameKR" type="text" value="${site.NameKR? site.NameKR : ''}"></td>
                    </tr>                    
                    <tr>
                      <td>수정 희망 이미지</td>
                      <td>
                        <input name="img" type="text"></br>
                      </td>
                    </tr>
                    <tr>
                      <td>표시 이미지</td>
                      <td>         
                        <p>${site.Img}</p>
                        <img src='${site.Img && site.Img.startsWith("http") ? site.Img : Site.IMG_HOST  + "/" + site.SiteId + "/" + site.Img}' alt="no images">               
      
                      </td>
                    </tr>
                    <tr>
                      <td>표시 설명</td>
                      <td><textarea name="siteDescription">${site.SiteDescription? site.SiteDescription : ""}</textarea></td>
                    </tr>
                    <tr>
                      <td>제목</td>
                      <td>${site.Title}</td>
                    </tr>
                    <tr>
                      <td>파비콘 이미지</td>
                      <td>
                        <p>${site.FaviconImg}</p>
                        ${site.FaviconImg? "<img src='" + site.FaviconImg + "' alt='이미지 불러오기 실패'>" : "등록된 이미지 없음"}
                      </td>
                    </tr>
                    <tr>
                      <td>공식 설명</td>
                      <td>${site.Description}</td>
                    </tr>
                    <tr>
                      <td>키워드</td>
                      <td>${site.Keywords}</td>
                    </tr>
                    <tr>
                      <td>링크 제목</td>
                      <td>${site.OGTitle}</td>
                    </tr>
                    <tr>
                      <td>링크 사이트 이름</td>
                      <td>${site.OGSiteName}</td>
                    </tr>
                    <tr>
                      <td>외부 공유 이미지</td>
                      <td>
                        <p>${site.OGImg}</p>                        
                        ${site.OGImg? "<img src='" + site.OGImg + "' alt='이미지 불러오기 실패'>" : "등록된 이미지 없음"}
                      </td>
                    </tr>  
                    <tr>
                      <td>링크 설명</td>
                      <td>${site.OGDescription}</td>
                    </tr>
                    <tr>
                      <td>링크 URL</td>
                      <td>${site.OGURL}</td>
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
                        <select name="status">                                                
                          <option value="1" ${site.Status == 1 ? "selected" : ""} disabled>${Site.siteStatus[1]}</option>
                          <option value="2" ${site.Status == 2 ? "selected" : ""} >${Site.siteStatus[2]}</option>
                          <option value="3" ${site.Status == 3 ? "selected" : ""} >${Site.siteStatus[3]}</option>
                          <option value="4" ${site.Status == 4 ? "selected" : ""} >${Site.siteStatus[4]}</option>
                          <option value="5" ${site.Status == 5 ? "selected" : ""} disabled>${Site.siteStatus[5]}</option>
                          <option value="6" ${site.Status == 6 ? "selected" : ""} disabled>${Site.siteStatus[6]}</option>
                          <option value="7" ${site.Status == 7 ? "selected" : ""} disabled>${Site.siteStatus[7]}</option>
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
                            `;

            
            res += "<ul id='category-box'>";
              
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
              <li class="site-detail-category-list">
              <input
                id="${category.Name}"
                type="checkbox"
                name="category"
                value="${category.CategoryId}" ${isChecked? "checked" : ""} />
              <label for="${category.Name}">${category.NameKR}</label>
              `;
              for (const subCa of category.childCategories){
                let isChecked = false;
                for (const siteCategory of site.Categories){                                    
                  if (siteCategory.CategoryId === subCa.CategoryId){                                   
                    isChecked = true;
                    break;
                  }
                }
                res +=`
                <input
                  id="${subCa.Name}"
                  type="checkbox"
                  name="category"
                  value="${subCa.CategoryId}" ${isChecked? "checked" : ""} />
                <label for="${subCa.Name}">${subCa.NameKR}</label>
                `
              }
              
              res += "</li>";
            }
            res += "</ul>";
            res += `
                          </div>
                              
                        </td>
                      </tr>
                </table>

                <input type="submit" value="사이트 수정">
                
            </form>`

    return res;
}