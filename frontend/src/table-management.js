import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';

export default function TableManagement({ tableName }) {
    const [rows, setRows] = useState([]);

    let columns = [];
    if (rows.length > 0) {
        columns = Object.keys(rows[0]).map(colName => {
            const editable = !['id', 'barcode'].includes(colName.toLowerCase());
            return { field: colName, headerName: textToTitle(colName), width: 150, editable: editable };
        });
    }

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