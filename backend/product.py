from flask_mysqldb import MySQL
import utils


def insert(mysql: MySQL, barcode, name, manufacturer, description, unitQty, Quantity, bIsWeighted,
           QtyInPackage, ItemPrice):
    query = f"insert into product values({barcode},{name},{manufacturer},{description},{unitQty},{Quantity},{bIsWeighted},
    {QtyInPackage},{ItemPrice})"
    utils.execute_action(mysql, query)


def update(mysql: MySQL, barcode, name, manufacturer, description, unitQty, Quantity, bIsWeighted, QtyInPackage,
           ItemPrice):
    query = f"update product " \
            f"set" \
            f"barcode{barcode}" \
            f"name{name}" \
            f"manufacturer{manufacturer}" \
            f"description{description}" \
            f"unitQty{unitQty}" \
            f"bIsWeighted{bIsWeighted}" \
            f"QtyInPackage{QtyInPackage}" \
            f"ItemPrice{ItemPrice}"
    utils.execute_action(mysql, query)
