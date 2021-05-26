select M.name, round(avg(product.ItemPrice), 2) as average_price
from product
         join Manufacturer M on product.manufacturld = M.id
group by M.id, M.name