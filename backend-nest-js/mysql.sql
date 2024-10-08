-- db 시간 utc로 세팅-------------------------------------
select CURRENT_TIMESTAMP;
select UTC_TIMESTAMP();
------------------------------------ 
select CURDATE(), YEAR(CURDATE()), MONTH(CURDATE()), DAY(CURDATE());
SHOW DATABASES;
SHOW TABLES;
describe ta_category;
SHOW FULL COLUMNS FROM ta_category;
SHOW INDEX FROM ta_category;
SHOW INDEX FROM ta_site;
select * from information_schema.table_constraints WHERE TABLE_NAME = 'ta_member';
SHOW CREATE TABLE ta_member
SELECT CHAR_LENGTH("sss");
-- INT, BIGINT, DECIMAL, FLOAT, DOUBLE, DATETIME, DATE, CHAR(0 ~ 255), VARCHAR(0 ~ 65356), TEXT, MEDIUMTEXT, LONGTEXT

CREATE INDEX 인덱스이름 ON 테이블이름 (필드이름1, 필드이름2, ...);

show table status LIKE 'ta_category';
ANALYZE TABLE ta_category;

CREATE VIEW v_member
AS SELECT mem_id, mem_name, addr FROM member
WITH CHECK OPTION; -- 예를 들어 키가 170 이상인 where 조건문이 있었다면 해당 뷰에는 170이상인 데이터만 삽입/수정 가능하게 조건 부여

SELECT CAST(AVG(price) AS SIGNED) FROM buy
SELECT CONVERT(AVG(price) , SIGNED) FROM buy

SELECT CAST('2024-07-12' AS DATE)
SELECT CONCAT("1", "+", "1", "=", "2")

DELIMITER $$
CREATE PROCEDURE myProc()
BEGIN
	DECLARE myNum INT;
    DECLARE i INT;
    SET myNum = 200;
    IF myNum = 100
    THEN
		SELECT '100 은 100 과 같습니다.';
	ELSE
		SELECT '100 이 아닙니다.';
	END IF;
    
    CASE
		WHEN myNum = 100 THEN
			SELECT '100 은 100 과 같습니다.';
		WHEN myNum = 200 THEN
			SELECT '100 은 100 과 같습니다.';
		ELSE
			SELECT '100 은 100 과 같습니다.';
	END CASE;
    
    
    SET i = 1;
    
    myWhile:
    WHILE (i <= 100) DO
		SET i = i+1;
        IF (i > 50) THEN
			LEAVE myWhile;
        END IF;
	END WHILE;
		
END $$
DELIMITER ;

SELECT DATEDIFF(UTC_TIMESTAMP, current_timeStamp());
SELECT TIMESTAMPDIFF(MINUTE, UTC_TIMESTAMP(), current_timeStamp());
SELECT TIMESTAMPDIFF(MINUTE, current_timeStamp(), UTC_TIMESTAMP());

-- ALTER TABLE buy
-- ADD CONSTRAINT
-- FOREIGN KEY (mem_id) REFERENCE member(mem_id)
-- ON UPDATE CASCADE	-- mem테이블 변경시 buy 테이블도 변경(이거 없으면 mem 변경이 불가능함)
-- ON DELETE CASCADE;  -- mem테이블 삭제시 buy 테이블도 삭제(이거 없으면 mem 삭제 불가능

DELIMITER $$
CREATE TRIGGER singer_updateTrg
	AFTER UPDATE
    ON singer
    FOR EACH ROW
BEGIN
	INSERT INTO backup_singer VALUES(OLD.mem_id, curdate(), current_user());
END $$
DELIMITER ;

--　이　아래로　서버　등록　완료　-- 
 
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


describe TA_Site

-- 사이트
CREATE TABLE TA_Site(
    SiteId CHAR(32) NOT NULL PRIMARY KEY,

    -- 보여지는 정보이며, 입력(수정)도 가능함, 아래 순위별로 데이터 채워짐

    URL VARCHAR(255) NOT NULL,
    Name VARCHAR(255),
    NameKR VARCHAR(255),
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
    Status Int DEFAULT 1 COMMENT  "카테고리 등록상태 1:일반등록(확인 x), 2: 사용, 3:보류, 4: 숨기기(문제), 5:자동 확인 중 사이트 에러, 6:자동 확인 중 성공 7: 자동 검토 중 보류 8: 자동 등록" ,      

    -- 기본 정보 -- 2순위
    Title VARCHAR(255),
    FaviconImg VARCHAR(1024),
    Description VARCHAR(1024),
    Keywords VARCHAR(1024),
    LogoImg VARCHAR(1024),

    -- og 정보 -- default
    OGTitle VARCHAR(255),
    OGSiteName VARCHAR(255),
    OGImg VARCHAR(1024),
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
CREATE INDEX IDX_ReCategorySite_CategoryId ON TA_ReCategorySite (CategoryId);
CREATE INDEX IDX_ReCategorySite_SiteId ON TA_ReCategorySite (SiteId);


