-- 카테고리
CREATE TABLE TA_SiteCategory(
    CategoryId CHAR(32) NOT NULL PRIMARY,
    ParentId CHAR(32),
    Layer INT NOT NULL DEFAULT 1,
    [Name] NVARCHAR(32),
    NameKR NVARCHAR(32),
    status INT NOT NULL,


    IsDeleted SMALLINT NOT NULL,
    CreatedDate DATETIME NOT NULL,
    UpdatedDate DATETIME NOT NULL

);

-- 사이트
CREATE TABLE TA_Site(
    SiteId CHAR(32) NOT NULL PRIMARY,
    CategoryId CHAR(32) FOREIGN KEY,

    -- 입력 정보 -- 3순위
    Name NVARCHAR(32),
    NameKR NVARCHAR(32),
    URL NVARCHAR(256) NOT NULL,
    IPAddress NVARCHAR(32),
    LogoImg NVARCHAR(128),
    AppLinkAndroid NVARCHAR(256),
    AppLinkIOS NVARCHAR(256),
    -- 기본 정보 -- 2순위
    Title NVARCHAR(32),
    FaviconImg NVARCHAR(128),
    Description NVARCHAR(1024),
    Keywords NVARCHAR(1024),
    -- og 정보 -- default
    OGTitle NVARCHAR(32),
    OGSiteName NVARCHAR(32),
    OGImg NVARCHAR(128),
    OGDescription NVARCHAR(1024),
    OGURL NVARCHAR(256) NOT NULL,
    -- 추가 정보 --
    Views BIGINT,
    Like BIGINT,
    Dislike BIGINT,
    Admin NVARCHAR(64),
    Email NVARCHAR(64),    
        
    IsDeleted SMALLINT NOT NULL,
    CreateDate DATETIME NOT NULL,
    UpdateDate DATETIME NOT NULL

);

-- 회원



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