# To knows who our biggest manufaturer are, and if it’s too much:
SELECT Manufacturer.id, Manufacturer.name, me.expenses
FROM Manufacturer
         join manufacturer_expenses me
             on Manufacturer.id = me.manufacturer_id
WHERE me.expenses > 100000
