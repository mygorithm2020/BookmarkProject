-- 인증 기록
CREATE TABLE TA_Authentication (
  AuthId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  Email VARCHAR(255),
  PhoneCode VARCHAR(8),
  PhoneNo VARCHAR(16),
  AuthCode VARCHAR(16) NOT NULL COMMENT "인증 코드",
  Count INT DEFAULT 0 COMMENT "인증 시도 횟수",
  IsAuth INT NOT NULL DEFAULT 0 COMMENT "0 : 미인증, 1: 인증완료",
  CreateDate DATETIME NOT NULL default (UTC_TIMESTAMP) COMMENT "utc 시간임 한국시간으로 변환하려면 +9시간",
  UpdateDate DATETIME NOT NULL default (UTC_TIMESTAMP) 
) ENGINE=InnoDB;
CREATE INDEX IDX_Authentication_Email ON TA_Authentication (Email);
CREATE INDEX IDX_Authentication_PhoneNo ON TA_Authentication (PhoneNo);

-- 인증 토큰
CREATE TABLE TA_AuthToken (
  TokenId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  Token VARCHAR(512),
  MemberId CHAR(32),
  IP VARCHAR(64),  
  UserAgent VARCHAR(512),
  Origin VARCHAR(255),
  CreateDate DATETIME NOT NULL default (UTC_TIMESTAMP) COMMENT "utc 시간임 한국시간으로 변환하려면 +9시간"
) ENGINE=InnoDB;
CREATE INDEX IDX_AuthToken_Token ON TA_AuthToken (Token);

-- 회원
CREATE TABLE TA_Member (
  MemberId CHAR(32) NOT NULL PRIMARY KEY,
  Password VARCHAR(64) NOT NULL,
  MemEmail VARCHAR(255) NOT NULL,
  NickName VARCHAR(32), 
  Birth CHAR(8),
  Gender CHAR(1) CHECK (Gender IN ('M', 'F')) COMMENT "남자 : M, 여자 : F",
  Authentication INT DEFAULT 1 COMMENT "1 이면 미승인 2이면 승인 3이면 차단된 계정",  
  Authorization INT DEFAULT 1 COMMENT "1 : 일반, 개인, 2: 회사계정, 3: 관리자.... ..",

  IsDeleted SMALLINT NOT NULL DEFAULT 0 CHECK (IsDeleted >= 0),
  CreateDate DATETIME NOT NULL default (UTC_TIMESTAMP) COMMENT "utc 시간임 한국시간으로 변환하려면 +9시간",
  UpdateDate DATETIME NOT NULL default (UTC_TIMESTAMP) 

);
CREATE INDEX IDX_Member_MemEmail ON TA_Member (MemEmail);
-- ALTER TABLE TA_Member MODIFY COLUMN password VARCHAR(64) NOT NULL;
-- ALTER TABLE TA_Member ADD CONSTRAINT CHECK (Gender IN ('M', 'F'));  -- null 은 상관 없음

-- 카테고리
CREATE TABLE TA_Category(
    CategoryId CHAR(32) NOT NULL PRIMARY KEY,
    ParentId CHAR(32),
    Layer INT NOT NULL DEFAULT 1 COMMENT "카테고리간의 계층을 의미 1이 최상위 단계",
    Name VARCHAR(32) NOT NULL,
    NameKR VARCHAR(32),
    Status INT NOT NULL default 1 COMMENT "카테고리 등록상태 1:등록, 2: 사용, 3:보류",
    Sequence INT NOT NULL DEFAULT 99999999,
    Views BIGINT default 0,

    IsDeleted SMALLINT NOT NULL DEFAULT 0,
    CreatedDate DATETIME NOT NULL default (UTC_TIMESTAMP),
    UpdatedDate DATETIME NOT NULL default (UTC_TIMESTAMP)

) COMMENT "사이트의 카테고리 구분";
ALTER TABLE TA_Category ADD UNIQUE (ParentId, Layer, Name);


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
    Status Int DEFAULT 1 COMMENT  "카테고리 등록상태 1:일반등록(확인 x), 2: 사용, 3:보류, 4: 숨기기(문제), 5:자동 확인 중 사이트 에러, 6:자동 확인 중 성공 7: 자동 검토 중 보류" ,      

    -- 기본 정보 -- 2순위
    Title VARCHAR(255),
    FaviconImg VARCHAR(512),
    Description VARCHAR(1024),
    Keywords VARCHAR(1024),
    LogoImg VARCHAR(512),

    -- og 정보 -- default
    OGTitle VARCHAR(255),
    OGSiteName VARCHAR(255),
    OGImg VARCHAR(512),
    OGDescription VARCHAR(1024),
    OGURL VARCHAR(255),   
        
    IsDeleted SMALLINT NOT NULL DEFAULT 0,
    CreatedDate DATETIME NOT NULL default (UTC_TIMESTAMP),
    UpdatedDate DATETIME NOT NULL default (UTC_TIMESTAMP)
    

);
CREATE INDEX IDX_Site_URL ON TA_Site (URL);
CREATE INDEX IDX_Site_Views ON TA_Site (Views);
CREATE INDEX IDX_Site_Good ON TA_Site (Good);
-- ALTER TABLE TA_Site MODIFY COLUMN Bad INT  default 0;
-- 다대다
-- 카테고리 사이트 릴레이션
CREATE TABLE TA_ReCategorySite(
  Id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'PK',
  CategoryId CHAR(32) NOT NULL,
  SiteId CHAR(32) NOT NULL,

  CreatedDate DATETIME NOT NULL default (UTC_TIMESTAMP),
  
  UNIQUE KEY UK_ReCategorySite (CategoryId, SiteId)
);
CREATE INDEX IDX_ReCategorySite_CategoryId ON TA_ReCategorySite (CategoryId);
CREATE INDEX IDX_ReCategorySite_SiteId ON TA_ReCategorySite (SiteId);