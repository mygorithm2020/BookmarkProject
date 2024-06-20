
console.log("navi");
let q = document.getElementById("nav_list_box").children;
console.log(q);

axios.get("http://localhost:3000/category")
.then((result) => {
    console.log(result);
    console.log(result.data); // {}
})
.catch((error) => {
    console.error(error);
});


// 카테고리 데이터 불러오기
// q.insertAdjacentHTML("beforeend", );
