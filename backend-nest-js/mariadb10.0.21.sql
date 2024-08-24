show databases;
create database dsdsdsds;
select version();

SELECT @@global.time_zone, @@session.time_zone,@@system_time_zone;

-- 카테고리
CREATE TABLE TA_Category(
    CategoryId CHAR(32) NOT NULL PRIMARY KEY,
    ParentId CHAR(32),
    Layer INT NOT NULL DEFAULT 1 COMMENT "카테고리간의 계층을 의미 1이 최상위 단계",
    Name VARCHAR(32) NOT NULL,
    NameKR VARCHAR(32),
    Status INT NOT NULL default 1 COMMENT "카테고리 등록상태 1:등록, 2: 사용, 3:보류",
    Sequence INT NOT NULL DEFAULT 99999999,

    IsDeleted SMALLINT NOT NULL DEFAULT 0,
    CreatedDate DATETIME NOT NULL default now(),
    UpdatedDate DATETIME NOT NULL default now()

) COMMENT "사이트의 카테고리 구분";
ALTER TABLE TA_Category ADD UNIQUE (ParentId, Layer, Name);

CREATE TABLE ta_site(
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
    CreatedDate DATETIME NOT NULL default now(),
    UpdatedDate DATETIME NOT NULL default now()
    

);

select * from TA_Site where IsDeleted = 0


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
    CreatedDate DATETIME NOT NULL default now(),
    UpdatedDate DATETIME NOT NULL default now()
    

);
CREATE INDEX IDX_Site_URL ON TA_Site (URL);
CREATE INDEX IDX_Site_Views ON TA_Site (Views);
CREATE INDEX IDX_Site_Good ON TA_Site (Good);
