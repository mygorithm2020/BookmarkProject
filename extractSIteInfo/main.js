console.log("extract");

// url을 입력하면 
// 필요한 정보를 json 형태로 뱉어주기

async function getSiteInfo(siteUrl){

    console.log(siteUrl);

    let targetUrl = "";
    // 주어진 정보에서 host 추출
    let range = siteUrl.length;
    // 3번쨰 /를 발견하면 끝
    let targetCnt = 0;
    for (let i = 0; i < siteUrl.length; i++){
        if (siteUrl[i] ==="/"){
            targetCnt ++;
        }

        if (targetCnt === 3){
            range = i;
            break;
        }
    }
    targetUrl = siteUrl.slice(0, range);
    console.log(targetUrl);

    // 추출한 host로 get api
    const resData = await fetch(targetUrl, {
        mode: "no-cors", // no-cors, *cors, same-origin
    }).then((res) => {
        console.log(res);
        return res.text();
    }        
    ).then((da) => {
        console.log(da.substring(0, 20));
        // const qq = document.createElement(da);
        return da;
    });
    console.log(resData.substring(0, 40));
    // const response = await fetch(targetUrl);
    // response
    // console.log(response.text);
    

    // 받은 html 파일에서 필요한 정보 추출

    // title

    // favicon img

    // description


};


getSiteInfo("https://www.auction.co.kr/??pid=867&gclid=Cj0KCQjw6auyBhDzARIsALIo6v9ijGI3JzCry4ixY4AC09qZh1dB_xluwB4NFpdBZMavtGVRYxiYw0IaAmjSEALw_wcB&cosemkid=go16897633308650003&gate_id=c78b393f-6b7b-4851-959a-61dbaf62ed1f&redirect=1");