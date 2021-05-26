# To knows who earned more than 10,000 by months: (to checks if it’s justified)
SELECT *
FROM employees
WHERE SALARY > :min_salary
