select b.ID as branch_id, b.ADDRESS as branch_address, count(*) count_of_employees
from branchs b
left join employees e on b.ID = e.BARNCH_ID
group by b.ID