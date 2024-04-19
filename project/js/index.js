console.log("open index");

function Drawer(el, open=false){
    this.el = el;
    this.isOpen = open;
    Object.assign(this.el.style, {
        display : "block",
        position: "fixed",
        top: 0,
        bottom: 0,
        right : 0,
        width: "350px",
        padding: "10px",
        backgroundColor: "white",
        boxShadow: "0 30px 10px 10px rgba(0,0,0,0.1)",
        transition: "all 0.4s ease-out"
    });
    (this.isOpen) ? this.open() : this.close();
}

Drawer.prototype.open = function() {
    this.isOpen = true;
    this.el.style.transform = "translate(0)";
}

Drawer.prototype.close = function() {
    this.isOpen = false;
    this.el.style.transform = "translate(400px)";
}

// header용 footer용도 따로 파야겠네...
window.addEventListener("load", () => {
    const drawer = new Drawer(document.querySelector(".drawer"));
    // 임의로 이렇게 처리할게 아니라 실제로 파일이 불러진 이후에 처리되는게 맞는거 같은데...
    setTimeout(() => {
        document.getElementById("enquiry").addEventListener("click", e =>{
            if (drawer.isOpen){
                drawer.close();
            } else {
                drawer.open();
            }
        });
        
    }, 1000);
    
});


document.getElementById("category-open").addEventListener("click", e => {
    const cate = document.getElementById("category-box-expand");    
    if (cate.style.display == "none"){
        cate.style.display = "block";
        cate.style.opacity = 1;
        cate.style.transition = "0.5s";
    } else {
        cate.style.opacity = 0;
        cate.style.transition = "0.5s";
        cate.style.display = "none";        
    }
})