<!-- [Home](..) -->

# 프로젝트
북마크(즐겨찾기) 관리 및 추천 사이트 v2

## 개요
- 기간 : 2024. 06. 06 ~  2024.
- 기술 스택 : HTML, CSS, JavaScript
- 목표 : Backend API 연동 및 Front 화면 구현
- 요약 : 여러 기기 및 여러 브라우저에서 자유롭게 사용할 수 있는 나만의 북마크 관리용 사이트, 더불어 너무나도 많은 웹사이트 중 나에게 맞는 카테고리의 사이트를 찾아보고 추천받을 수 있는 사이트
- 프로젝트 실행 방법: vscode 기준 Live Server EXTENSIONS 설치 후 html 파일 실행


### 내용

#### JS
    localStorage
    cookie

#### HTML
    실제 코드를 작성하기전에 최소한으로 구조는 잡고 시작한다.
    큰 틀을 잡아놓고 그 세부적인 내용을 계속해서 깊이를 늘려가며 구현
    기본 레이아웃 부터 잡고, 세부적으로 틀을 잡고 구현
    크게 보면
    - <header>
    - <nav>(header나 main 내부로 이동 가능)
    - <main>
    - <footer>
    로 나누고 세부적으로는
    <section>
    <article>
    <div>
    등으로 구분한다.
    

#### CSS
    레이아웃 용 CSS, 위에서부터 큰 틀을 적용하는데 사용하며 가능한 flex안에서 끝낸다.
    - grid
    - flex
    - position
    - float

#### 오류 및 해결
    개발 중에 백엔드 서버로 쿠키가 전달안되거나, 백엔드에서 전달받은 쿠키가 브라우저에 적용 안되는 문제
    - axios를 통해 withCredential 옵션을 추가했으나 전달이 안됨
    - 백엔드(nestjs)에서 쿠키를 설정하면 보이기는 하나 실제로 적용이 안되고 경고(this attempt to set a cookie via a set-cookie header was blocked due to user preferences)가 뜸
    - 일단 수작업으로 쿠키를 구분해서 넘겨주기



### 환경세팅
- chrome 사용


### 추가 참고 내용(위 내용 외에 추가로 참고할만한 내용)

