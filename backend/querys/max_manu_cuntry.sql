select C.id as id, C.country_name, count(C.id) as product_cnt
from product
         join Manufacturer on product.manufacturld = Manufacturer.id
         join country C on Manufacturer.countryid = C.id
group by Manufacturer.id
order by product_cnt desc
limit 1


