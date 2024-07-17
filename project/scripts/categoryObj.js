
export class Category{

    CategoryId;
    ParentId;
    Layer;
    Name;
    NameKR ;
    Status;
    Sequence;
    IsDeleted;
    CreatedDate;
    UpdatedDate;
    Sites;

    static staticTest = "staticValue";

    static categories = [];

    // AJAX
    getCategoryAdmin(){
        // 카테고리 불러오기
        let data = axios.get("http://localhost:3000/category/admin")
        .then((result) => {
            console.log(result);
            return result.data;
            
        })
        .catch((error) => {
            console.error(error);
            if (error.code === "ERR_NETWORK"){
                // 현재 이용 불가능한 무언가 띄우기...
                // alert("현재 서버 점검 중으로 이용할 수 없습니다.")
                document.querySelector("main").innerHTML = "<h2 id='server_check'>현재 서버 점검 중으로 이용할 수 없습니다.</h2>";

            }
            return null;
        });
        
        return data;
    }

    getCategory(){
        // 카테고리 불러오기
        let data = axios.get("http://localhost:3000/category")
        .then((result) => {
            console.log(result);
            return result.data;
            
        })
        .catch((error) => {
            console.error(error);
            if (error.code === "ERR_NETWORK"){
                // 현재 이용 불가능한 무언가 띄우기...
                // alert("현재 서버 점검 중으로 이용할 수 없습니다.")
                document.querySelector("main").innerHTML = "<h2 id='server_check'>현재 서버 점검 중으로 이용할 수 없습니다.</h2>";

            }
            return null;
        });
        
        return data;
    }


    async setNavigationBox(categories){
        let q = document.getElementById("nav_list_box");
        
        // 세팅
        for (const d of categories){                
            q.insertAdjacentHTML("beforeend", `<li><a href="./category.html?key=${d.Name}">${d.NameKR}</a></li>`);
        }

        // 카테고리 바 확장
        document.getElementById("category-open").addEventListener("click", e => {
            console.log("category-open click");
            const cate = document.getElementById("category-box-expand");
            cate.classList.toggle("hidden");
            // if (cate.style.display == "none"){
            //     cate.style.display = "block";
            //     cate.style.opacity = 1;
            //     cate.style.transition = "0.5s";
            // } else {
            //     cate.style.opacity = 0;
            //     cate.style.transition = "0.5s";
            //     cate.style.display = "none";        
            // }
        });

    }

    // 카테고리 리스트를 보기 좋게 리스트 변경
    transFormCategories(categories){
        let res = [];
        for (const cateIdx of categories){
            if (cateIdx.Layer === 1){
                res.push(cateIdx);
                
                for (const cateJdx of categories){
                    if (cateJdx.Layer === 2 && cateJdx.ParentId === cateIdx.CategoryId){
                        res.push(cateJdx);
                    }                
                }
            }            
        }

        return res;
    }

    // html 문구 생성

    listToHtmlForAdmin(categories){
        let res = "";
        if (!categories || categories.length === 0){
            
            res = `<div class="no-data-templet">현재 조회되는 카테고리가 없습니다.</div>`;
            return res;
        }
        res += `<table id="category_list">
                <tr class="category_card">
                  <th>&nbsp;</th>
                  <th>계층</th>
                  <th>이 름</th>
                  <th>한글 이름</th>                  
                  <th>상태</th>
                  <th>생성 일시</th>
                </tr>`
        for (let i = 0 ; i < categories.length; i++){
            res += `
            <tr class="category_card category-layer${categories[i].Layer}">
                <td>${i+1}</td>
                <td>${categories[i].Layer}</td>
                <td>${categories[i].Name}</td>
                <td>${categories[i].NameKR}</td>                
                <td>${categories[i].Status}</td>
                <td>${categories[i].CreatedDate}</td>                
            </tr>`;
        }                        
        res += `</table>`

        return res;
    }

    listToHtmlForAdminSummary(categories){
        let res = "";
        if (!categories || categories.length === 0){
            
            res = `<div class="no-data-templet">현재 조회되는 카테고리가 없습니다.</div>`;
            return res;
        }
        res += `<ul id="category-box">`
        for (let i = 0 ; i < categories.length; i++){
            res += `
            <li class="category-card">
                <p>${categories[i].Name}</p>
                <p>${categories[i].NameKR}</p>
            </li>`;
        }                        
        res += `</ul>`

        return res;
    }
}