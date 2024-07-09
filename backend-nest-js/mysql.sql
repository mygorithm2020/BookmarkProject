-- db 시간 utc로 세팅-------------------------------------
select CURRENT_TIMESTAMP;
select UTC_TIMESTAMP();
------------------------------------ 
SHOW DATABASES;
SHOW TABLES;
describe ta_site;
SHOW FULL COLUMNS FROM ta_category;
SHOW INDEX FROM ta_member;
SHOW INDEX FROM ta_site;
select * from information_schema.table_constraints WHERE TABLE_NAME = 'TA_site';

CREATE INDEX 인덱스이름 ON 테이블이름 (필드이름1, 필드이름2, ...);

show table status LIKE 'ta_site';
ANALYZE TABLE TA_Site;


-- 인증 기록
CREATE TABLE TA_Authentication (
  AuthId CHAR(32) NOT NULL PRIMARY KEY,
  Email VARCHAR(255),
  PhoneNo VARCHAR(16),
  AuthCode VARCHAR(16) NOT NULL,
  IsAuth INT DEFAULT 0,
  CreateDate DATETIME NOT NULL default (UTC_TIMESTAMP) COMMENT "utc 시간임 한국시간으로 변환하려면 +9시간",
  UpdateDate DATETIME NOT NULL default (UTC_TIMESTAMP) 

);
CREATE INDEX IDX_Authentication_Email ON TA_Authentication (Email);
CREATE INDEX IDX_Authentication_PhoneNo ON TA_Authentication (PhoneNo);


-- 회원
CREATE TABLE TA_Member (
  MemberId CHAR(32) NOT NULL PRIMARY KEY,
  password CHAR(64) NOT NULL,
  MemEmail VARCHAR(255) NOT NULL UNIQUE,
  NickName VARCHAR(32), 
  Birth CHAR(8),
  Gender CHAR(1) COMMENT "남자 : M, 여자 : F",
  Authentication INT DEFAULT 0 COMMENT "0 이면 미승인 1이면 승인 2이면 차단된 계정",  
  Authorization INT DEFAULT 1 COMMENT "1 : 일반, 개인, 2: 회사계정, 3: 관리자.... ..",
  AuthenticationCode VARCHAR(16) COMMENT "인증 코드",

  IsDeleted SMALLINT NOT NULL DEFAULT 0,
  CreateDate DATETIME NOT NULL default (UTC_TIMESTAMP) COMMENT "utc 시간임 한국시간으로 변환하려면 +9시간",
  UpdateDate DATETIME NOT NULL default (UTC_TIMESTAMP) 

);

-- 카테고리
CREATE TABLE TA_Category(
    CategoryId CHAR(32) NOT NULL PRIMARY KEY,
    ParentId CHAR(32),
    Layer INT NOT NULL DEFAULT 1 COMMENT "카테고리간의 계층을 의미 1이 최상위 단계",
    Name VARCHAR(32) NOT NULL UNIQUE,
    NameKR VARCHAR(32) UNIQUE,
    status INT NOT NULL default 1 COMMENT "카테고리 등록상태 1:등록, 2: 사용, 3:보류",
    Sequence INT NOT NULL DEFAULT 99999999,

    IsDeleted SMALLINT NOT NULL DEFAULT 0,
    CreatedDate DATETIME NOT NULL default (UTC_TIMESTAMP),
    UpdatedDate DATETIME NOT NULL default (UTC_TIMESTAMP)

) COMMENT "사이트의 카테고리 구분";


-- 사이트
CREATE TABLE TA_Site(
    SiteId CHAR(32) NOT NULL PRIMARY KEY,

    -- 보여지는 정보이며, 입력(수정)도 가능함, 아래 순위별로 데이터 채워짐

    URL VARCHAR(255) NOT NULL,
    Name VARCHAR(32),
    NameKR VARCHAR(32),
    IPAddress VARCHAR(32),
    Img VARCHAR(512),
    SiteDescription VARCHAR(1024),
    AppLinkAndroid VARCHAR(255),
    AppLinkIOS VARCHAR(255),

    -- 추가 정보 --
    Views BIGINT default 0,
    Good INT  default 0,
    Bad INT  default 0,
    MemberId VARCHAR(64),
    -- Email VARCHAR(64), 
    Status Int COMMENT  "카테고리 등록상태 1:일반등록, 2: 사용, 3:보류, 4: 숨기기(문제), 5:등록 중 사이트 에러" ,      

    -- 기본 정보 -- 2순위
    Title VARCHAR(255),
    FaviconImg VARCHAR(512),
    Description VARCHAR(1024),
    Keywords VARCHAR(1024),

    -- og 정보 -- default
    OGTitle VARCHAR(255),
    OGSiteName VARCHAR(255),
    OGImg VARCHAR(512),
    OGDescription VARCHAR(1024),
    OGURL VARCHAR(255),

    
        
    IsDeleted SMALLINT NOT NULL DEFAULT 0,
    CreatedDate DATETIME NOT NULL default (UTC_TIMESTAMP),
    UpdatedDate DATETIME NOT NULL default (UTC_TIMESTAMP),
    

);
CREATE INDEX IDX_Site_IsDeletedStatus ON TA_Site (IsDeleted, Status);
ALTER TABLE TA_Site MODIFY COLUMN Bad INT  default 0;

describe ta_site;

-- 다대다
-- 카테고리 사이트 릴레이션
CREATE TABLE TA_ReCategorySite(
  Id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'PK',
  CategoryId CHAR(32) NOT NULL,
  SiteId CHAR(32) NOT NULL,

  CreatedDate DATETIME NOT NULL default (UTC_TIMESTAMP),
  
  UNIQUE KEY UK_ReCategorySite (CategoryId, SiteId)
);
CREATE INDEX IDX_ReCategorySite_CategoryIdSiteId ON TA_ReCategorySite (CategoryId, SiteId);
CREATE INDEX IDX_ReCategorySite_CategoryId ON TA_ReCategorySite (CategoryId);


