SELECT ID, salary, SENIORITY
FROM employees
where SENIORITY = (select max(SENIORITY)
    from employees)