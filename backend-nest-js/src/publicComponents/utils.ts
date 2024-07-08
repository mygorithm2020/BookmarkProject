import {v4 as uuidV4} from 'uuid'

export class CustomUtils{
    //  피셔-예이츠 셔플(Fisher-Yates shuffle)
  static shuffle<T>(array : T[]) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // 무작위 인덱스(0 이상 i 미만)
  
      // array[i]와 array[j]를 바꿔치기합니다.
      // 아래 답안에선 "구조 분해 할당(destructuring assignment)"이라 불리는 문법을 사용하여
      // 원하는 것을 구현하였는데,
      // 이 문법에 대한 자세한 내용은 이후 챕터에서 다룰 예정입니다.
      // 구조 분해 할당을 사용하지 않고 작성한 코드는 아래와 같습니다.
      // let t = array[i]; array[i] = array[j]; array[j] = t
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  static get32UuId(): string{
    const newId = uuidV4().replaceAll("-", "");
    return newId;
  } 
}