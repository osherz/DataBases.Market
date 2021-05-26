select product_in_branch.product_barcode,
       product.name,
       concat(b.TOWN,', ', b.ADDRESS) as branch,
       M.name as manufaurer_name,
       C.country_name,
       product_in_branch.amount_in_stock
from product
         join product_in_branch on product.barcode = product_in_branch.product_barcode
         join Manufacturer M on product.manufacturld = M.id
         join country C on M.countryid = C.id
         join branchs b on b.ID = product_in_branch.branch_id
where product_in_branch.amount_in_stock <= :min_amount;