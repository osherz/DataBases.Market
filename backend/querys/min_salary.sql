select ID as employee_id, SALARY
from employees
where SALARY=(select min(SALARY)
       FROM employees)






