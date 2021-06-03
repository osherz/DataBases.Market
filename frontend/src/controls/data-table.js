import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import * as utils from "../utils";

export default function DataTable({ rows, onEditCellChanged, onSelectionModelChange, selectionModel, enableManagement, idColNameChanged }) {
    const idColNamesOptions = ["id", "ID", "Id", "barcode", "Barcode", "BARCODE"];
    let columns = [];
    let idColName = '';

    if (rows.length > 0) {
        const rowToCheck = rows[0];
        const fields = Object.keys(rowToCheck);

        idColName = fields.filter((colName) => idColNamesOptions.includes(colName))[0];

        columns = fields.map((colName) => {
            const editable = colName !== idColName;
            return {
                field: colName,
                type: fieldType(colName, rowToCheck[colName]),
                headerName: textToTitle(colName),
                width: 150,
                editable: editable && enableManagement,
            };
        });
        changeColDateToDateType(rows);
    }

    useEffect(() => idColNameChanged(idColName), [idColName]);


    return (
        <DataGrid
            rows={rows}
            getRowId={(row) =>
                row["ID"] ? row["ID"] : row["id"] ? row["id"] : row["barcode"]
            }
            columns={columns}
            onEditCellChangeCommitted={onEditCellChanged}
            disableSelectionOnClick={true}
            onSelectionModelChange={onSelectionModelChange}
            selectionModel={selectionModel}
            autoPageSize
            checkboxSelection={enableManagement}
        />
    );
}

function textToTitle(str) {
    return str
        .charAt(0)
        .toUpperCase()
        .concat(str.toLowerCase().slice(1, str.length));
}

function fieldType(colName, value) {
    return utils.isNumber(value) ? "number" : isDate(colName) ? "date" : "";
}

function isDate(colName) {
    return colName.toLowerCase().includes("date");
}

function changeColDateToDateType(rows) {
    rows.forEach((row) => {
        Object.keys(row).forEach((colName) => {
            if (isDate(colName)) {
                row[colName] = new Date(Date.parse(row[colName]));
            }
        });
    });
}

