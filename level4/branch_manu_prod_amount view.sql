create view branch_manu_prod_amount as (
    select branch_id, m.id as  manu_id, sum(pib.amount_in_stock) as products_amount
    from branchs
             left join product_in_branch pib on branchs.ID = pib.branch_id
             left join product p on p.barcode = pib.product_barcode
             join Manufacturer m on m.id = p.manufacturld
    group by branch_id, m.id);