SELECT count(distinct e.ID) as numbers_of_employees, SUM(Salary) as sun_of_salary
FROM branchs join employees e on branchs.ID = e.BARNCH_ID