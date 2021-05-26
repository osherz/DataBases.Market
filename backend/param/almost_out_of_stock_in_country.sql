# All products that almost out of stock from a specific country.
select product.barcode,
       product.name,
       M.name as manufaurer_name,
       M.country_name,
       product_in_branch.amount_in_stock
from product
    join product_in_branch on product.barcode = product_in_branch.product_barcode
         join (select Manufacturer.id, Manufacturer.name, C.country_name
               from Manufacturer
                        join country C on Manufacturer.countryid = C.id
               where country_name = :country_name) M on product.manufacturld = M.id
where product_in_branch.amount_in_stock <= :min_amount;


