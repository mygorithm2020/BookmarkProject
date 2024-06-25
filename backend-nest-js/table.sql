-- 카테고리
CREATE TABLE TA_Category(
    CategoryId CHAR(32) NOT NULL PRIMARY KEY,
    ParentId CHAR(32),
    Layer INT NOT NULL DEFAULT 1 COMMENT "카테고리간의 계층을 의미 1이 최상위 단계",
    CateName VARCHAR(32) NOT NULL UNIQUE,
    CateNameKR VARCHAR(32) UNIQUE,
    status INT NOT NULL COMMENT "카테고리 등록상태 1:등록, 2: 사용, 3:보류",

    IsDeleted SMALLINT NOT NULL DEFAULT 0,
    CreatedDate DATETIME NOT NULL default (UTC_TIMESTAMP),
    UpdatedDate DATETIME NOT NULL default (UTC_TIMESTAMP)

) COMMENT "사이트의 카테고리 구분";

-- 카테고리 계층 테이블
-- 카테고리에 구조 및 사이트 조회에 사용할 예정이므로 본인과 본인(pa = ch)도 등록 필요
CREATE TABLE TA_CategoryLayer(
  CategoryId CHAR(32) NOT NULL, --부모 카테고리 id
  ChildId CHAR(32) NOT NULL,  -- 자식 or 자손 카테고리 id 부모의 아래 단계에 있는 즉, 속해있는 모든 자식 각자 등록

  ChildLayer INT,

  CreatedDate DATETIME NOT NULL default (UTC_TIMESTAMP),
  UpdatedDate DATETIME NOT NULL default (UTC_TIMESTAMP)

)

-- 사이트
CREATE TABLE TA_Site(
    SiteId CHAR(32) NOT NULL PRIMARY KEY,

    -- 보여지는 정보이며, 입력(수정)도 가능함, 아래 순위별로 데이터 채워짐
    SiteName VARCHAR(32),
    SiteNameKR VARCHAR(32),
    SiteProtocol VARCHAR(8) NOT NULL,
    SiteURL VARCHAR(255) NOT NULL,
    SiteIP VARCHAR(32),
    SiteImg VARCHAR(512),
    AppLinkAndroid VARCHAR(255),
    AppLinkIOS VARCHAR(255),

    -- 추가 정보 --
    Views BIGINT,
    Like INT,
    Dislike INT,
    -- Admin VARCHAR(64),
    -- Email VARCHAR(64), 
    Status Int COMMENT  "카테고리 등록상태 1:등록, 2: 사용, 3:보류" ,      

    -- og 정보 -- default
    OGTitle VARCHAR(255),
    OGSiteName VARCHAR(255),
    OGImg VARCHAR(512),
    OGDescription VARCHAR(1024),
    OGURL VARCHAR(255) NOT NULL,

    -- 기본 정보 -- 2순위
    Title VARCHAR(255),
    FaviconImg VARCHAR(512),
    Description VARCHAR(1024),
    Keywords VARCHAR(1024),
    
    
    
        
    IsDeleted SMALLINT NOT NULL DEFAULT 0,
    CreateDate DATETIME NOT NULL default (UTC_TIMESTAMP),
    UpdateDate DATETIME NOT NULL default (UTC_TIMESTAMP)

);

-- categoryA categoryB

-- site category..

-- 카테고리간의 관계도 정의 가능
-- 1 : N 이고 모든 카테고리별로 관계를 정의해줘야 함
-- ----------------------

-- categoryA site
-- categoryB site

-- 카테고리간의 관계는 따로 필요.....
-- N : N 이고 
-- => 이걸로 가자 N : N 이 맞음

-- 다대다
-- 카테고리 사이트 릴레이션
CREATE TABLE TA_ReCategorySite(
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'PK',
  CategoryId CHAR(32) NOT NULL,
  SiteId CHAR(32) NOT NULL,

  CreateDate DATETIME NOT NULL default (UTC_TIMESTAMP)
)  INDEX IDX_ReCategorySite_CategoryId (CategoryId)



-- 광고
-- 추천
-- 관리자


INT, BIGINT, DECIMAL, FLOAT, DOUBLE, DATETIME, DATE, CHAR(0 ~ 255), VARCHAR(0 ~ 65356), TEXT, MEDIUMTEXT, LONGTEXT

CREATE TABLE TA_SiteCategory(                               (1)
  id INT(11) NOT NULL AUTO_INCREMENT,                 (2)
  name VARCHAR(20) NOT NULL,                          (3)
  ouccupation VARCHAR(20) NULL,                       (4)
  height SMALLINT,                                    (5)
  profile TEXT NULL,                                  (6)
  date  DATETIME,                                     (7)
  CONSTRAINT testTable_PK PRIMARY KEY(id)             (8)
);
[출처] [MySQL] 테이블 만들기,수정하기 (Create table, Alter table)|작성자 pjok1122

