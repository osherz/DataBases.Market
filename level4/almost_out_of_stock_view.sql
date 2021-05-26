create view almost_out_of_stock_view as
select `freedbtech_market`.`product_in_branch`.`product_barcode` AS `product_barcode`,
       `freedbtech_market`.`product`.`name`                      AS `name`,
       concat(`b`.`TOWN`, ', ', `b`.`ADDRESS`)                   AS `branch`,
       `M`.`name`                                                AS `manufaurer_name`,
       `C`.`country_name`                                        AS `country_name`,
       `freedbtech_market`.`product_in_branch`.`amount_in_stock` AS `amount_in_stock`
from ((((`freedbtech_market`.`product` join `freedbtech_market`.`product_in_branch` on ((
        `freedbtech_market`.`product`.`barcode` =
        `freedbtech_market`.`product_in_branch`.`product_barcode`))) join `freedbtech_market`.`Manufacturer` `M` on ((`freedbtech_market`.`product`.`manufacturld` = `M`.`id`))) join `freedbtech_market`.`country` `C` on ((`M`.`countryid` = `C`.`id`)))
         join `freedbtech_market`.`branchs` `b` on ((`b`.`ID` = `freedbtech_market`.`product_in_branch`.`branch_id`)))
where (`freedbtech_market`.`product_in_branch`.`amount_in_stock` <= 30);

