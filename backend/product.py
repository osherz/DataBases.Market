from flask_mysqldb import MySQL
import utils


def insert(mysql: MySQL, barcode, name, manufacturld, description, unitQty, Quantity, bIsWeighted,
           QtyInPackage, ItemPrice):
    query = f"insert into product values({barcode},{name},{manufacturld},{description},{unitQty},{Quantity},\
    {bIsWeighted},{QtyInPackage},{ItemPrice})"
    utils.execute_action(mysql, query)


def update(mysql: MySQL, barcode, name, manufacturld, description, unitQty, Quantity, bIsWeighted, QtyInPackage,
           ItemPrice):
    query = f"update product " \
            f"set" \
            f"barcode{barcode}" \
            f"name{name}" \
            f"manufacturld{manufacturld}" \
            f"description{description}" \
            f"unitQty{unitQty}" \
            f"Quantity{Quantity}" \
            f"bIsWeighted{bIsWeighted}" \
            f"QtyInPackage{QtyInPackage}" \
            f"ItemPrice{ItemPrice}"
    utils.execute_action(mysql, query)





