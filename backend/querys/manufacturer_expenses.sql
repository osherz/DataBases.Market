create table manufacturer_expenses(
    id int primary key auto_increment,
    manufacturer_id int not null,
    expenses float default 0 not null check ( expenses >= 0 ),
    date_of_expenses date not null,
    foreign key (manufacturer_id) references Manufacturer(id)
)