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

// 상황을 예측해보자 예약하려는데 예약 가능한 좌석이 있는지, 있다면 예약
// 리스트, 이진트리, 해시, 우선순위 큐, 

// 리스트의 경우 정렬 해놓은 상태에서 낮은 것 부터 해서 가능한 예약이 있으면 예약하고 해당 숫자를 제거....
//  n(탐색) + n(제거)

// 이진 트리의 경우 정렬 된 상태에서 해당 값을 찾으며, 계속해서 값보다 크면서 가장 작은 값을 저장, 해당 에약 가능 인원 삭제
//  logn(탐색) + n(삭제)

// 해시의 경우 해당 값 이상을 탐색(단 최대 값을 미리 저장해두어야 함), 값 삭제
//  n(탐색) + 1(삭제)

// 우선순위 큐의 경우 여기서 굳이.....??? 매번 새로운 값이 추가되면 의미가 있으나... 그게 아니라면 굳이 비효율적일듯...?
//  n(탐색) + logn (삭제)
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