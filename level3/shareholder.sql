create table shareholder
(
    ID         int(10) not null primary key auto_increment,
    PERCENTAGE int(10) not null check(PERCENTAGE >= 0 and PERCENTAGE <= 100),
    EMAIL      varchar(26) not null unique,
    NAME       varchar(26) not null
);