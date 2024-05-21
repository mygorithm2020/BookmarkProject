-- 회원
-- 사이트
CREATE TABLE TA_Site(
    SiteId CHAR(32) NOT NULL PRIMARY,
    CategoryId CHAR(32) FOREIGN KEY,

    Name NVARCHAR(32) ,
    NameKR NVARCHAR(32),
    URL NVARCHAR(256) NOT NULL,
    IPAddress NVARCHAR(32),
    AppLinkAndroid NVARCHAR(256),
    AppLinkIOS NVARCHAR(256),
    Img NVARCHAR(128),
    Description NVARCHAR(1024),
    Keyword NVARCHAR(1024),
    Views BIGINT,
    Like BIGINT,
    Dislike BIGINT,
    Admin NVARCHAR(64),
    Email NVARCHAR(64),    
    
    
    IsDeleted SMALLINT NOT NULL,
    CreateDate DATETIME NOT NULL,
    UpdateDate DATETIME NOT NULL

);

-- 카테고리
CREATE TABLE TA_SiteCategory(
    CategoryId CHAR(32) NOT NULL PRIMARY,
    MainCategoryId CHAR(32),
    Layer INT NOT NULL DEFAULT 1,

    [Name] NVARCHAR(32),
    NameKR NVARCHAR(32),
    
    
    
    IsDeleted SMALLINT NOT NULL,
    CreateDate DATETIME NOT NULL,
    UpdateDate DATETIME NOT NULL

);

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