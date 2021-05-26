select product.name,
       description
from product
         join Manufacturer M on product.manufacturld = M.id
where M.name = :manu_name;