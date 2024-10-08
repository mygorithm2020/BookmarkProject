// // const axios = require('axios');

// // let config = {
// //   method: 'get',
// //   maxBodyLength: Infinity,
// //   url: 'https://www.ingangdream.com/images/logo.png?h=2024092322',
// //   headers: { }
// // };

// // axios.request(config)
// // .then((response) => {
// //   console.log(JSON.stringify(response.data));
// // })
// // .catch((error) => {
// //   console.log(error);
// // });

// class Qss {
//     Abc;
//     Edd;
// }

// const obj = new Qss();

// console.log(obj);
// asd(obj);
// console.log(obj);

// function asd(qss){
//     qss.Abc = "sdsd";
//     return;
//     qss.Edd = "xxx";
// }

let aa = 0;

function test(){
    // new Promise() 추가
    return new Promise(function(resolve, reject) {
        for (let idx=0; idx<10; idx++){
            aa++;
            console.log(aa);
        }
        // $.get('url 주소/products/1', function(response) {
        // // 데이터를 받으면 resolve() 호출
        // resolve(response);
        // });
    });    
    
}

test();
test();