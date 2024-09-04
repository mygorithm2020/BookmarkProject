import {v4 as uuidV4} from 'uuid'
import * as bcrypt from 'bcrypt';
import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';
import * as path from "path";
import * as fs from 'fs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomUtils{

    //  피셔-예이츠 셔플(Fisher-Yates shuffle)
  shuffle<T>(array : T[]) {
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

  get32UuId(): string{
    const newId = uuidV4().replaceAll("-", "");
    return newId;
  } 

  // 원하는 길이
  getUuId(len : number): string{
    if (len <= 0) {
      throw new Error("len is bigger than zero");
    }
    const newId = uuidV4().replaceAll("-", "").slice(0, len);
    return newId;
  }


  // utc 타임스탬프 리턴
  getUTCDate(): Date{
    var date = new Date();
    var now_utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(),
                    date.getUTCDate(), date.getUTCHours(),
                    date.getUTCMinutes(), date.getUTCSeconds());
    let res = new Date(now_utc);
    return res;
  }

  // 콘솔로그와 해당 파일의 위치까지 출력
  logWithLocation(message) {
    const stack = new Error().stack;
    const lines = stack.split('\n');
    const callerLine = lines[2]; // 스택에서 호출자의 정보가 포함된 라인
    const logMsg = {
      Loc : callerLine.trim(),
      msg : message
    }
    console.log(logMsg);
  }

  
  
}

@Injectable()
export class FileAdapter{
  // 파일읽기

  // 파일쓰기
  // 절대 경로 기준으로 경로 및 파일명 설정
  async saveTheFile(data, fileName : string, ...paths : string[]) : Promise<void>{
    try{
      const filePath = path.resolve(__dirname, '..', '..', ...paths, fileName);
      if (!fs.existsSync(path.dirname(filePath))){
        fs.mkdirSync(path.dirname(filePath), { recursive: true });
      }
      // fs.writeFileSync(filePath, data);
      fs.writeFile(filePath, data, (err) => {
        console.log(err);
      });

    } catch (err) {
      throw err; 
    }
    
  }

  async removeDirectory(dirPath: string): Promise<void> {
    try {
      // 디렉토리의 모든 파일 및 하위 디렉토리 가져오기
      const files = fs.readdirSync(dirPath);
      for (const file of files) {
        const filePath = path.join(dirPath, file);
        const stats = fs.statSync(filePath);

        fs.unlinkSync(filePath);
      }
      // 디렉토리 자체를 삭제
      console.log(`Directory ${dirPath} deleted successfully.`);
    } catch (error) {
      console.error(`Error while deleting directory ${dirPath}: ${error.message}`);
      
    }
  }

  async removeFile(dirPath: string, filePath : string): Promise<void> {
    try {
      // 디렉토리의 모든 파일 및 하위 디렉토리 가져오기
      const files = fs.readdirSync(dirPath);
      for (const file of files) {
        // const filePath = path.join(dirPath, file);
        const stats = fs.statSync(filePath);

        fs.unlinkSync(filePath);
      }
      // 디렉토리 자체를 삭제
      console.log(`Directory ${dirPath} deleted successfully.`);
    } catch (error) {
      console.error(`Error while deleting directory ${dirPath}: ${error.message}`);
      
    }
  }

  // 예외 파일들 제외하고 디렉터리 내부 파일들 삭제
  removeFiles(dirPath : string, exceptFiles? : string[]){

    try{

    } catch {

    }
  }

  writeLog(data, fileName : string, ...paths : string[]) : void{
    try {
      const dataWithNewline = `${data}\n`;
      const filePath = path.resolve(__dirname, '..', '..', ...paths, fileName);
      if (!fs.existsSync(path.dirname(filePath))){
        fs.mkdirSync(path.dirname(filePath), { recursive: true });
        // 오래된 파일 삭제도 넣자
      }
      fs.appendFile(filePath, dataWithNewline, 'utf-8', (err) => {

      })
      // fs.appendFileSync(filePath, dataWithNewline, 'utf-8');
    } catch (error) {
      console.error(`Failed to append data to file: ${error.message}`);
    }
  }

  writeTheTxtFile(data, fileName : string, ...paths : string[]) : void{
    try {
      const dataWithNewline = `${data}\n`;
      const filePath = path.resolve(__dirname, '..', '..', ...paths, fileName);
      if (!fs.existsSync(path.dirname(filePath))){
        fs.mkdirSync(path.dirname(filePath), { recursive: true });
      }
      fs.appendFileSync(filePath, dataWithNewline, 'utf-8');
      // await fs.promises.app(FilePath, data, 'utf8');
    } catch (error) {
      console.error(`Failed to append data to file: ${error.message}`);
    }
  }

  // 등등
  sdsdsd(){
    
  }
}

// 이건 의존성 주입 안하고 싱글톤 방법으로 놔둬 봄.....
// @Injectable()
export class CustomEncrypt {
  private static instance : CustomEncrypt;
  private constructor(){

  }

  static getInstance(): CustomEncrypt{
    if (!this.instance){
      this.instance = new CustomEncrypt();
    }
    return this.instance;

  }

  test(){
    console.log("customEncyrptq");
  }

  // 해시 암호화
  encryptHash(originStr : string, salt : string | number = 11) : string{
    // 해시 암호 SHA256으로 구현 필요 결과 64자
    // 256이 gpu 연산에 취약해지고 있어서 bcrypt라는 모듈 사용
    // salt 값이 증가할수록 속도가 급격히 느려짐
    let res = bcrypt.hashSync(originStr, salt);

    return res;
  } 

  // 해쉬 암호화 값 비교  

  private static AESIV : string = "Wtjz2y05x53ahONSbDa7AA==";
  private static AESPASSWORD : string = 'customKey is mine';
  private static AESKEY : string = "m/zE7KOYFCV6oxFBvC2IiBC/C7WdQ/cjdMLuABFVdPM=";

  // 양방향 암호화
  encryptAes256(origin : string, aesKey? : string, aesIV? : string) : string{
    const password = 'customKey is mine';

    // The key length is dependent on the algorithm.
    // In this case for aes256, it is 32 bytes.
    const cipher = createCipheriv('aes-256-ctr', Buffer.from(CustomEncrypt.AESKEY, "base64"), Buffer.from(CustomEncrypt.AESIV, "base64"));

    const encryptedText = Buffer.concat([
      cipher.update(origin),
      cipher.final(),
    ]);
    return encryptedText.toString("base64");
  }

  decryptAes256(encryptedText : string) : string{
    let encryptedBuf = Buffer.from(encryptedText, "base64");
    const decipher = createDecipheriv('aes-256-ctr', Buffer.from(CustomEncrypt.AESKEY, "base64"), Buffer.from(CustomEncrypt.AESIV, "base64"));
    const decryptedText = Buffer.concat([
      decipher.update(encryptedBuf),
      decipher.final(),
    ])
    return decryptedText.toString("utf-8");
  }

  // AES266 암호화 벡터 생성
  getBase64NewIV() : string{
    const iv = randomBytes(16);
    return iv.toString("base64");
  }

  //AES 256 암호화 키 생성
  async getBase64NewKey(password : string) : Promise<string>{
    // const password = 'customKey is mine';
    const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
    return key.toString("base64");
  }

  
}
