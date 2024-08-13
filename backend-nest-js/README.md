[Home](..)

# 프로젝트
북마크(즐겨찾기) 관리 및 추천 사이트 v2

## 개요
- 기간 : 2024. 06. 06 ~  2024.
- 기술 스택 : JavaScript, NodeJS, NestJS, Typescript, MySQL
- 목표 : v1 버전(정적웹사이트)에 백엔드 서버 및 DB 추가
- 프로젝트 실행 방법: 
  - mysql 설치 및 환경 구성
  - mysql.sql 파일 바탕으로 db, user, table create
  - 필요한 node 설치
  - 현재 경로에서 db연결 관련 .env파일 생성
  - npm install, npm run start:dev
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
    Bcrypt
    crypto
    Middleware
    Filter
    

#### 오류 및 문제 해결
    NestJS : HttpModule로 response의 html 파일 인코딩 방식이 euc-kr이면 문자가 깨지는 현상,  utf-8이면 정상
        - 버퍼로 데이터 받은 후 iconv-lite 모듈로 헤더의 콘텐츠 타입 및 인코딩 방식 확인 후 디코딩
        - nest에서 사용시 그냥 import하면 에러가 발생하는 경우 import * as iconv from "iconv-lite"으로 변경
        - 즉, import 에 바로 그 내용을 적는게 아니라 * 처리하고 as 로 해당 모듈이름을 적는 방법으로 처리
  
    Typeorm : Many to Many 관계를 중간에 따로 sql 로 생성한 junction table 을 활용해 연결하기
        - Site, CategorySite, Category 3가지 entity 참고
  
    TypeORM : mariaDB(10.1.13) 연결 중  발생 에러
        - version 체크 부분에서 split 에러가 나는걸 확인하고 직접 노드 모듈스(typeorm/driver/mysql/mysqldriver.js)에서 해당 부분 찾아서 데이터 처리함
    이게 맞을지는 모르겠는데 일단 해결은 됨
        - insert 과정에서 returning 문법이 쓰이고 있고 에러가 발생해서 위와 마찬가지로 코드 수정
        - select 과정에서 결과값이 버퍼로 오는 문제..........
        - mariadb 10.11.* 이상 버전으로 확인해보니 결국 select가 buffer로 와서 생긴 문제였음... string을 parseInt하는 부분은 에러가 없음.....
        - 고로 위 문제는 db version 변경으로 처리하고 위는 롤백

#### 배포
    웹 호스팅 : 가비아, cafe24 등에서 nodejs 호스팅을 찾았지만 너무 구 버전이고, 제한 사항이 많아 진행이 어려움
    서버 호스팅 : 마찬가지로 위 사이트에서도 사용이 가능하나 가상 서버 호스팅을 이용하는김에 클라우드를 이용
    GCP : 실제 배포 진행하였고 과정은 아래와 같음
        - gcp 계정 생성 및 콘솔 사이트 방문
        - vm 인스턴스 생성(ubuntu 22.04 x86/64) : 리눅스 종류 및 버전 및 cpu는 일반적으로 많이 사용하는 케이스로 설정
        - ssh 접속으로 필요한 환경 확인
        - git은 기존에 설치되어 있었고, nvm 등을 활용해서 원하는 노드 버전 설치
        - git으로 프로젝트 다운로드
        - 환경파일 등 추가(vi를 통해)
        - npm i, npm run build 등으로 실행 환경 구성
        - mysql(8.4.0) 최신 LTS 설치
        - 유저 생성, 권한 부여, db 생성, table 생성, data migration
        - gcp 콘솔사이트에서 외부ip 방화벽 규칙생성으로 포트별 ip 접근 설정

### 개발환경세팅
- node 20.10.0
- npm v10.2.3
- nestJS
- mysql 8.0.37
- 

### 추가 참고 내용(위 내용 외에 추가로 참고할만한 내용)

