







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

