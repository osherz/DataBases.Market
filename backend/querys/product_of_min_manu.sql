select product.name as product_name, M.name as manufacturer_name
from product
         join Manufacturer M on M.id = product.manufacturld
where manufacturld in (select id
                       from (
                                select Manufacturer.id as id, count(Manufacturer.id) as Cmanu
                                from product
                                         join Manufacturer on product.manufacturld = Manufacturer.id
                                group by Manufacturer.id
                                order by Cmanu
                                limit 5
                            ) min_manu)
order by manufacturld

