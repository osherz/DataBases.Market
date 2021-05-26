-- auto-generated definition
create table product
(
    barcode      varchar(25)              not null
        primary key,
    name         varchar(50) charset utf8 not null,
    manufacturld int                      null,
    description  varchar(50) charset utf8 null,
    unitQty      varchar(20) charset utf8 not null,
    Quantity     float                    null,
    bIsWeighted  tinyint(1)               null,
    QtyInPackage int                      null,
    ItemPrice    float                    null,
    constraint product_ibfk_1
        foreign key (manufacturld) references Manufacturer (id)
);

create index manufacturld
    on product (manufacturld);

