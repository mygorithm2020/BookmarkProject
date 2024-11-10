function solution(N, K){
    let ans = 100000001;    
    let cnt = 0;    
    console.log(N, K);
    let time = 1;
    while (true){
        let curLoc = 1;
        let curVelo = 0;
        cnt = Math.floor((time - 1)/2);
        for (let idx=1; idx <= cnt+1; idx++){
            curVelo += K;
            curLoc += curVelo;
        }
        for (let jdx =0; jdx < time - (cnt+1) - cnt; jdx++){
            curLoc += curVelo;
        }

        for (let kdx=1; kdx <= cnt; kdx++){
            curVelo -= K;
            curLoc += curVelo;
        }

        console.log(time, cnt, time - (cnt+1) - cnt, curLoc);

        if (curLoc >= N){
            break;
        }
        time += 1;
    }
    console.log(time);
}

solution(9, 2);
solution(23, 2);
solution(10, 1);
// solution(1000000, 1);

// N 1 ~ 1000000
// K 1 ~ 2


//  풀이 전략
// 처음에는 가능한 모든 케이스를 탐색하며 찾으려다 경우의수 문제로 실패
// 그 다음에는 범위를 좁히기 위해 크게 변하는 경우부터 찾아가며 고정하려 했으나 실패
// 보다보니 어차피 가장 빠르게 가는 케이스는 정해져있고,,,, 그 케이스 내에서 도착점만 다르게 변경 가능하니 시간별로 가장 멀리 도달 가능한 거리를 찾고
// 그 거리 내에 목표점이 있으면 도착가능한 최소 시간, 물론 가속도의 변화까지는 알지못함 단지 최소시간만 계산 가능