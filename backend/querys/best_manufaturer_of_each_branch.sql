select concat(b.TOWN, ', ', b.ADDRESS) as branch, Manufacturer.name as manu_name, products_amount
from branch_manu_prod_amount bm
         natural join (select branch_id, max(products_amount) as max_product_amount
                       from branch_manu_prod_amount
                       group by branch_id) max_b
         join branchs b on bm.branch_id = b.ID
         join Manufacturer on manu_id = Manufacturer.id
where bm.products_amount = max_b.max_product_amount