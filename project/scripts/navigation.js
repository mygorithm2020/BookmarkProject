
console.log("navi");
let q = document.getElementById("nav_list_box");

// 카테고리 불러오기
axios.get("http://localhost:3000/category")
.then((result) => {
    console.log(result);
    for (const d of result.data){
        
        q.insertAdjacentHTML("beforeend", `<li><a href="./category.html?key=${d.Name}">${d.NameKR}</a></li>`);
    }
})
.catch((error) => {
    console.error(error);
});

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




// 카테고리 데이터 불러오기
// q.insertAdjacentHTML("beforeend", );

// <li><a href="./category.html?key=utility">도움되는 사이트</a></li>
