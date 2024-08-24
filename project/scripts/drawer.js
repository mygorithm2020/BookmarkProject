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
const drawer = new Drawer(document.querySelector(".drawer"));
document.getElementById("enquiry").addEventListener("click", e =>{
    if (drawer.isOpen){
        drawer.close();
    } else {
        drawer.open();
    }
});