[Home](..)

# 프로젝트
북마크(즐겨찾기) 관리 및 추천 사이트 v2

## 개요
- 기간 : 2024. 06. 06 ~  2024.
- 기술 스택 : JavaScript, NodeJS, NestJS, Typescript, MySQL
- 목표 : v1 버전(정적웹사이트)에 백엔드 서버 및 DB 추가
- 프로젝트 실행 방법: 
- 링크 : 
- 결과 미리보기  
<br>
<!-- <img src="project/images/portal_ex.png" width="300px">
<img src="project/images/ai_ex.png" width="300px"> -->


### 내용
    url 등록시 html에서 파비콘을 찾거나 root/favicon.ico를 찾거나 둘다 없으면 수작업으로 페이지 메인 로고찾기

### 추가기능
    로그인과 관련된 유저 기능
    조회수 저장
    좋아요 저장
    카테고리 명확히 분류
    신규 사이트 등록 기능
    관리자 페이지
        등록된 사이트 목록
        추가 사이트 승인(사이트 노출 데이터 선택)
        사이트 삭제
        사이트 숨기기
        사이트 관련 통계 대시보드 만들기(전체 접속 수, 좋아요 수, 기타 등 대략적인 시각화)
    회원 페이지
        내 즐겨찾기 목록 => 폴더구조로 정리
        사이트 등록 및 추가 요청(웹사이트 담당자, 개인 구분) => url 입력시 파싱해서 main hostname만 추출해서 html 파일에 있는 기본 정보까지 불러오기
        나만의 사이트 목록 공유하기 => 재생목록 공유하듯 본인만의 사이트 목록을 만들어서 다른사람과 공유
    검색기능은...... 흠..................... => 아직 미정
    사이트 목록에서 남들이 공유한 목록도 볼수있게 넣기...

#### Backend(NestJS)
    nest g resource
    uuid
    typeORM
    app
    Decorator
    CORS
    env
    Swagger

#### 오류 해결
    - NestJS : HttpModule로 response의 html 파일 인코딩 방식이 euc-kr이면 문자가 깨지는 현상,  utf-8이면 정상
        - 버퍼로 데이터 받은 후 iconv-lite 모듈로 헤더의 콘텐츠 타입 및 인코딩 방식 확인 후 디코딩
        - nest에서 사용시 그냥 import하면 에러가 발생하는 경우 import * as iconv from "iconv-lite"으로 변경
    -  



### 환경세팅
- npm v10.2.3
- nest
- mysql 8.0.37
- @nestjs/cli 10.0.0


### 추가 참고 내용(위 내용 외에 추가로 참고할만한 내용)

