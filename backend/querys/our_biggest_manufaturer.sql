SELECT Manufacturer.id, Manufacturer.name, me.expenses
FROM Manufacturer
         join manufacturer_expenses me
             on Manufacturer.id = me.manufacturer_id
order by expenses desc
limit 1
