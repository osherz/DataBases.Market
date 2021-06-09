import React from 'react';
import DataTable from '../controls/data-table';
import {Typography} from '@material-ui/core';

export default function DataDisplay({rows}){
    if (rows.length === 1 && Object.keys(rows[0]).length === 1) {
        const key = Object.keys(rows[0])[0];
        return (
            <div>
                <Typography variant="h6" noWrap>
                    {key} : {rows[0][key]}
                </Typography>
            </div>
        );
    }
    else {
        return (
            <DataTable
                rows={rows}
                enableManagement={false}
            />
        );
    }

}