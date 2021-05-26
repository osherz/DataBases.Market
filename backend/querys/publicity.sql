create table publicity (
    id int(10) not null primary key auto_increment,
    price int(10) not null check ( price >= 0 ),
    location nvarchar(26) not null,
    goal nvarchar(26) NOT NULL 
);