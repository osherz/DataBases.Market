select name, EMAIL, TOWN, ADDRESS, REVENUE
from employees
         join branchs b on b.ID = employees.BARNCH_ID
WHERE employees.is_manager
  and b.ID in (select ID
                       from branchs
                       WHERE REVENUE = (select MAX(REVENUE)
                                        from branchs))
