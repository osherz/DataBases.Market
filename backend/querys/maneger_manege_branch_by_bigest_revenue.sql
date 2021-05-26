select name, EMAIL, TOWN, ADDRESS
from employees join branchs b on b.ID = employees.BARNCH_ID
WHERE employees.ID in (select MANAGER_ID
            from branchs
            WHERE REVENUE = (select MAX(REVENUE)
                             from branchs))
