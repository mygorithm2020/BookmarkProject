------------------------------------ 
describe ta_member;
SHOW FULL COLUMNS FROM TA_ReCategorySite;
SHOW INDEX FROM ta_member;

--------------------------------------
show index from TA_ReCategorySite;

SELECT * FROM test01.student;

SELECT * FROM student;

SHOW DATABASES;
use test01;

show tables;
-- drop table ta_category;
-- drop table ta_site;

select version();

show tables;

select * from TA_member
select * from TA_Authentication
EXPLAIN
select * from TA_AuthToken where Token LIKE '%eyJh' 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJWIjoiOXQvRWtGa2FUMUJINzJvaUZNR2wxUVNsSkdLQU9ETVVHN0RpZkxtcjJweGFGVjlJUWd2OTR5QzN6T3NXNTVaSG9nd2IiLCJpYXQiOjE3MjU5MzA2MDUsImV4cCI6MTcyNTkzMTIwNX0.mi_1LJ3ZMAsOSfqluDm33kKvKvElnuXfqtt-vYjrToM'

select * from ta_site where isdeleted = 0 and (Description LIKE '%중고차%' or SiteDescription LIKE '%중고차%')


update ta_site set isDeleted = 1 where siteId = 'd8f5794ee10843eda11c2e48d0285b6f'
select * from ta_site order by createdDate desc
select * from ta_site where siteid = '62fe83ca0943461e9e28491ee6260965'
select * from ta_site where isDeleted = 0 and status = 2;
select * from ta_site order by status;
select * from ta_site order by views;

-- UPDATE TA_Site p1 SET p1.IsDeleted= 1 WHERE p1.SiteId IN 
--     (SELECT p2.SiteId from (SELECT * FROM TA_Site) p2 WHERE p2.createdDate > '2024-08-05');

select * from ta_category;
select * from ta_recategorysite;
select * from ta_site where img = 'favicon.ico'
update ta_site set img = null where img = ''

DELETE from ta_AuthToken WHERE TokenId = 51
select * from ta_member
select * from ta_AuthToken where Token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJWIjoiOXQvRWtGa2FUMUJINzJvaUZNR2wxUVNsSkdLQU9ETVVHN0RpZkxtcjJweGFGVjlJUWd2OTR5QzN6T3NXNTVaSG9nd2IiLCJpYXQiOjE3MjYwMTg0NDQsImV4cCI6MTcyNjAxODUwNH0.QKRxYtWYAuAVDMm0TKpZjrQwjw0SDkfvzWi0VUAzrsg'
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJEVCI6IjIwMjQtMDktMTFUMDE6MzQ6MDQuMDAwWiIsImlhdCI6MTcyNjAxODQ0NCwiZXhwIjoxNzI2MDkwNDQ0fQ.Dn9ioc7xch5aNH9F_LLQq1Q6WBWyq0msX7Or1IiPhl0
select * from ta_site where siteId = '0bda754655344afaaf216fd5bceb74c1'

SELECT * FROM TA_CATEGORY order by createddate desc where status = 2;
select * from ta_site where isdeleted = 0 order by createdDate desc;
select * from ta_recategorysite where categoryid = '12517be8365544cab79ecec0ef02d6d6';
DESCRIBE ta_site;
select a.* from ta_site a LEFT OUTER JOIN TA_recategorysite b ON a.SiteId = b.SiteId where a.isdeleted = 0 and (b.categoryId != 'e66b970eb1974559a68c9609b25e9058' or b.categoryId is NULL) order by createdDate desc;
INSERT INTO ta_recategorysite(CategoryId, SiteId) 
(SELECT a.categoryId, b.SiteId FROM TA_Category a, TA_Site b where
 a.CategoryId = 'e66b970eb1974559a68c9609b25e9058' and b.SiteId in (
 '0393d25b1c364301b3057bbf7adbca61',
 '6a10034e150243a2a50cd93a721c6705',
 '23bf2751e23c47748dffa28c27b9f54d',
 '9a5cffe3a3a842f0b83f730b1c734c1d',
 '546ee3eda78a48e28e33fe8b071dfd09',
 'e6cd6c6d211c46888d8f82b7fed2354f',
 '484f660d3ab04502ac4907e726e11707',
 '6b19855ed7844a799a485bfb21a2bf9f',
 'ffd4f3e719924075af32ea469b7690f5',
 '5388a45e114742129a2a40a98379db1b',
 'c32335b4732440e98ce847b8f05f88b4',
 'b987b3bbdbb045ac9caaef7b9031a9f2'
 ));
select * from ta_site where isDeleted = 0 order by views desc;
select * from ta_site where isDeleted = 0 and status != 2;
select * from ta_site where url = 'https://playground.com';
select * from ta_site where views > 1;
select * from ta_member;

select * FROM TA_Category



select S.* FROM TA_Site AS S 
LEFT JOIN ta_recategorysite AS rcs ON S.SiteId = rcs.SiteId
LEFT JOIN TA_Category AS C ON rcs.CategoryId = C.CategoryId;

INSERT INTO ta_recategorysite(CategoryId, SiteId) VALUES ('62fe83ca0943461e9e28491ee6260965', '7d11c13e28404684af013731a9a11b93');

(select * from ta_site where isDeleted = 0 and status = 2 order by Views DESC LIMIT 20)
UNION
(select * from ta_site where isDeleted = 0 and status = 2 order by ta_site.LIKE DESC LIMIT 20)
UNION
(select * from ta_site where isDeleted = 0 and status = 2 order by dislike ASC LIMIT 20)
UNION
(select * from ta_site where isDeleted = 0 and status = 2 order by createdDate DESC LIMIT 20)
order by rand();

CREATE INDEX IDX_Site_isDeleted_status ON TA_Site (isDeleted, status);

ON 테이블이름 (필드이름1, 필드이름2, ...)


update TA_Site set status = 2 where siteid in (
"d158c216ff644f21896336062abc8b30",
"90579d3f6e254858ac9e01c50a069a5f",
"9b38f902589b40e2b8ced84ffc15fec7",
"d05d7762891d47b39f0300354ddba3b4",
"7065961e1cc14899afbee426e022a3ca",
"a1cb8b369f5d447bb829d053838b0707");
SELECT * FROM ta_site
LIMIT 3;

select * from ta_member;
select * from TA_Member;

show tables;

select * from ta_site;
select now();
select CURRENT_TIMESTAMP;
select UTC_TIMESTAMP();



show databases;
show tables;

describe user;
select * from user;
select * from ta_category;
select * from book;
use test01;
-- use mysql;

SHOW FULL COLUMNS FROM ta_category;
describe ta_category;
describe ta_site;

SHOW INDEX FROM ta_site;

ALTER TABLE ta_category MODIFY ParentId char(32);



select * from book where title is null;



select * from ta_category;
select * from ta_site order by createdDate desc;
select * from ta_recategorysite;




