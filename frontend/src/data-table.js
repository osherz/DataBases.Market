import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
    { field: 'ID', headerName: 'ID', width: 70 },
    { field: 'NAME', headerName: 'Name', width: 130 },
    { field: 'EMAIL', headerName: 'Email', width: 130 },
    { field: 'SALARY', headerName: 'Salary', width: 130, type: 'number' },
    { field: 'SENIORITY', headerName: 'Seniority', width: 130, type: 'number' },
    { field: 'BRACH_ID', headerName: 'Brach Id', width: 130 },
    { field: 'JOB', headerName: 'Job', width: 130 }
];


export default function DataTable() {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        fetch('/tables?table=employees')
            .then(result => result.json())
            .then(data => setRows(data['data']));
    }, []);

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                getRowId={row=>row['ID']}
                columns={columns}
                pageSize={5}
                checkboxSelection
            />
        </div>
    );
}