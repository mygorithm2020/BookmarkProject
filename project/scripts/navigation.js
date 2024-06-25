
console.log("navi");

console.log(navigator);
console.log(window);

function getCategory(){
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
            alert("현재 서버 점검 중으로 이용할 수 없습니다.")
            document.querySelector("main").innerHTML = "<h2 id='server_check'>현재 서버 점검 중으로 이용할 수 없습니다.</h2>";

        }
        return null;
    });
    
    return data;
}

async function setNavigationBox(){
    const categorys = await getCategory();

    let q = document.getElementById("nav_list_box");
    
    // 세팅
    for (const d of categorys){                
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

setNavigationBox();
