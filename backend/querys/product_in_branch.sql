create table product_in_branch(
    id int primary key auto_increment,
    branch_id int(10) not null,
    product_barcode varchar(25)  not null,
    amount_in_stock float default 0 not null check ( amount_in_stock >= 0 ),
    foreign key (branch_id) references branchs(ID),
    foreign key (product_barcode) references product(barcode)
)