import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import isNumber from './utils';

export default function TableManagement({ tableName }) {
    const [rows, setRows] = useState([]);
    const idColNamesOptions = ['id', 'ID', 'Id', 'barcode', 'Barcode', 'BARCODE'];
    let fields, idColName;

    let columns = [];
    if (rows.length > 0) {
        const rowToCheck = rows[0];
        fields = Object.keys(rowToCheck);
        idColName = fields.filter(colName => idColNamesOptions.includes(colName))[0];
        columns = fields.map(colName => {
            const editable = colName !== idColName;
            return {
                field: colName,
                type: fieldType(colName, rowToCheck[colName]),
                headerName: textToTitle(colName),
                width: 150,
                editable: editable
            };
        });
    }

    const cellChanged = ({ id, field, props }) => {

    };

    useEffect(() => {
        fetch(`/${tableName}/select`)
            .then(result => result.json())
            .then(data => setRows(data['data']));
    }, [tableName]);
    return (
        <div style={{ height: '800px', width: '100%' }}>
            <DataGrid
                rows={rows}
                getRowId={row => row['ID'] ? row['ID'] :
                    row['id'] ? row['id'] : row['barcode']}
                columns={columns}
                onEditCellChangeCommitted={cellChanged}
                autoPageSize
                checkboxSelection
            />
        </div>
    );
}

function textToTitle(str) {
    return str.charAt(0)
        .toUpperCase()
        .concat(str.toLowerCase().slice(1, str.length))
}

function fieldType(colName, value) {
    return isNumber(value) ? 'number' :
    isDate(colName) ? 'dateTime' : '';
}

function isDate(colName){
    return colName.toLowerCase().includes('date');
}

function changeColDateToDateType(rows){
    rows.forEach(row => {
        Object.keys(row).forEach(colName =>{
            if(isDate(colName)){
                row[colName] = new Date(Date.parse(row[colName]));
            }
        });
    });
}