-- auto-generated definition
create table employees
(
    ID        int(10) auto_increment primary key,
    JOB       varchar(26) not null,
    EMAIL     varchar(30) not null,
    SALARY    int(10)     not null,
    SENIORITY int(10)     not null,
    BARNCH_ID int         not null,
    constraint employees_EMAIL_uindex
        unique (EMAIL),
    constraint employees_ibfk_1
        foreign key (BARNCH_ID) references branchs (ID)
);

create index BARNCH_ID
    on employees (BARNCH_ID);
