import { ApiRequest } from "./apiRequest.js";

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
    
    childCategories = [];

    static staticTest = "staticValue";

    static categories = [];

    API_HOST = ApiRequest.NEST_API_HOST + "/api";
    // API_HOST = "http://34.64.199.1:3000";

    // instance = axios.create({
    //     baseURL: ApiRequest.NEST_API_HOST + "/api",
    //     // ...other configs,
    //     timeout: 4000,
    //     withCredentials: true, // 인증 정보를 포함하도록 설정
    //     headers : {
    //         authorization : `Bearer ${ACCESSTOKEN}`            
    //     },
        
    // });

    async axiosDelete(path){
        let data = await ApiRequest.instance.delete(path)
        .then((result) => {
            console.log(result); 
            return result.data;   
        })
        .catch((error) => {
            console.error(error);            
            if (error.code === "ERR_NETWORK"){
                // 현재 이용 불가능한 무언가 띄우기...
                // alert("현재 서버 점검 중으로 이용할 수 없습니다.")
                alert("현재 서버 점검 중으로 수정할 수 없습니다.");
            } else if (error.response.data.errCode){
                // 백엔드에서 미리 처리못한 에러 발생 문의 필요
                if (error.response.data.errCode === 1){
                    alert("내부 오류가 발생했습니다.");
                }
            }
            return error.response.data;
        });
        return data;
    }

    async axiosPost(path, body){
        let data = await ApiRequest.instance.post(path, body)
        .then((result) => {
            console.log(result); 
            return result.data;   
        })
        .catch((error) => {
            console.error(error);            
            if (error.code === "ERR_NETWORK"){
                // 현재 이용 불가능한 무언가 띄우기...
                // alert("현재 서버 점검 중으로 이용할 수 없습니다.")
                alert("현재 서버 점검 중으로 수정할 수 없습니다.");
            } else if (error.response.data.errCode){
                // 백엔드에서 미리 처리못한 에러 발생 문의 필요
                if (error.response.data.errCode === 1){
                    alert("내부 오류가 발생했습니다.");
                }
            }
            return error.response.data;
        });
        return data;
    }

    async axiosGet(path){
        let data = await axios.get(path)
        .then((result) => {
            console.log(result); 
            return result.data;   
        })
        .catch((error) => {
            console.error(error);            
            if (error.code === "ERR_NETWORK"){
                // 현재 이용 불가능한 무언가 띄우기...
                // alert("현재 서버 점검 중으로 이용할 수 없습니다.")
                alert("현재 서버 점검 중으로 수정할 수 없습니다.");
            } else if (error.response.data.errCode){
                // 백엔드에서 미리 처리못한 에러 발생 문의 필요
                if (error.response.data.errCode === 1){
                    alert("내부 오류가 발생했습니다.");
                }
            }
            return error.response.data;
        });
        return data;
    }

    async addCategoryAdmin(category, errCallback){
        let data = await ApiRequest.axiosPost("/category/admin", category, null);
        if (data && data.errCode){
            const code = data.errCode;
            if (code === 21){
                alert("이미 등록된 카테고리 이름입니다.");
            }
        }
        return data;


        // 카테고리 불러오기
        // let data = await axios.post(`${this.API_HOST}/category/admin`, category)
        // .then((result) => {
        //     console.log(result); 
        //     return result.data;   
        // })
        // .catch((error) => {
        //     console.error(error);            
        //     if (errCallback){
        //         errCallback(error);
        //     }else{
        //         if (error.code === "ERR_NETWORK"){
        //             // 현재 이용 불가능한 무언가 띄우기...
        //             alert("현재 서버 점검 중으로 이용할 수 없습니다."); 
        //         }else if (error.response.data.errCode){
        //             const code = error.response.data.errCode;
        //             if (code === 21){
        //                 alert("이미 등록된 카테고리 이름입니다.");
        //             }else{
        //                 alert("등록에 실패했습니다. 관리자에게 문의하세요");
        //             }

        //         }else{
        //             alert("도중에 문제가 발생했습니다. 잠시 후 다시 이용해주세요");
        //         }
        //     }
            
        //     return error.response.data;
        // });
        // return data;
    }

    async deleteCategoryAdmin(categoryId){
        let res = await ApiRequest.axiosDelete(`/category/admin?id=${categoryId}`);
        if (res)
        // let res = this.axiosDelete(`/category/admin?id=${categoryId}`);
        return res;
    }

    async updateCategoryAdmin(category){
        let data = ApiRequest.axiosPatch("/category/admin", category);
        
        // let data = await axios.patch(`${this.API_HOST}/category/admin`, category)
        // .then((result) => {
        //     console.log(result); 
        //     return result.data;   
        // })
        // .catch((error) => {
        //     console.error(error);            
        //     if (error.code === "ERR_NETWORK"){
        //         // 현재 이용 불가능한 무언가 띄우기...
        //         // alert("현재 서버 점검 중으로 이용할 수 없습니다.")                
        //     }
        //     return error.response.data;
        // });
        return data;
    }

    // AJAX
    async getCategoryAdmin(){
        let data = await ApiRequest.axiosGet("/category/admin");

        // 정렬
        if (data){
            data.sort(function(a, b){
                if (a.NameKR > b.NameKR){
                    return 1;
                }
                if (a.NameKR === b.NameKR){
                    return 0;
                }
                if (a.NameKR < b.NameKR){
                    return -1;        
                }
            });
        }
        


        // 카테고리 불러오기
        // let data = axios.get(`${this.API_HOST}/category/admin`, { withCredentials: true })
        // .then((result) => {
        //     console.log(result);
        //     return result.data;
            
        // })
        // .catch((error) => {
        //     console.error(error);
        //     if (error.code === "ERR_NETWORK"){
        //         // 현재 이용 불가능한 무언가 띄우기...
        //         // alert("현재 서버 점검 중으로 이용할 수 없습니다.")
        //         document.querySelector("main").innerHTML = "<h2 id='server_check'>현재 서버 점검 중으로 이용할 수 없습니다.</h2>";

        //     }
        //     return null;
        // });
        
        return data;
    }

    getCategoryOneAdmin(categoryId){
        let data = ApiRequest.axiosGet(`/category/admin/${categoryId}`);
        // 카테고리 불러오기
        // let data = axios.get(`${this.API_HOST}/category/admin/${categoryId}`)
        // .then((result) => {
        //     console.log(result);
        //     return result.data;            
        // })
        // .catch((error) => {
        //     console.error(error);
        //     if (error.code === "ERR_NETWORK"){
        //         // 현재 이용 불가능한 무언가 띄우기...
        //         // alert("현재 서버 점검 중으로 이용할 수 없습니다.")
        //         document.querySelector("main").innerHTML = "<h2 id='server_check'>현재 서버 점검 중으로 이용할 수 없습니다.</h2>";

        //     }
        //     return null;
        // });
        
        return data;
    }

    getCategory(){
        const auth = 'qwdqwdqwdqd ' + "qwdqwdqwdwqdwdqwSD" + btoa('user:password');
        // 카테고리 불러오기
        let data = ApiRequest.instance.get("/category", {
            headers : {
                // Authorization: ApiRequest.HEADER_AUTH,
                cookies : decodeURIComponent(document.cookie)
            },
        })
        .then((result) => {            
            return result.data;            
        })
        .catch((error) => {
            console.error(error);
            if (error.code === "ERR_NETWORK"){
                // 현재 이용 불가능한 무언가 띄우기...
                // alert("현재 서버 점검 중으로 이용할 수 없습니다.")
                document.querySelector("main").innerHTML = "<h2 id='server_check'>현재 서버 점검 중으로 이용할 수 없습니다.</h2>";
                // document.querySelector("main").insertAdjacentHTML("beforeend","<h2 id='server_check'>현재 서버 점검 중으로 이용할 수 없습니다.</h2>");

            }
            return null;
        });
        
        return data;
    }


    setNavigationBox(categories){
        let q = document.getElementById("nav_list_box");
        
        if (!categories || categories.length === 0){
            q.insertAdjacentHTML("beforeend", `<li>등록된 카테고리가 없습니다.</li>`);
            return;
        }
        // 세팅
        for (const d of categories){    
            if (d.Layer === 1 || !d.ParentId){
                q.insertAdjacentHTML("beforeend", `<li id="${d.Name}"><a href="./category.html?key=${d.Name}">${d.NameKR}</a></li>`);
            }            
        }
    }

    //카테고리 확장 버튼 클릭시 목록 리스트 구현
    setExpandNavigationBox(categories){
        const subCategoryBox = document.getElementById("subcategory-box");
        const cate = document.getElementById("category-box-expand");
        let subCate = "";
        for(const cg of categories){
            subCate += `
            <li><a href="./category.html?key=${cg.Name}">${cg.NameKR}</a>   
                <ul class="category-expand-each-box">             
            `;
            for (const childCg of cg.childCategories){
                subCate += `<li><a href="./category.html?key=${childCg.Name}">${childCg.NameKR}</a> </li>`;
            }
            subCate += "</ul></li>";
        }
        subCategoryBox.insertAdjacentHTML("beforeend", subCate);

        // 카테고리 바 확장
        document.getElementById("category-open").addEventListener("click", e => {        
            cate.classList.toggle("hidden");
            cate.classList.toggle("show");
            // cate.classList.toggle("cover");
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

    // 카테고리 리스트를 보기 좋게 그룹화하기 리스트 변경
    transFormCategoriesLayerStructure(categories){
        let res = [];
        
        for (const cateIdx of categories){
            if (cateIdx.ParentId == null){
                res.push(cateIdx);
                cateIdx.childCategories = [];
                for (const cateJdx of categories){
                    if (cateJdx.ParentId === cateIdx.CategoryId){
                        cateIdx.childCategories.push(cateJdx);                        
                    }                
                }
            }   
        }
        return res;
    }

    // 카테고리 리스트를 보기 좋게 그룹화하기 리스트 변경
    transFormCategories(categories){
        let res = [];        
        
        for (const cateIdx of categories){
            
            if (!cateIdx.ParentId){
                res.push(cateIdx);
                
                for (const cateJdx of categories){
                    if (cateJdx.ParentId === cateIdx.CategoryId){
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
                <td><a href="categoryDetail.html?key=${categories[i].CategoryId}">${i+1}</a></td>
                <td>${categories[i].Layer}</td>
                <td>${categories[i].Name}</td>
                <td>${categories[i].NameKR}</td>                
                <td>${categories[i].Status}</td>
                <td>${categories[i].CreatedDate}</td>                
            </tr>
            `;
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