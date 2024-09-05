import { Category } from "./categoryObj.js";

let curUrl = new URL(document.location.toString());
const categoryId = curUrl.searchParams.get("key");

let mainContent01El = document.getElementById("main_content01");

// 카테고리 조회
// 사이트 조회
const category = new Category();
let data = await category.getCategoryOneAdmin(categoryId);

if (!data){
  alert("존재하지 않는 카테고리 입니다.");
  window.location.href = "index.html?key=category";
}

mainContent01El.insertAdjacentHTML("afterbegin", categoryToHtmlAdmin(data));

// 수정하기 버튼 클릭 이벤트 추가
let categoryEdit = document.getElementById("category-edit-form");

categoryEdit.addEventListener("submit", async (target) => {
    target.preventDefault();
    const reqData = {
        CategoryId : categoryId
    }
    reqData.Name = categoryEdit.querySelector("input[name='name").value;
    reqData.NameKR = categoryEdit.querySelector("input[name='nameKR").value;
    for (const one of categoryEdit.querySelectorAll("input[name='status")){
        
        if(one.checked){
            reqData.Status = parseInt(one.value);
            break;
        }
    }

    
    if (!reqData.Name || !reqData.NameKR || !reqData.Status){
        alert("누락된 입력값이 있습니다.");
        return;
    }
    

    let res = await category.updateCategoryAdmin(reqData);
    if(res === 1){
        alert("수정완료하였습니다.");
    }else{
        alert("수정에 실패하였습니다.");
    }
});

// 삭제 버튼
document.querySelector("#category-delete").addEventListener("click", async ()=>{
    const res = await category.deleteCategoryAdmin(categoryId);
    if (res == ""){
        alert("카테고리가 삭제 되었습니다.");
        window.location.href = "/admin/?key=category";
    }
})

// 하위 카테고리 추가 버튼
let subCategory = document.getElementById("sub-category-add-box");
subCategory.addEventListener("submit", async (target) => {
    target.preventDefault();

    const reqData = {}
    reqData.ParentId = categoryId;
    reqData.Name = subCategory.querySelector("input[name='sname']").value;
    reqData.NameKR = subCategory.querySelector("input[name='snameKR']").value;
    if (!reqData.Name){
        alert("이름을 입력해주세요");
        return;
    }
    let res = await category.addCategoryAdmin(reqData);
    if (res && res.CategoryId){
        alert("등록에 성공했습니다.");
    }
})






function categoryToHtmlAdmin(category){
    let res = "";
    res +=`
    <form id="category-edit-form" >
        <ul id="category-edit-box">                    
            <li>
                <label for="name">이름</label>
                <input type="text" id="name" name="name" value="${category.Name}">

            </li>
            <li>
                <label for="nameKR">한글이름(표시)</label>
                <input type="text" id="nameKR" name="nameKR" value="${category.NameKR}">
                
            </li>
            <li>
                <label for="layer">계층(1이면 최상단)</label>
                <input type="number" id="layer" name="layer" value="${category.Layer}">                                                
            </li>
            <li>
                <label>상태</label>                        
                <input type="radio" id="status-1" name="status" value="1" disabled ${category.Status === 1? "checked" : ""}>
                <label for="status-1">등록</label><br>
                <input type="radio" id="status-2" name="status" value="2" ${category.Status === 2? "checked" : ""}>
                <label for="status-2">표시</label><br>
                <input type="radio" id="status-3" name="status" value="3" ${category.Status === 3? "checked" : ""}>
                <label for="status-3">보류</label>
                
            </li>
            <li>
                <label for="createdDate">생성일</label>
                <span name="createdDate">${new Date(category.CreatedDate).toLocaleString()}</span>
                
            </li>
            <li>
                <label for="updateDate">업데이트일</label>
                <span name="updateDate">${new Date(category.UpdatedDate).toLocaleString()}</span>                                          
            </li>                    
        </ul>
        <input class="category-edit-btn" type="submit" value="수정">
        <input class="category-edit-btn" type="reset" value="초기화">
    </form>
    <button id="category-delete" type="button">삭제</button>
    `;

    res +=`
    <h3>자식 카테고리 추가</h3>
    <form id="sub-category-add-box">
        <label for="sname">카테고리 이름(영문) : </label>
        <input type="text" placeholder="travel" name="sname" required>
        <label for="snameKR">한글이름(표시) : </label>
        <input type="text" placeholder="여행" name="snameKR" required>
        <input type="submit" value="추가">        
    </form>
    `

    return res;
}



