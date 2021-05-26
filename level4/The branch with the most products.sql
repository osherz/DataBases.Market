
select sum(amount_in_stock) as sum_in_stock, branch_id, b.TOWN
from product_in_branch
         join branchs b on b.ID = product_in_branch.branch_id
group by branch_id, b.TOWN
order by sum_in_stock desc
limit 1



