select Manufacturer.id as id, Manufacturer.name, count(Manufacturer.id) as product_cnt
from product
         join Manufacturer on product.manufacturld = Manufacturer.id
where Manufacturer.name != '---'
group by Manufacturer.id
order by product_cnt desc
limit 1