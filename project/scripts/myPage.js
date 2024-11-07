let curUrl = new URL(document.location.toString());
let pageKey = curUrl.searchParams.get("key");

const siteMapTextEl = document.querySelector(".site-map-text");

switch (pageKey){
    case "favorite" :
        console.log(pageKey);
        break;
    case "manager" :
        console.log(pageKey);
        break;
    case "myinfo" :
        console.log(pageKey);
        break;
    case "password" :
        console.log(pageKey);
        break;
    case "resign" :
        console.log(pageKey);
        break;
    default:
        console.log("default");
        break;
}