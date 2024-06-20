-- db 시간 utc로 세팅-------------------------------------
select CURRENT_TIMESTAMP;
select UTC_TIMESTAMP();
------------------------------------ 
describe ta_member;
SHOW FULL COLUMNS FROM ta_category;
SHOW INDEX FROM ta_member;





-- 회원
CREATE TABLE TA_Member (
  MemberId CHAR(32) NOT NULL PRIMARY KEY,
  password CHAR(64) NOT NULL,
  MemEmail VARCHAR(255) NOT NULL UNIQUE,
  NickName VARCHAR(32), 
  Birth CHAR(8),
  Gender CHAR(1) COMMENT "남자 : M, 여자 : F",
  Authorization INT DEFAULT 1 COMMENT "일반, 개인 : 1, 회사계정 : 2, ..",

  IsDeleted SMALLINT NOT NULL DEFAULT 0,
  CreateDate DATETIME NOT NULL default (UTC_TIMESTAMP) COMMENT "utc 시간임 한국시간으로 변환하려면 +9시간",
  UpdateDate DATETIME NOT NULL default (UTC_TIMESTAMP) 

);
