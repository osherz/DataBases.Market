-- auto-generated definition
create table branchs
(
    ID           int(10) auto_increment primary key,
    TOWN         varchar(26) not null,
    REVENUE      int(26)     not null,
    MANAGER_NAME varchar(26) not null,
    ADDRESS      varchar(50) not null,
    AREA         int(10)     not null
);

